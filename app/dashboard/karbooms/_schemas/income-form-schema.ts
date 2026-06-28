import { Dayjs } from "dayjs";
import { z } from "zod";

import { Member } from "../_types/member";

const IncomeFormSchema = z
  .object({
    reciever: z.custom<Member>(),
    quantity: z
      .number("تعداد الزامی است")
      .min(1, "تعداد باید حداقل 1 باشد")
      .nullable()
      .refine((value) => value !== null, "تعداد الزامی است"),
    unit_price: z.string(),
    total_price: z.string().nullable().readonly(),
    started_at: z.custom<Dayjs>(),
    ended_at: z.custom<Dayjs>(),
    description: z.string().nullable(),
    image: z.file().mime(["image/jpeg", "image/png"]).nullish(),
  })
  .superRefine(({ started_at, ended_at }, ctx) => {
    if (started_at.diff(ended_at) > 0)
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
  });

export default IncomeFormSchema;

export type IncomeFormType = z.infer<typeof IncomeFormSchema>;

export type IncomeFormInput = z.input<typeof IncomeFormSchema>;
