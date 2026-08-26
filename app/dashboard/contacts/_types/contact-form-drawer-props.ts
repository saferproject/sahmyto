import { FormStates } from "@/app/dashboard/_types/form-states";
import { Contact } from "./contact";

export type ContactFormDrawerProps = {
  formState: FormStates;
  contact?: Contact;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSuccess: () => void;
};
