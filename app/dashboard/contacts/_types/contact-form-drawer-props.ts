import { FormStates } from "@/app/dashboard/_types/form-states";
import { Contact } from "./contact";
import { ContactFormType } from "../_schemas/contact-form-schema";

export type ContactFormDrawerProps = {
  formState: FormStates;
  contact?: Contact;
  initialPhone?: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSuccess: (contact: ContactFormType) => void;
};
