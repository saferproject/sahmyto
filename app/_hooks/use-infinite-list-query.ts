import {
  useInfiniteQuery,
  type QueryKey,
  type UseInfiniteQueryResult,
} from "@tanstack/react-query";

import { DEFAULT_PAGE_SIZE } from "@/app/_constants/pagination";
import BaseResponse from "@/app/_interfaces/base-response";

interface UseInfiniteListQueryOptions<TItem> {
  queryKey: QueryKey;
  queryFn: (
    page: number,
    signal: AbortSignal,
    queryKey: QueryKey,
  ) => Promise<BaseResponse<TItem[]>>;
  enabled?: boolean;
}

export default function useInfiniteListQuery<TItem>({
  queryKey,
  queryFn,
  enabled = true,
}: UseInfiniteListQueryOptions<TItem>): UseInfiniteQueryResult<
  BaseResponse<TItem[]>
> {
  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam, signal, queryKey }) =>
      queryFn(pageParam, signal, queryKey),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _pages, lastPageParam) =>
      lastPage.data.length < DEFAULT_PAGE_SIZE ? undefined : lastPageParam + 1,
    select: ({ pages }) => ({
      ...pages[0],
      data: pages.flatMap((page) => page.data),
    }),
    enabled,
  });
}
