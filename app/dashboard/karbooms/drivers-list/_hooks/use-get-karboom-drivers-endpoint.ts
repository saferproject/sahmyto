import useListQuery from "@/app/_hooks/use-list-query";

import { driversListService } from "../_services/drivers-list-service";

export default function useGetDriversEndpoint(
  karboomId: number | null | undefined,
  enabled: boolean = true,
) {
  return useListQuery(
    ["drivers", karboomId],
    driversListService.getDrivers,
    karboomId,
    enabled,
  );
}
