import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../_services/dashboard-service";

export default function useGetProfileInfo() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: dashboardService.getProfileInfo,
  });
}
