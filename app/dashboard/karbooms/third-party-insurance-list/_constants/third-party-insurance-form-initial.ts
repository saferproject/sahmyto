import dayjs from "dayjs";

import { ThirdPartyInsuranceFormType } from "../_schemas/third-party-insurance-form-schema";

export const THIRD_PARTY_INSURANCE_FORM_INITIAL: ThirdPartyInsuranceFormType = {
  insurance_number: "",
  insurance_company_id: 0,
  insurance_code: "",
  started_at: dayjs(),
  ended_at: dayjs(),
  description: "",
};
