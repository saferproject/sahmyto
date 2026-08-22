import useListQuery from "@/app/_hooks/use-list-query";

import { DriversListService } from "../_services/drivers-list-service";

export default function useGetDriversEndpoint(
  karboomId: number | null | undefined,
  enabled: boolean = true,
) {
  return useListQuery(
    ["drivers", karboomId],
    DriversListService.getDrivers,
    karboomId,
    enabled,
  );
}
