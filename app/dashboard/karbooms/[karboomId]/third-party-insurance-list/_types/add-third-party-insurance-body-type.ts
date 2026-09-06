import { ThirdPartyInsuranceFormType } from "../_schemas/third-party-insurance-form-schema";

type ThirdPartyInsuranceBodyType = Omit<
  ThirdPartyInsuranceFormType,
  "started_at" | "ended_at"
> & {
  karboom_id: number;
  started_at: string;
  ended_at: string;
};

export default ThirdPartyInsuranceBodyType;
