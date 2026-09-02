import useInfiniteListQuery from "@/app/_hooks/use-infinite-list-query";
import { sessionsService } from "../_services/sessions-service";

export default function useGetSessions() {
  return useInfiniteListQuery({
    queryKey: ["sessions"],
    queryFn: (page, signal) =>
      sessionsService.getSessions(signal, page),
  });
}
