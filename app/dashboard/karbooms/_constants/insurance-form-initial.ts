import dayjs from "dayjs";

import { InsuranceFormType } from "../_schemas/insurance-form-schema";

export const INSURANCE_FORM_INITIAL: InsuranceFormType = {
  insurance_number: "",
  insurance_company_id: 0,
  insurance_code: "",
  started_at: dayjs(),
  ended_at: dayjs(),
  description: null,
};
