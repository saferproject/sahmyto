import useZodForm from "@/app/_hooks/use-zod-form";

import PartnerFormSchema, {
  type PartnerFormType,
} from "../_schemas/partner-form-schema";

import { getPartnerFormInitial } from "../_constants/partner-form-initial";

export default function usePartnerForm() {
  return useZodForm<PartnerFormType>({
    schema: PartnerFormSchema,
    defaultValues: getPartnerFormInitial(),
    reValidateMode: "onSubmit",
  });
}
