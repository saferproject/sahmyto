import { z } from "zod";
import { Dayjs } from "dayjs";

import { Member } from "../_types/member";

const ExpenseFormSchema = z.object({
  receiver: z.custom<Member>(),
  unit_price: z.number().min(0, "مبلغ کمتر از 0 نمی‌تواند باشد"),
  date: z.custom<Dayjs>(),
  wage_cost: z.number().min(0, "اجرت کمتر از 0 نمی‌تواند باشد").nullable(),
  description: z.string().nullable(),
  image: z.file().mime(["image/jpeg", "image/png"]).nullable(),
});

export default ExpenseFormSchema;

export type ExpenseFormType = z.infer<typeof ExpenseFormSchema>;
