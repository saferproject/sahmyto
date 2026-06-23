"use client";

import useGetKarbooms from "../_hooks/get-karbooms-endpoint";

import QueryState from "@/app/_components/query-state";
import KarboomListSkeleton from "./karboom-list-skeleton";
import KarboomListComponent from "./karboom-list-component";
import NoKarboomsComponent from "./no-karbooms-component";

export default function KarboomsComponent() {
  const { data, isLoading, isError } = useGetKarbooms();

  return (
    <QueryState
      isLoading={isLoading}
      isError={isError}
      isEmpty={!data?.data.length}
      loadingFallback={<KarboomListSkeleton />}
      emptyFallback={<NoKarboomsComponent />}
    >
      <KarboomListComponent karbooms={data?.data ?? []} />
    </QueryState>
  );
}
