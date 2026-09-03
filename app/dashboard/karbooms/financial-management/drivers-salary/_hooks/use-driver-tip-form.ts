import useZodForm from "@/app/_hooks/use-zod-form";

import DriverTipFormSchema from "../_schemas/driver-tip-form-schema";
import { DRIVER_TIP_FORM_DEFAULTS } from "../_constants/driver-tip-form-defaults";

export default function useDriverTipForm() {
  return useZodForm({
    schema: DriverTipFormSchema,
    defaultValues: DRIVER_TIP_FORM_DEFAULTS,
  });
}
