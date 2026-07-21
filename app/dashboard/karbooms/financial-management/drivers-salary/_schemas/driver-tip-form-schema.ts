import { z } from "zod";

const DriverTipFormSchema = z.object({
  amount: z.string().nullable(),
  description: z.string().nullable(),
});

export default DriverTipFormSchema;

export type DriverTipFormType = z.infer<typeof DriverTipFormSchema>;
