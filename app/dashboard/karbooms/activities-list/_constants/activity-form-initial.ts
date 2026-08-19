import dayjs from "dayjs";
import { ActivityFormType } from "../_schemas/activity-form-schema";

export const getActivityFormInitial = (): ActivityFormType => ({
  date: dayjs(),
  description: "",
});
