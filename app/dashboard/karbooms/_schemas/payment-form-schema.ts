import { z } from "zod";
import { Dayjs } from "dayjs";

import { Member } from "../_types/member";

const PaymentFormSchema = z.object({
  reciever: z.custom<Member>(),
  total_price: z.string(),
  date: z
    .custom<Dayjs>()
    .refine((value) => value.diff() <= 0, "تاریخ نباید بعد از امروز باشد"),
  description: z.string().nullable(),
});

export default PaymentFormSchema;

export type PaymentFormType = z.infer<typeof PaymentFormSchema>;