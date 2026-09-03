import { describe, expect, it, vi } from "vitest";

import loadNextPageOnScroll from "./load-next-page-on-scroll";

describe("loadNextPageOnScroll", () => {
  it("loads the next page near the bottom", () => {
    const fetchNextPage = vi.fn();

    loadNextPageOnScroll(
      { scrollHeight: 500, scrollTop: 310, clientHeight: 100 } as HTMLElement,
      {
        hasNextPage: true,
        isFetchingNextPage: false,
        fetchNextPage,
      },
    );

    expect(fetchNextPage).toHaveBeenCalledOnce();
  });

  it("does not load without another page or while a request is running", () => {
    const fetchNextPage = vi.fn();
    const element = {
      scrollHeight: 500,
      scrollTop: 400,
      clientHeight: 100,
    } as HTMLElement;

    loadNextPageOnScroll(element, {
      hasNextPage: false,
      isFetchingNextPage: false,
      fetchNextPage,
    });
    loadNextPageOnScroll(element, {
      hasNextPage: true,
      isFetchingNextPage: true,
      fetchNextPage,
    });

    expect(fetchNextPage).not.toHaveBeenCalled();
  });
});
