import { BodyInsuranceFormType } from "../_schemas/body-insurance-form-schema";

export type BodyInsuranceDrawerFormProps = {
  onSubmit: (data: BodyInsuranceFormType) => void;
};
