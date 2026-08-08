import { z } from "@/app/_schemas/zod-mini";
import { Dayjs } from "dayjs";

import { Member } from "../_types/member";

const PaymentFormSchema = z.object({
  payer: z.custom<Member>(),
  reciever: z.custom<Member>(),
  total_price: z.nullish(z.string()),
  date: z
    .custom<Dayjs>()
    .check(
      z.refine((value) => value.diff() <= 0, "تاریخ نباید بعد از امروز باشد"),
    ),
  type: z.union([
    z.literal("debit"),
    z.literal("sheba"),
    z.literal("account"),
    z.literal("cash"),
    z.literal("bridge"),
  ]),
  description: z.nullable(z.string()),
});

export default PaymentFormSchema;

export type PaymentFormType = z.infer<typeof PaymentFormSchema>;
