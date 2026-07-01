import { Control } from "react-hook-form";

import { ThirdPartyInsuranceFormType } from "@/app/dashboard/karbooms/third-party-insurance/_schemas/third-party-insurance-form-schema";

export default interface InsuranceCompanyInputProps {
  control: Control<ThirdPartyInsuranceFormType>;
}
