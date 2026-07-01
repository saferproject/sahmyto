import { ThirdPartyInsuranceFormType } from "../_schemas/third-party-insurance-form-schema";

export type ThirdPartyInsuranceFormProps = {
  isOpen: boolean;
  karboomId: number;
  onSubmit: (data: ThirdPartyInsuranceFormType) => void;
};