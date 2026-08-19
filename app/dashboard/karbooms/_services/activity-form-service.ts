import { fetchWithAuth } from "@/app/proxy";
import { AddActivityDataType } from "../_types/add-activity-data-type";
import { EditActivityDataType } from "../_types/edit-activity-data-type";

export const activityFormService = {
  addActivity: ({ karboomId, ...other }: AddActivityDataType) =>
    fetchWithAuth<undefined>(``, {
      body: JSON.stringify(other),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }),
  editActivity: ({ activityId, ...other }: EditActivityDataType) =>
    fetchWithAuth<undefined>(``, {
      body: JSON.stringify(other),
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    }),
};