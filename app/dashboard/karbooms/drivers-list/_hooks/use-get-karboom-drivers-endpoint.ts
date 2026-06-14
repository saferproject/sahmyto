import { useQuery } from "@tanstack/react-query";
import { DriversListService } from "../_services/drivers-list-service";

export default function useGetDriversEndpoint(
  karboomId: number,
  enabled: boolean = true,
) {
  return useQuery({
    queryKey: ["drivers", karboomId],
    queryFn: ({ queryKey }) =>
      DriversListService.getDrivers(Number(queryKey[1])),
    enabled,
  });
}
