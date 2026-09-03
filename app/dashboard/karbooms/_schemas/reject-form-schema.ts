import { z } from "@/app/_schemas/zod-mini";

const RejectFormSchema = z.object({
  reject_reason: z
    .string()
    .check(z.trim(), z.minLength(1, "دلیل رد کردن را وارد کنید")),
});

export default RejectFormSchema;

export type RejectFormType = z.infer<typeof RejectFormSchema>;
