import { z } from "zod";
import { Dayjs } from "dayjs";

import { Member } from "../_types/member";

const ExpenseFormSchema = z
  .object({
    receiver: z.custom<Member>(),
    unit_price: z.string().nullable(),
    wage_cost: z.string().nullable(),
    date: z
      .custom<Dayjs>()
      .refine((value) => value.diff() <= 0, "تاریخ نباید بعد از امروز باشد"),
    description: z.string().nullable(),
    image: z.file().mime(["image/jpeg", "image/png"]).nullable(),
  })
  .superRefine(function ({ unit_price, wage_cost }, ctx) {
    if (!unit_price && !wage_cost) {
      ctx.addIssue({
        input: unit_price,
        path: ["unit_price"],
        code: "custom",
        message: "حداقل قیمت قطعه یا اجرت باید وارد شود",
      });
      ctx.addIssue({
        input: wage_cost,
        path: ["wage_cost"],
        code: "custom",
        message: "حداقل قیمت قطعه یا اجرت باید وارد شود",
      });
    }
  });

export default ExpenseFormSchema;

export type ExpenseFormType = z.infer<typeof ExpenseFormSchema>;
