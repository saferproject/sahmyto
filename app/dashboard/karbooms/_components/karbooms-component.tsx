"use client";

import useListFilters from "@/app/dashboard/_hooks/use-list-filters";
import { KARBOOM_FILTERS } from "../_constants/karboom-filters";

import useGetKarboomsEndpoint from "../_hooks/use-get-karbooms-endpoint";

import QueryState from "@/app/_components/query-state";
import KarboomListSkeleton from "./karboom-list-skeleton";
import KarboomListComponent from "./karboom-list-component";
import NoKarboomsComponent from "./no-karbooms-component";
import { KarboomsProps } from "../_types/karbooms-props";
import InfiniteScrollTrigger from "@/app/_components/infinite-scroll-trigger";

export default function KarboomsComponent({ onAddKarboom }: KarboomsProps) {
  const { queryParams, activeCount } = useListFilters(KARBOOM_FILTERS);
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetKarboomsEndpoint(queryParams);

  return (
    <QueryState
      isLoading={isLoading}
      isError={isError}
      isEmpty={!data?.data.length}
      loadingFallback={<KarboomListSkeleton />}
      emptyFallback={
        activeCount > 0 ? undefined : (
          <NoKarboomsComponent onAddKarboom={onAddKarboom} />
        )
      }
    >
      <KarboomListComponent karbooms={data?.data ?? []} />
      <InfiniteScrollTrigger
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </QueryState>
  );
}
