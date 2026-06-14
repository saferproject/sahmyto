import { z } from "zod";

const LoginFormSchema = z.object({
  phone: z
    .string("شماره همراه فقط شامل اعداد میتواند باشد")
    .length(11, "شماره همراه باید 11 رقم باشد")
    .regex(/^09\d{9}/g, "شماره همراه معتبر نیست"),
});

export default LoginFormSchema;

export type LoginFormType = z.infer<typeof LoginFormSchema>;
