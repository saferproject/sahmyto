import useInvalidatingMutation from "@/app/_hooks/use-invalidating-mutation";

import { dashboardService } from "../_services/dashboard-service";

export default function useRejectKarboomRequest() {
  return useInvalidatingMutation({
    mutationKey: ["requests"],
    mutationFn: dashboardService.rejectKarboomRequest,
    invalidateQueries: [["requests"], ["karbooms"]],
  });
}
