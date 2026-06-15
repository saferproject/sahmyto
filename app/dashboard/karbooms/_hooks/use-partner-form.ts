import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import PartnerFormSchema, {
  type PartnerFormType,
} from "../_schemas/partner-form-schema";

import { PARTNER_FORM_INITIAL } from "../_constants/partner-form-initial";

export default function usePartnerForm() {
  return useForm<PartnerFormType>({
    resolver: zodResolver(PartnerFormSchema),
    defaultValues: PARTNER_FORM_INITIAL,
  });
}
