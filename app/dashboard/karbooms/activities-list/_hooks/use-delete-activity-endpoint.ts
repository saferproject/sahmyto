import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activitiesListService } from "../_services/activities-list-service";

export default function useDeleteActivityEndpoint() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: ["delete-activity"],
    mutationFn: activitiesListService.deleteActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });
}
