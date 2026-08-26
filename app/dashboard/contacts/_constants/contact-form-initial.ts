import { ContactFormType } from "../_schemas/contact-form-schema";

export const getContactFormInitial = (): ContactFormType => ({
  phone: "",
  first_name: "",
  last_name: "",
  description: null
});
