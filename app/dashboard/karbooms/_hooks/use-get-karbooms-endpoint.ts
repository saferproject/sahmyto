import type { QueryParams } from "@/app/_types/query-params";
import useInfiniteListQuery from "@/app/_hooks/use-infinite-list-query";
import { karboomService } from "../_services/karboom-service";

export default function useGetKarboomsEndpoint(queryParams: QueryParams = {}) {
  return useInfiniteListQuery({
    queryKey: ["karbooms", queryParams],
    queryFn: (page, signal) =>
      karboomService.getKarbooms(signal, page, queryParams),
  });
}
