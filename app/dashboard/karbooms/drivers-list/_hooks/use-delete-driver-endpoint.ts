import useInvalidatingMutation from "@/app/_hooks/use-invalidating-mutation";

import { driversListService } from "../_services/drivers-list-service";

export default function useDeleteDriverEndpoint() {
  return useInvalidatingMutation({
    mutationKey: ["delete-driver"],
    mutationFn: driversListService.deleteDriver,
    invalidateQueries: [["drivers"]],
  });
}
