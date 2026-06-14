import { z } from "zod";

const RejectFormSchema = z.object({
  reject_reason: z.string().nullable(),
});

export default RejectFormSchema;

export type RejectFormType = z.infer<typeof RejectFormSchema>;
