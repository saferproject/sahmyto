import useZodForm from "@/app/_hooks/use-zod-form";
import ContactFormSchema, { ContactFormType } from "../_schemas/contact-form-schema";
import { getContactFormInitial } from "../_constants/contact-form-initial";

export default function useContactForm() {
  return useZodForm<ContactFormType>({
    schema: ContactFormSchema,
    defaultValues: getContactFormInitial(),
  });
}