import { FormStates } from "@/app/dashboard/_types/form-states";
import Partner from "../_interfaces/partner";

export type PartnerFormDrawerProps = {
  formState: FormStates;
  partner?: Partner;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSuccess: () => void;
};
