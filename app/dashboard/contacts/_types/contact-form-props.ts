import { FormStates } from "@/app/dashboard/_types/form-states";
import { Contact } from "./contact";
import { ContactFormType } from "../_schemas/contact-form-schema";

export type ContactFormProps = {
  formState: FormStates;
  contact?: Contact;
  initialPhone?: string;
  onSuccess: (contact: ContactFormType) => void;
};
