import dayjs from "dayjs";
import { BodyInsuranceFormType } from "../_schemas/body-insurance-form-schema";

export const BODY_INSURANCE_FORM_INITIAL: BodyInsuranceFormType = {
  insurance_code: "",
  insurance_company_id: 0,
  insurance_number: "",
  started_at: dayjs(),
  ended_at: dayjs(),
  description: null,
};
