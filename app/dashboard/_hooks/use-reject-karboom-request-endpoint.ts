import { useMutation, useQueryClient } from "@tanstack/react-query";

import { dashboardService } from "../_services/dashboard-service";

export default function useRejectKarboomRequest() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationKey: ["requests"],
    mutationFn: dashboardService.rejectKarboomRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
    },
  });
}
