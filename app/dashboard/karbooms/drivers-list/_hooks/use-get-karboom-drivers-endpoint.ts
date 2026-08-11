import { useQuery } from "@tanstack/react-query";
import { DriversListService } from "../_services/drivers-list-service";
import isValidQueryId from "@/app/_utilities/is-valid-query-id";

export default function useGetDriversEndpoint(
  karboomId: number | null | undefined,
  enabled: boolean = true,
) {
  return useQuery({
    queryKey: ["drivers", karboomId],
    queryFn: ({ queryKey, signal }) =>
      DriversListService.getDrivers(Number(queryKey[1]), signal),
    enabled: enabled && isValidQueryId(karboomId),
  });
}
