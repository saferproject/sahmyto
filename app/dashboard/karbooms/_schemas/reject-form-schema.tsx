import { z } from "@/app/_schemas/zod-mini";

const RejectFormSchema = z.object({
  reject_reason: z.string(),
});

export default RejectFormSchema;

export type RejectFormType = z.infer<typeof RejectFormSchema>;
