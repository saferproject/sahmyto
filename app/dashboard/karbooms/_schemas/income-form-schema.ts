import { z } from "@/app/_schemas/zod-mini";
import { dayjsField, imageField } from "@/app/_schemas/field-presets";

import { Member } from "../_types/member";

const IncomeFormSchema = z
  .object({
    reciever: z.custom<Member>(),
    quantity: z
      .nullable(
        z
          .number("تعداد الزامی است")
          .check(z.minimum(1, "تعداد باید حداقل 1 باشد")),
      )
      .check(z.refine((value) => value !== null, "تعداد الزامی است")),
    unit_price: z.string(),
    total_price: z.readonly(z.nullable(z.string())),
    started_at: dayjsField,
    ended_at: dayjsField,
    description: z.nullable(z.string()),
    image: z.nullish(imageField),
  })
  .check(
    z.superRefine(({ started_at, ended_at }, ctx) => {
      if (ended_at && started_at.diff(ended_at) > 0)
        ctx.addIssue({
          code: "too_big",
          origin: "date",
          input: started_at,
          path: ["started_at"],
          maximum: 1,
          message: "تاریخ شروع نباید بعد از تاریخ پایان باشد",
        });

      if (ended_at && ended_at.diff(started_at) < 0)
        ctx.addIssue({
          code: "too_big",
          origin: "date",
          input: ended_at,
          path: ["ended_at"],
          maximum: 1,
          message: "تاریخ پایان نباید قبل از تاریخ شروع باشد",
        });
    }),
  );

export default IncomeFormSchema;

export type IncomeFormType = z.infer<typeof IncomeFormSchema>;

export type IncomeFormInput = z.input<typeof IncomeFormSchema>;
