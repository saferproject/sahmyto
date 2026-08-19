import { fetchWithAuth } from "@/app/proxy";
import { Activity } from "../_types/activity";

export const activitiesListService = {
  getActivities: (karboomId: number, signal?: AbortSignal) =>
    fetchWithAuth<Activity[]>(``, {
      method: "GET",
      signal,
    }),
  deleteActivity: (activityId: number) =>
    fetchWithAuth<undefined>(``, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }),
};
