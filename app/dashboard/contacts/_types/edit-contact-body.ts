import { ContactFormType } from "../_schemas/contact-form-schema";

export type EditContactBody = {
  contactId: number;
} & ContactFormType;
