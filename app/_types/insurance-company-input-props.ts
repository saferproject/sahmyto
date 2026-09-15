import { Control } from "react-hook-form";

import { ThirdPartyInsuranceFormType } from "../dashboard/karbooms/[karboomId]/third-party-insurance-list/_schemas/third-party-insurance-form-schema";

type InsuranceCompanyInputProps = {
  control: Control<ThirdPartyInsuranceFormType>;
  enableGettingData: boolean;
  error?: boolean;
  helperText?: string;
};

export default InsuranceCompanyInputProps;
