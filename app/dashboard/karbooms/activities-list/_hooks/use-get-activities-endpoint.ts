import useListQuery from "@/app/_hooks/use-list-query";

import { activitiesListService } from "../_services/activities-list-service";

export default function useGetActivitiesEndpoint(karboomId: number) {
  return useListQuery(
    ["activities", karboomId],
    activitiesListService.getActivities,
    karboomId,
  );
}
