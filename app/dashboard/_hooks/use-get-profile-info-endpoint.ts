import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../_services/dashboard-service";

interface UseGetProfileInfoOptions {
  enabled?: boolean;
  redirectOnUnauthorized?: boolean;
}

export default function useGetProfileInfo({
  enabled = true,
  redirectOnUnauthorized = true,
}: UseGetProfileInfoOptions = {}) {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => dashboardService.getProfileInfo({ redirectOnUnauthorized }),
    enabled,
  });
}
