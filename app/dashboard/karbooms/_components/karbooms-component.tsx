"use client";

import useGetKarboomsEndpoint from "../_hooks/use-get-karbooms-endpoint";

import QueryState from "@/app/_components/query-state";
import KarboomListSkeleton from "./karboom-list-skeleton";
import KarboomListComponent from "./karboom-list-component";
import NoKarboomsComponent from "./no-karbooms-component";
import { KarboomsProps } from "../_types/karbooms-props";
import InfiniteScrollTrigger from "@/app/_components/infinite-scroll-trigger";

export default function KarboomsComponent({ onAddKarboom }: KarboomsProps) {
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetKarboomsEndpoint();

  return (
    <QueryState
      isLoading={isLoading}
      isError={isError}
      isEmpty={!data?.data.length}
      loadingFallback={<KarboomListSkeleton />}
      emptyFallback={<NoKarboomsComponent onAddKarboom={onAddKarboom} />}
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
