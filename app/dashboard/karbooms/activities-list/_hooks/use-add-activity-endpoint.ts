import useInvalidatingMutation from "@/app/_hooks/use-invalidating-mutation";

import { activityFormService } from "../../_services/activity-form-service";

export default function useAddActivityEndpoint() {
  return useInvalidatingMutation({
    mutationKey: ["add-activity"],
    mutationFn: activityFormService.addActivity,
    invalidateQueries: [["activities"]],
  });
}
