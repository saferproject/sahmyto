import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activityFormService } from "../../_services/activity-form-service";

export default function useEditActivityEndpoint() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["edit-activity"],
    mutationFn: activityFormService.editActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });
}
