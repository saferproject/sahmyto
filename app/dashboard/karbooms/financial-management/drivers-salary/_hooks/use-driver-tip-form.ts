import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import DriverTipFormSchema from "../_schemas/driver-tip-form-schema";
import { DRIVER_TIP_FORM_DEFAULTS } from "../_constants/driver-tip-form-defaults";

export default function useDriverTipForm() {
  return useForm({
    resolver: zodResolver(DriverTipFormSchema),
    defaultValues: DRIVER_TIP_FORM_DEFAULTS,
  });
}
