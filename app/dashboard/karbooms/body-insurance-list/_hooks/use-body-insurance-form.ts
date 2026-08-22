import useZodForm from "@/app/_hooks/use-zod-form";

import { BODY_INSURANCE_FORM_INITIAL } from "../_constants/body-insurance-form-initial";
import BodyInsuranceFormSchema, {
  BodyInsuranceFormType,
} from "../_schemas/body-insurance-form-schema";

export default function useBodyInsuranceForm() {
  return useZodForm<BodyInsuranceFormType>({
    schema: BodyInsuranceFormSchema,
    defaultValues: BODY_INSURANCE_FORM_INITIAL,
  });
}
