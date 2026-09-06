import { BodyInsuranceFormType } from "../_schemas/body-insurance-form-schema";

export type AddBodyInsuranceBody = Omit<
  BodyInsuranceFormType,
  "started_at" | "ended_at"
> & {
  karboomId: number;
  started_at: string;
  ended_at: string;
};
