import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import ThirdPartyInsuranceFormSchema, {
  ThirdPartyInsuranceFormType,
} from "../_schemas/third-party-insurance-form-schema";
import dayjs from "dayjs";

export default function useThirdPartyInsuranceForm() {
  return useForm<ThirdPartyInsuranceFormType>({
    resolver: zodResolver(ThirdPartyInsuranceFormSchema),
    defaultValues: {
      insurance_number: "",
      insurance_company_id: 0,
      insurance_code: "",
      started_at: dayjs(),
      ended_at: dayjs(),
      description: "",
    },
  });
}
