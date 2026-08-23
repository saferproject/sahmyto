import { http } from "@/app/_services/http";
import { AddActivityDataType } from "../_types/add-activity-data-type";
import { EditActivityDataType } from "../_types/edit-activity-data-type";

export const activityFormService = {
  addActivity: ({ karboomId, ...other }: AddActivityDataType) =>
    http.post<undefined>(``, { body: other }),
  editActivity: ({ activityId, ...other }: EditActivityDataType) =>
    http.put<undefined>(``, { body: other }),
};
