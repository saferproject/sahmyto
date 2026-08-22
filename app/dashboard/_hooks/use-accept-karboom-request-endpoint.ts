import useInvalidatingMutation from "@/app/_hooks/use-invalidating-mutation";

import { dashboardService } from "../_services/dashboard-service";

export default function useAcceptKarboomRequest() {
  return useInvalidatingMutation({
    mutationKey: ["accept-request"],
    mutationFn: dashboardService.acceptKarboomRequest,
    invalidateQueries: [["requests"], ["karbooms"]],
  });
}
