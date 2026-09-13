// @vitest-environment jsdom

import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const navigation = vi.hoisted(() => ({ push: vi.fn() }));
vi.mock("next/navigation", () => ({
  usePathname: () => "/dashboard/karbooms",
  useSearchParams: () => new URLSearchParams(window.location.search),
  useRouter: () => navigation,
}));

import ListHeaderLayout from "@/app/dashboard/karbooms/_layouts/list-header-layout";
import { KARBOOM_FILTERS } from "@/app/dashboard/karbooms/_constants/karboom-filters";

beforeEach(() => {
  vi.clearAllMocks();
  window.history.replaceState({}, "", "/dashboard/karbooms?name=رضا&tab=all");
  navigation.push.mockImplementation((url: string) =>
    window.history.pushState({}, "", url),
  );
});
afterEach(cleanup);

describe("list header filtering", () => {
  it("opens the configured drawer and immediately removes applied filters on Clear", async () => {
    render(
      <ListHeaderLayout
        title="کاربوم‌ها"
        filters={KARBOOM_FILTERS}
        hideBackButton
      />,
    );
    const icon = screen.getByRole("button", { name: "فیلترها" });
    expect(icon.textContent).toBe("1");
    expect(screen.queryByLabelText("نام کاربوم")).toBeNull();
    fireEvent.click(icon);
    expect(
      ((await screen.findByLabelText("نام کاربوم")) as HTMLInputElement).value,
    ).toBe("رضا");
    fireEvent.click(screen.getByRole("button", { name: "پاک کردن" }));
    expect(navigation.push).toHaveBeenCalledWith(
      "/dashboard/karbooms?tab=all",
      { scroll: false },
    );
    await waitFor(() =>
      expect(screen.queryByLabelText("نام کاربوم")).toBeNull(),
    );
    fireEvent.click(await screen.findByRole("button", { name: "فیلترها" }));
    expect(
      ((await screen.findByLabelText("نام کاربوم")) as HTMLInputElement).value,
    ).toBe("");
  });
});
