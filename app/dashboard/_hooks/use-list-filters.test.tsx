// @vitest-environment jsdom

import { useSyncExternalStore, type ReactNode } from "react";
import { act, cleanup, renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Income } from "@/app/dashboard/karbooms/_types/income";
import { DEFAULT_PAGE_SIZE } from "@/app/_constants/pagination";

const navigation = vi.hoisted(() => ({ push: vi.fn() }));
const getIncomes = vi.hoisted(() => vi.fn());
vi.mock("next/navigation", () => ({
  usePathname: () => window.location.pathname,
  useRouter: () => navigation,
  useSearchParams: () => {
    const search = useSyncExternalStore(
      (listener) => {
        window.addEventListener("popstate", listener);
        return () => window.removeEventListener("popstate", listener);
      },
      () => window.location.search,
    );
    return new URLSearchParams(search);
  },
}));
vi.mock(
  "@/app/dashboard/karbooms/[karboomId]/incomes-list/_services/incomes-list-service",
  () => ({
    incomeListService: { getIncomes },
  }),
);

import useListFilters from "./use-list-filters";
import useGetIncomes from "@/app/dashboard/karbooms/[karboomId]/incomes-list/_hooks/use-get-incomes";
import { INCOME_FILTERS } from "@/app/dashboard/karbooms/[karboomId]/incomes-list/_constants/income-filters";

beforeEach(() => {
  vi.clearAllMocks();
  window.history.replaceState(
    {},
    "",
    "/dashboard/karbooms/1/incomes-list?tab=all#list",
  );
  navigation.push.mockImplementation((url: string) => {
    window.history.pushState({}, "", url);
    window.dispatchEvent(new PopStateEvent("popstate"));
  });
});
afterEach(cleanup);

describe("URL-driven list filters", () => {
  it("synchronizes separate drawer and parent consumers, preserving unrelated URL state", async () => {
    const { result } = renderHook(() => ({
      parent: useListFilters(INCOME_FILTERS),
      drawer: useListFilters(INCOME_FILTERS),
    }));
    act(() =>
      result.current.drawer.apply({
        unit_price: "1400000",
        endedAt: ["2026-01-01", "2026-01-30"],
      }),
    );
    expect(result.current.parent.queryParams).toEqual({
      unit_price: 1400000,
      "min-ended_at": "2026-01-01",
      "max-ended_at": "2026-01-30",
    });
    expect(result.current.parent.activeCount).toBe(2);
    expect(window.location.hash).toBe("#list");
    expect(new URLSearchParams(window.location.search).get("tab")).toBe("all");
    expect(navigation.push).toHaveBeenCalledWith(expect.any(String), {
      scroll: false,
    });

    act(() =>
      result.current.drawer.apply({
        unit_price: "1400000",
        endedAt: ["2026-01-01", "2026-01-30"],
      }),
    );
    expect(navigation.push).toHaveBeenCalledTimes(1);
    act(() => result.current.drawer.apply({ unit_price: "0" }));
    expect(result.current.parent.queryParams).toEqual({ unit_price: 0 });

    act(() => window.history.back());
    await waitFor(() => expect(result.current.parent.activeCount).toBe(2));
    act(() => window.history.forward());
    await waitFor(() =>
      expect(result.current.parent.queryParams).toEqual({ unit_price: 0 }),
    );

    act(() => result.current.drawer.apply({}));
    expect(result.current.parent.queryParams).toEqual({});
    expect(result.current.parent.activeCount).toBe(0);
  });

  it("restores shared URLs and ignores malformed values", () => {
    window.history.replaceState(
      {},
      "",
      "/dashboard/karbooms/1/incomes-list?unit_price=oops&min-ended_at=2026-01-01&max-ended_at=2026-02-30",
    );
    const { result } = renderHook(() => useListFilters(INCOME_FILTERS));
    expect(result.current.queryParams).toEqual({
      "min-ended_at": "2026-01-01",
    });
    expect(result.current.values).toMatchObject({
      unit_price: "",
      endedAt: ["2026-01-01", ""],
    });
  });

  it("reads the latest unrelated parameters when applying", () => {
    const { result } = renderHook(() => useListFilters(INCOME_FILTERS));
    window.history.replaceState({}, "", "?tab=recent&page=4#updated");
    act(() => result.current.apply({ unit_price: "0" }));
    expect(navigation.push).toHaveBeenCalledWith(
      "/dashboard/karbooms/1/incomes-list?tab=recent&unit_price=0#updated",
      { scroll: false },
    );
  });

  it("keeps filters across pages and starts new combinations at page one", async () => {
    getIncomes.mockImplementation(async (_id, _signal, page, filters) => ({
      data: Array.from(
        { length: page === 1 ? DEFAULT_PAGE_SIZE : 1 },
        (_, index) =>
          ({
            id: Number(filters.unit_price ?? 0) + page * 100 + index,
          }) as Income,
      ),
      message: "ok",
    }));
    const client = new QueryClient({
      defaultOptions: { queries: { retry: false, staleTime: Infinity } },
    });
    const wrapper = ({ children }: { children: ReactNode }) => (
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
    const { result, unmount } = renderHook(
      () => {
        const filters = useListFilters(INCOME_FILTERS);
        const query = useGetIncomes(1, filters.queryParams);
        // Read data during render, as the list does, to subscribe to React Query updates.
        return { filters, query, data: query.data };
      },
      { wrapper },
    );

    await waitFor(() => expect(result.current.query.isSuccess).toBe(true));
    await act(async () => {
      await result.current.query.fetchNextPage();
    });
    expect(getIncomes).toHaveBeenLastCalledWith(
      1,
      expect.any(AbortSignal),
      2,
      {},
    );
    await waitFor(() =>
      expect(result.current.query.data?.data).toHaveLength(
        DEFAULT_PAGE_SIZE + 1,
      ),
    );

    act(() => result.current.filters.apply({ unit_price: "1000" }));
    await waitFor(() =>
      expect(result.current.query.data?.data[0].id).toBe(1100),
    );
    expect(getIncomes).toHaveBeenLastCalledWith(1, expect.any(AbortSignal), 1, {
      unit_price: 1000,
    });
    await act(async () => {
      await result.current.query.fetchNextPage();
    });
    expect(getIncomes).toHaveBeenLastCalledWith(1, expect.any(AbortSignal), 2, {
      unit_price: 1000,
    });

    act(() => result.current.filters.apply({ unit_price: "2000" }));
    await waitFor(() =>
      expect(result.current.query.data?.data[0].id).toBe(2100),
    );
    expect(getIncomes).toHaveBeenLastCalledWith(1, expect.any(AbortSignal), 1, {
      unit_price: 2000,
    });
    expect(result.current.query.data?.data).toHaveLength(DEFAULT_PAGE_SIZE);
    const calls = getIncomes.mock.calls.length;
    act(() => result.current.filters.apply({}));
    await waitFor(() =>
      expect(result.current.query.data?.data[0].id).toBe(100),
    );
    expect(result.current.query.data?.data).toHaveLength(DEFAULT_PAGE_SIZE + 1);
    expect(getIncomes).toHaveBeenCalledTimes(calls);
    unmount();
    client.clear();
  });
});
