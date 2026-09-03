import useZodForm from "@/app/_hooks/use-zod-form";

import DriverFormSchema, {
  DriverFormType,
} from "../_schemas/driver-form-schema";

import { getDriverFormInitial } from "../_constants/driver-form-initial";

export default function useDriverForm() {
  return useZodForm<DriverFormType>({
    schema: DriverFormSchema,
    defaultValues: getDriverFormInitial(),
  });
}
