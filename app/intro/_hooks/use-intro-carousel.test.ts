// @vitest-environment jsdom

import { act, cleanup, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const routerPushMock = vi.hoisted(() => vi.fn());
const routerMock = vi.hoisted(() => ({ push: routerPushMock }));

vi.mock("next/navigation", () => ({
  useRouter: () => routerMock,
}));

import useIntroCarousel from "./use-intro-carousel";

beforeEach(() => {
  vi.clearAllMocks();
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("useIntroCarousel", () => {
  it("runs exit animation and advances through landing and slides", () => {
    const { result } = renderHook(() => useIntroCarousel(2));

    expect(result.current.currentPageIndex).toBeNull();
    expect(result.current.isVisible).toBe(true);

    act(() => vi.advanceTimersByTime(3_800));
    expect(result.current.isVisible).toBe(false);

    act(() => vi.advanceTimersByTime(700));
    expect(result.current.currentPageIndex).toBe(0);
    expect(result.current.isVisible).toBe(true);

    act(() => vi.advanceTimersByTime(4_500));
    expect(result.current.currentPageIndex).toBe(1);

    act(() => vi.advanceTimersByTime(4_500));
    expect(routerPushMock).toHaveBeenCalledWith("/login");
  });

  it("supports manual next and previous navigation", () => {
    const { result } = renderHook(() => useIntroCarousel(2));

    act(() => result.current.goNext());
    expect(result.current.currentPageIndex).toBe(0);

    let movedBack = true;
    act(() => {
      movedBack = result.current.goPrevious();
    });
    expect(movedBack).toBe(false);
    expect(result.current.currentPageIndex).toBe(0);

    act(() => result.current.goNext());
    expect(result.current.currentPageIndex).toBe(1);

    act(() => {
      movedBack = result.current.goPrevious();
    });
    expect(movedBack).toBe(true);
    expect(result.current.currentPageIndex).toBe(0);
  });

  it("routes immediately when next is pressed on the last slide", () => {
    const { result } = renderHook(() => useIntroCarousel(1));
    act(() => result.current.goNext());
    expect(result.current.currentPageIndex).toBe(0);

    act(() => result.current.goNext());
    expect(routerPushMock).toHaveBeenCalledWith("/login");
  });

  it("pauses elapsed time and resumes from the same point", () => {
    const { result } = renderHook(() => useIntroCarousel(2));
    act(() => vi.advanceTimersByTime(1_000));
    act(() => result.current.pause());
    expect(result.current.isPaused).toBe(true);

    act(() => vi.advanceTimersByTime(10_000));
    expect(result.current.currentPageIndex).toBeNull();
    expect(result.current.isVisible).toBe(true);

    act(() => result.current.resume());
    expect(result.current.isPaused).toBe(false);
    act(() => vi.advanceTimersByTime(2_800));
    expect(result.current.isVisible).toBe(false);
    act(() => vi.advanceTimersByTime(700));
    expect(result.current.currentPageIndex).toBe(0);
  });
});
