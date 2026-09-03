import useInfiniteListQuery from "@/app/_hooks/use-infinite-list-query";
import { dashboardService } from "../_services/dashboard-service";

export default function useGetKarboomRequests() {
  return useInfiniteListQuery({
    queryKey: ["requests"],
    queryFn: (page, signal) =>
      dashboardService.getKarboomRequests(signal, page),
  });
}
