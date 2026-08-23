import useInvalidatingMutation from "@/app/_hooks/use-invalidating-mutation";

import { activityFormService } from "../../_services/activity-form-service";

export default function useEditActivityEndpoint() {
  return useInvalidatingMutation({
    mutationKey: ["edit-activity"],
    mutationFn: activityFormService.editActivity,
    invalidateQueries: [["activities"]],
  });
}
