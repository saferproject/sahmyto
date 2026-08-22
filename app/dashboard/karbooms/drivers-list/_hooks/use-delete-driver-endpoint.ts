import useInvalidatingMutation from "@/app/_hooks/use-invalidating-mutation";

import { DriversListService } from "../_services/drivers-list-service";

export default function useDeleteDriverEndpoint() {
  return useInvalidatingMutation({
    mutationKey: ["delete-driver"],
    mutationFn: DriversListService.deleteDriver,
    invalidateQueries: [["drivers"]],
  });
}
