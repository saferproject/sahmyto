import useZodForm from "@/app/_hooks/use-zod-form";

import ActivityFormSchema, {
  ActivityFormType,
} from "../_schemas/activity-form-schema";
import { getActivityFormInitial } from "../_constants/activity-form-initial";

export default function useActivityForm() {
  return useZodForm({
    schema: ActivityFormSchema,
    defaultValues: getActivityFormInitial(),
  });
}
