import { useMutation } from "@tanstack/react-query";
import { dashboardService } from "../_services/dashboard-service";

export default function useUserLogout() {
  return useMutation({
    mutationKey: ["profile"],
    mutationFn: dashboardService.userLogout,
  });
}
