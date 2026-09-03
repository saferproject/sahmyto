import { http } from "@/app/_services/http";
import { AddActivityDataType } from "../_types/add-activity-data-type";
import { EditActivityDataType } from "../_types/edit-activity-data-type";

export const activityFormService = {
  addActivity: ({ karboomId, ...other }: AddActivityDataType) => {
    void karboomId;
    return http.post<undefined>(``, { body: other });
  },
  editActivity: ({ activityId, ...other }: EditActivityDataType) => {
    void activityId;
    return http.put<undefined>(``, { body: other });
  },
};
