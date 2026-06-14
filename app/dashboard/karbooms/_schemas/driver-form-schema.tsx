import { Dayjs } from "dayjs";
import { z } from "zod";

const DriverFormSchema = z.object({
  phone: z
    .string()
    .length(11, "شماره تماس باید 11 رقم باشد")
    .regex(/09\d{9}/g, "شماره تماس باید با 09 شروع شود"),
  first_name: z.string(),
  last_name: z.string(),
  started_at: z.custom<Dayjs>(),
  ended_at: z.custom<Dayjs>().nullish(),
  payment_type: z.union([z.literal("daily"), z.literal("monthly")]),
  fixed_amount: z.number().min(0).max(999_999_999),
  percentage_amount: z.number().min(0).max(100),
  description: z.string().max(200).nullish(),
});

export default DriverFormSchema;

export type DriverFormType = z.infer<typeof DriverFormSchema>;
