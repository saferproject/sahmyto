import type { ActivityFormType } from "../activities-list/_schemas/activity-form-schema";

export type AddActivityDataType = {
  karboomId: number;
  date: string;
} & Omit<ActivityFormType, "date">;
