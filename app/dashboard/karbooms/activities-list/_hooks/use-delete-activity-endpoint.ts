import useInvalidatingMutation from "@/app/_hooks/use-invalidating-mutation";

import { activitiesListService } from "../_services/activities-list-service";

export default function useDeleteActivityEndpoint() {
  return useInvalidatingMutation({
    mutationKey: ["delete-activity"],
    mutationFn: activitiesListService.deleteActivity,
    invalidateQueries: [["activities"]],
  });
}
