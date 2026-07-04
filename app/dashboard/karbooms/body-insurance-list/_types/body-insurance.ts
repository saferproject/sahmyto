import { InsuranceCompany } from "../../_types/insurance-company";
import { InsuranceStatus } from "../../_types/insurance-status";

export type BodyInsurance = {
  id: number;
  karboom_id: number;
  insurance_company_id: number;
  company: InsuranceCompany;
  insurance_number: string;
  insurance_code: string;
  started_at: string;
  ended_at: string;
  status: InsuranceStatus;
  description: string;
};