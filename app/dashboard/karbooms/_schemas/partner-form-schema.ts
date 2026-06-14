import { Dayjs } from "dayjs";
import { z } from "zod";

const PartnerFormSchema = z.object({
  phone: z
    .string()
    .length(11, "شماره تماس باید 11 رقم باشد")
    .regex(/09\d{9}/g, "شماره تماس باید با 09 شروع شود"),
  first_name: z.string(),
  last_name: z.string(),
  share_capital: z.number().nonnegative(),
  share_decimal: z.number().nonnegative(),
  started_at: z.custom<Dayjs>(),
  ended_at: z.custom<Dayjs>().nullish(),
  description: z.string().max(200).nullish(),
});

export default PartnerFormSchema;

export type PartnerFormType = z.infer<typeof PartnerFormSchema>;
