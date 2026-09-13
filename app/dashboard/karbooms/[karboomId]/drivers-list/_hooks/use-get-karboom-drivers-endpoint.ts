import useInfiniteListQuery from "@/app/_hooks/use-infinite-list-query";
import isValidQueryId from "@/app/_utilities/is-valid-query-id";
import type { QueryParams } from "@/app/_types/query-params";
import { driversListService } from "../_services/drivers-list-service";

export default function useGetDriversEndpoint(
  karboomId: number | null | undefined,
  enabled: boolean = true,
  queryParams: QueryParams = {},
) {
  return useInfiniteListQuery({
    queryKey: ["drivers", karboomId, queryParams],
    queryFn: (page, signal) =>
      driversListService.getDrivers(
        karboomId as number,
        signal,
        page,
        queryParams,
      ),
    enabled: enabled && isValidQueryId(karboomId),
  });
}
