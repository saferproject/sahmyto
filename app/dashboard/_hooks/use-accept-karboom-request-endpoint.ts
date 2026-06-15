import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dashboardService } from "../_services/dashboard-service";

export default function useAcceptKarboomRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["accept-request"],
    mutationFn: dashboardService.acceptKarboomRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
    },
  });
}
