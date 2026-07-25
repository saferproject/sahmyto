"use client";

import useGetKarbooms from "../_hooks/get-karbooms-endpoint";

import QueryState from "@/app/_components/query-state";
import KarboomListSkeleton from "./karboom-list-skeleton";
import KarboomListComponent from "./karboom-list-component";
import NoKarboomsComponent from "./no-karbooms-component";
import { KarboomsProps } from "../_types/karbooms-props";

export default function KarboomsComponent({ onAddKarboom }: KarboomsProps) {
  const { data, isLoading, isError } = useGetKarbooms();

  return (
    <QueryState
      isLoading={isLoading}
      isError={isError}
      isEmpty={!data?.data.length}
      loadingFallback={<KarboomListSkeleton />}
      emptyFallback={<NoKarboomsComponent onAddKarboom={onAddKarboom} />}
    >
      <KarboomListComponent karbooms={data?.data ?? []} />
    </QueryState>
  );
}
