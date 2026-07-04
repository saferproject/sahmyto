import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import ThirdPartyInsuranceFormSchema, {
  ThirdPartyInsuranceFormType,
} from "../_schemas/third-party-insurance-form-schema";

import { THIRD_PARTY_INSURANCE_FORM_INITIAL } from "../_constants/third-party-insurance-form-initial";

export default function useThirdPartyInsuranceForm() {
  return useForm<ThirdPartyInsuranceFormType>({
    resolver: zodResolver(ThirdPartyInsuranceFormSchema),
    defaultValues: THIRD_PARTY_INSURANCE_FORM_INITIAL,
  });
}
