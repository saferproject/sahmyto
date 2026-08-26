import { FormStates } from "@/app/dashboard/_types/form-states";
import { Contact } from "./contact";

export type ContactFormProps = {
  formState: FormStates;
  contact?: Contact;
  onSuccess: () => void;
};