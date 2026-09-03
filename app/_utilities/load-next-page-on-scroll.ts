interface LoadNextPageOptions {
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  fetchNextPage: () => unknown;
}

export default function loadNextPageOnScroll(
  element: HTMLElement,
  { hasNextPage, isFetchingNextPage, fetchNextPage }: LoadNextPageOptions,
) {
  const distanceFromBottom =
    element.scrollHeight - element.scrollTop - element.clientHeight;

  if (distanceFromBottom <= 100 && hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }
}
