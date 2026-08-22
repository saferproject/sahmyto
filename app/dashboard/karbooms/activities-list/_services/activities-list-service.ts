import { http } from "@/app/_services/http";
import { Activity } from "../_types/activity";

export const activitiesListService = {
  getActivities: (karboomId: number, signal?: AbortSignal) =>
    http.get<Activity[]>(``, { signal }),
  deleteActivity: (activityId: number) => http.delete<undefined>(``),
};
