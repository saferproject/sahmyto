import { InsuranceCompany } from "./insurance-company";
import { ThirdPartyInsuranceStatus } from "./third-party-insurance-status";

export type ThirdPartyInsurance = {
  id: string;
  karboom_id: number;
  insurance_company_id: number;
  company: InsuranceCompany;
  insurance_number: string;
  insurance_code: string;
  started_at: string;
  ended_at: string;
  status: ThirdPartyInsuranceStatus;
  description: null | string;
};