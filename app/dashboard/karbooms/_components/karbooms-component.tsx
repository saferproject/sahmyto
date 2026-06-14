"use client";

import useGetKarbooms from "../_hooks/get-karbooms-endpoint";

import KarboomListSkeleton from "./karboom-list-skeleton";
import KarboomListComponent from "./karboom-list-component";
import NoKarboomsComponent from "./no-karbooms-component";

export default function KarboomsComponent() {
  const { data, isLoading } = useGetKarbooms();

  return isLoading ? (
    <KarboomListSkeleton />
  ) : data?.data.length ? (
    <KarboomListComponent karbooms={data.data} />
  ) : (
    <NoKarboomsComponent />
  );
}
