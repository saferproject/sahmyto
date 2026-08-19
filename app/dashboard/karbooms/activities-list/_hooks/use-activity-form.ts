import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ActivityFormSchema from "../_schemas/activity-form-schema";
import { getActivityFormInitial } from "../_constants/activity-form-initial";

export default function useActivityForm() {
  return useForm({
    resolver: zodResolver(ActivityFormSchema),
    defaultValues: getActivityFormInitial(),
  });
}
