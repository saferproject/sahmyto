import { z } from "@/app/_schemas/zod-mini";
import { dayjsField, imageField } from "@/app/_schemas/field-presets";

import { Member } from "../_types/member";

const ExpenseFormSchema = z
  .object({
    is_settled: z.boolean("وضعیت تسویه الزامی است"),
    settlement_date: z.nullable(dayjsField),
    payer: z.custom<Member>(),
    unit_price: z.nullable(z.string()),
    wage_cost: z.nullable(z.string()),
    date: dayjsField.check(
      z.refine((value) => value.diff() <= 0, "تاریخ نباید بعد از امروز باشد"),
    ),
    description: z.nullable(z.string()),
    image: z.nullable(imageField),
  })
  .check(
    z.superRefine(function ({ unit_price, wage_cost }, ctx) {
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
    }),
  );

export default ExpenseFormSchema;

export type ExpenseFormType = z.infer<typeof ExpenseFormSchema>;
