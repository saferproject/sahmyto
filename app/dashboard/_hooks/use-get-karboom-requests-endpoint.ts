import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../_services/dashboard-service";

export default function useGetKarboomRequests() {
  return useQuery({
    queryKey: ["requests"],
    queryFn: dashboardService.getKarboomRequests,
  });
}
