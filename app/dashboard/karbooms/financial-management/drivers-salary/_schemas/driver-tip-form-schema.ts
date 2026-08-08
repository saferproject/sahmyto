import { z } from "@/app/_schemas/zod-mini";

const DriverTipFormSchema = z.object({
  amount: z.nullable(z.string()),
  description: z.nullable(z.string()),
});

export default DriverTipFormSchema;

export type DriverTipFormType = z.infer<typeof DriverTipFormSchema>;
