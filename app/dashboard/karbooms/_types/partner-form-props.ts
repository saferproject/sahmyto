import { FormStates } from "@/app/dashboard/_types/form-states";
import Partner from "../_interfaces/partner";

export type PartnerFormProps = {
  formState: FormStates;
  partner?: Partner;
  onCancel: () => void;
  onSuccess: () => void;
};
