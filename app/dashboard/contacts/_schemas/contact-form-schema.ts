import { z } from "@/app/_schemas/zod-mini";

const ContactFormSchema = z.object({
  first_name: z.string().check(z.maxLength(255)),
  last_name: z.string().check(z.maxLength(255)),
  phone: z.string().check(z.regex(/^09\d{9}$/)),
  description: z.nullish(z.string().check(z.maxLength(200))),
});

export default ContactFormSchema;

export type ContactFormType = z.infer<typeof ContactFormSchema>;
