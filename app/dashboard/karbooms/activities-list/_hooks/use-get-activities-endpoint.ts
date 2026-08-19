import { useQuery } from "@tanstack/react-query";
import { activitiesListService } from "../_services/activities-list-service";

export default function useGetActivitiesEndpoint(karboomId: number) {
  return useQuery({
    queryKey: ["activities", karboomId],
    queryFn: ({ signal }) =>
      activitiesListService.getActivities(karboomId, signal),
  });
}
