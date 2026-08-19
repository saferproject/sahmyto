import { useMutation, useQueryClient } from "@tanstack/react-query";
import { activityFormService } from "../../_services/activity-form-service";

export default function useAddActivityEndpoint() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["add-activity"],
    mutationFn: activityFormService.addActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });
}
