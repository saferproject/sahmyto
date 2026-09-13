// @vitest-environment jsdom

import { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dayjs, { type Dayjs } from "dayjs";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Filter } from "../_types/filter";

const navigation = vi.hoisted(() => ({ push: vi.fn() }));
const fetchWithAuth = vi.hoisted(() => vi.fn());
vi.mock("@/app/proxy", () => ({ fetchWithAuth }));
vi.mock("next/navigation", () => ({
  usePathname: () => "/incomes",
  useRouter: () => navigation,
  useSearchParams: () => new URLSearchParams(window.location.search),
}));
vi.mock("@/app/_components/form-drawer-with-title-component", () => ({
  default: ({
    children,
    onClose,
  }: {
    children: ReactNode;
    onClose: () => void;
  }) => (
    <div>
      <button onClick={onClose}>Dismiss</button>
      {children}
    </div>
  ),
}));
vi.mock("@/app/_components/date-picker-component", () => ({
  default: ({
    label,
    value,
    onChange,
    error,
    helperText,
  }: {
    label: string;
    value: Dayjs | null;
    onChange: (value: Dayjs | null) => void;
    error: boolean;
    helperText: string;
  }) => (
    <label>
      {label}
      <input
        aria-label={label}
        value={value?.format("YYYY-MM-DD") ?? ""}
        onChange={(event) =>
          onChange(event.target.value ? dayjs(event.target.value) : null)
        }
      />
      {error && <span>{helperText}</span>}
    </label>
  ),
}));

import FiltersDrawerComponent from "./filters-drawer-component";
import useListFilters from "../_hooks/use-list-filters";
import useGetExpenses from "@/app/dashboard/karbooms/[karboomId]/expenses-list/_hooks/use-get-expenses";
import { EXPENSE_FILTERS } from "@/app/dashboard/karbooms/[karboomId]/expenses-list/_constants/expense-filters";

function RefreshedExpenses({ karboomId }: { karboomId?: number }) {
  const { queryParams } = useListFilters(EXPENSE_FILTERS);
  const { data } = useGetExpenses(karboomId, queryParams);
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Open filters</button>
      <output>{data?.data.map((expense) => expense.id).join(",")}</output>
      <FiltersDrawerComponent
        filters={EXPENSE_FILTERS}
        title="Expenses"
        isOpen={isOpen}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

const filters: readonly Filter[] = [
  { type: "text", name: "name", label: "Name", queryKey: "eq-full_name" },
  {
    type: "boolean",
    name: "settled",
    label: "Settled",
    queryKey: "is_settled",
  },
  {
    type: "number",
    name: "quantity",
    label: "Quantity",
    queryKey: "min-quantity",
  },
  { type: "price", name: "price", label: "Price", queryKey: "price" },
  {
    type: "select",
    name: "kind",
    label: "Kind",
    queryKey: "type",
    options: [{ label: "Daily", value: "daily" }],
  },
  {
    type: "date",
    name: "date",
    label: "Date",
    queryKeys: { min: "min-ended_at", max: "max-ended_at" },
  },
];
const props = {
  title: "Filters",
  filters,
  isOpen: true,
  onOpen: vi.fn(),
  onClose: vi.fn(),
};

beforeEach(() => {
  vi.clearAllMocks();
  window.history.replaceState({}, "", "/incomes");
  navigation.push.mockImplementation((url: string) =>
    window.history.pushState({}, "", url),
  );
});
afterEach(() => {
  cleanup();
  dayjs.calendar("gregory");
});

describe("filter drawer", () => {
  it("restores URL filters into the first request and drawer after refresh", async () => {
    const search = new URLSearchParams({
      category__name: "روغن",
      unit_price: "0",
      is_settled: "1",
      type: "repair",
      "min-date": "2026-01-01",
      "max-date": "2026-01-30",
      tab: "all",
      page: "4",
    }).toString();
    window.history.replaceState({}, "", `/incomes?${search}`);
    fetchWithAuth.mockResolvedValue({ data: [{ id: 123 }], message: "ok" });

    // A new mount and an empty cache model both a direct URL visit and a reload.
    for (const visit of [1, 2]) {
      const client = new QueryClient({
        defaultOptions: { queries: { retry: false } },
      });
      const { rerender, unmount } = render(
        <QueryClientProvider client={client}>
          <RefreshedExpenses />
        </QueryClientProvider>,
      );
      expect(fetchWithAuth).toHaveBeenCalledTimes(visit - 1);
      rerender(
        <QueryClientProvider client={client}>
          <RefreshedExpenses karboomId={7} />
        </QueryClientProvider>,
      );
      await screen.findByText("123");
      expect(fetchWithAuth).toHaveBeenCalledTimes(visit);
      const [path] = fetchWithAuth.mock.calls[visit - 1];
      const url = new URL(path, "https://example.test");
      expect(url.pathname).toBe("/karboom/expense/karboom/7");
      expect(Object.fromEntries(url.searchParams)).toEqual({
        category__name: "روغن",
        unit_price: "0",
        is_settled: "1",
        type: "repair",
        "min-date": "2026-01-01",
        "max-date": "2026-01-30",
        paginate: "1",
        page: "1",
      });

      fireEvent.click(screen.getByRole("button", { name: "Open filters" }));
      expect(
        (screen.getByLabelText("دسته‌بندی هزینه") as HTMLInputElement).value,
      ).toBe("روغن");
      expect(
        (screen.getByLabelText("مبلغ واحد") as HTMLInputElement).value,
      ).toBe("0");
      expect(
        (screen.getByLabelText("تسویه شده") as HTMLInputElement).checked,
      ).toBe(true);
      expect(screen.getByRole("combobox").textContent).toBe("تعمیرات");
      expect(
        (screen.getByLabelText("تاریخ هزینه (از)") as HTMLInputElement).value,
      ).toBe("2026-01-01");
      expect(
        (screen.getByLabelText("تاریخ هزینه (تا)") as HTMLInputElement).value,
      ).toBe("2026-01-30");
      expect(navigation.push).not.toHaveBeenCalled();
      unmount();
      client.clear();
    }
  });

  it("submits Gregorian dates while the application calendar is Jalali", async () => {
    dayjs.calendar("jalali");
    render(<FiltersDrawerComponent {...props} />);
    fireEvent.change(screen.getByLabelText("Date (از)"), {
      target: { value: "2026-01-01" },
    });
    expect((screen.getByLabelText("Date (از)") as HTMLInputElement).value).toBe(
      "1404-10-11",
    );
    fireEvent.click(screen.getByRole("button", { name: "اعمال فیلتر" }));
    await waitFor(() =>
      expect(navigation.push).toHaveBeenCalledWith(
        "/incomes?min-ended_at=2026-01-01",
        { scroll: false },
      ),
    );
  });

  it("allows continued typing and deletion in a formatted price", async () => {
    render(<FiltersDrawerComponent {...props} />);
    const input = screen.getByLabelText("Price") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "1400" } });
    expect(input.value).toBe("1,400");
    fireEvent.change(input, { target: { value: "1,4000" } });
    expect(input.value).toBe("14,000");
    fireEvent.change(input, { target: { value: "14,00" } });
    expect(input.value).toBe("1,400");
    fireEvent.click(screen.getByRole("button", { name: "اعمال فیلتر" }));
    await waitFor(() =>
      expect(navigation.push).toHaveBeenCalledWith("/incomes?price=1400", {
        scroll: false,
      }),
    );
  });

  it("submits all six control types only on Apply", async () => {
    render(<FiltersDrawerComponent {...props} />);
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "رضا" },
    });
    fireEvent.click(screen.getByLabelText("Settled"));
    fireEvent.change(screen.getByLabelText("Quantity"), {
      target: { value: "-1.5" },
    });
    fireEvent.change(screen.getByLabelText("Price"), {
      target: { value: "1400000" },
    });
    expect((screen.getByLabelText("Price") as HTMLInputElement).value).toBe(
      "1,400,000",
    );
    fireEvent.mouseDown(screen.getByRole("combobox"));
    fireEvent.click(screen.getByRole("option", { name: "Daily" }));
    fireEvent.change(screen.getByLabelText("Date (از)"), {
      target: { value: "2026-01-01" },
    });
    fireEvent.change(screen.getByLabelText("Date (تا)"), {
      target: { value: "2026-01-30" },
    });
    expect(navigation.push).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole("button", { name: "اعمال فیلتر" }));
    await waitFor(() => expect(props.onClose).toHaveBeenCalledOnce());
    expect(
      Object.fromEntries(new URLSearchParams(window.location.search)),
    ).toEqual({
      "eq-full_name": "رضا",
      is_settled: "1",
      "min-quantity": "-1.5",
      price: "1400000",
      type: "daily",
      "min-ended_at": "2026-01-01",
      "max-ended_at": "2026-01-30",
    });
  });

  it("discards drafts on dismissal and restores URL values when reopened", () => {
    window.history.replaceState({}, "", "/incomes?price=1000&is_settled=1");
    const { rerender } = render(<FiltersDrawerComponent {...props} />);
    fireEvent.change(screen.getByLabelText("Price"), {
      target: { value: "9000" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Dismiss" }));
    rerender(<FiltersDrawerComponent {...props} isOpen={false} />);
    rerender(<FiltersDrawerComponent {...props} />);
    expect((screen.getByLabelText("Price") as HTMLInputElement).value).toBe(
      "1,000",
    );
    expect((screen.getByLabelText("Settled") as HTMLInputElement).checked).toBe(
      true,
    );
    expect(navigation.push).not.toHaveBeenCalled();
  });

  it("immediately removes URL filters and closes even with invalid draft values", () => {
    window.history.replaceState(
      {},
      "",
      "/incomes?price=1000&is_settled=1&min-ended_at=2026-01-01&tab=all&page=3#list",
    );
    render(<FiltersDrawerComponent {...props} />);
    fireEvent.change(screen.getByLabelText("Price"), {
      target: { value: "invalid" },
    });
    fireEvent.click(screen.getByRole("button", { name: "پاک کردن" }));
    expect(navigation.push).toHaveBeenCalledExactlyOnceWith(
      "/incomes?tab=all#list",
      { scroll: false },
    );
    expect(props.onClose).toHaveBeenCalledOnce();
  });

  it("preserves zero and omits an unchecked boolean", async () => {
    window.history.replaceState({}, "", "/incomes?is_settled=1");
    render(<FiltersDrawerComponent {...props} />);
    fireEvent.click(screen.getByLabelText("Settled"));
    fireEvent.change(screen.getByLabelText("Price"), {
      target: { value: "۰" },
    });
    fireEvent.click(screen.getByRole("button", { name: "اعمال فیلتر" }));
    await waitFor(() =>
      expect(navigation.push).toHaveBeenCalledWith("/incomes?price=0", {
        scroll: false,
      }),
    );
  });

  it("keeps invalid numbers and reversed dates out of the URL", async () => {
    render(<FiltersDrawerComponent {...props} />);
    fireEvent.change(screen.getByLabelText("Quantity"), {
      target: { value: "oops" },
    });
    fireEvent.change(screen.getByLabelText("Date (از)"), {
      target: { value: "2026-02-01" },
    });
    fireEvent.change(screen.getByLabelText("Date (تا)"), {
      target: { value: "2026-01-01" },
    });
    fireEvent.click(screen.getByRole("button", { name: "اعمال فیلتر" }));
    await screen.findByText("عدد معتبر وارد کنید");
    expect(
      screen.getAllByText("تاریخ پایان باید بعد از تاریخ شروع باشد"),
    ).toHaveLength(2);
    expect(navigation.push).not.toHaveBeenCalled();
    expect(props.onClose).not.toHaveBeenCalled();
  });
});
