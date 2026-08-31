import useInfiniteListQuery from "@/app/_hooks/use-infinite-list-query";
import isValidQueryId from "@/app/_utilities/is-valid-query-id";

import { driversListService } from "../_services/drivers-list-service";

export default function useGetDriversEndpoint(
  karboomId: number | null | undefined,
  enabled: boolean = true,
) {
  return useInfiniteListQuery({
    queryKey: ["drivers", karboomId],
    queryFn: (page, signal, queryKey) =>
      driversListService.getDrivers(queryKey[1] as number, signal, page),
    enabled: enabled && isValidQueryId(karboomId),
  });
}
