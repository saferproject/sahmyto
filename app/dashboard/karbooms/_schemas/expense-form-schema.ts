import { z } from "zod";
import { Dayjs } from "dayjs";

import { Member } from "../_types/member";

const ExpenseFormSchema = z.object({
  receiver: z.custom<Member>(),
  unit_price: z.string(),
  wage_cost: z.string().nullable(),
  date: z
    .custom<Dayjs>()
    .refine((value) => value.diff() <= 0, "تاریخ نباید بعد از امروز باشد"),
  description: z.string().nullable(),
  image: z.file().mime(["image/jpeg", "image/png"]).nullable(),
});

export default ExpenseFormSchema;

export type ExpenseFormType = z.infer<typeof ExpenseFormSchema>;
