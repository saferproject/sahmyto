import { Control } from "react-hook-form";

import { ThirdPartyInsuranceFormType } from "../dashboard/karbooms/third-party-insurance-list/_schemas/third-party-insurance-form-schema";


export default interface InsuranceCompanyInputProps {
  control: Control<ThirdPartyInsuranceFormType>;
  enableGettingData: boolean;
}
