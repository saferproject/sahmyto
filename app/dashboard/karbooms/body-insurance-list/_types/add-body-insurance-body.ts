import { BodyInsuranceFormType } from "../_schemas/body-insurance-form-schema";

export type AddBodyInsuranceBody = BodyInsuranceFormType & {
  karboomId: number;
};
