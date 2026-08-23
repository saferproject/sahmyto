import type { ActivityFormType } from "../activities-list/_schemas/activity-form-schema";

export type EditActivityDataType = {
  activityId: number;
  date: string;
} & Omit<ActivityFormType, "date">;
