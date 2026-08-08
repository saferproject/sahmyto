import { Dayjs } from "dayjs";
import { z } from "@/app/_schemas/zod-mini";

const PartnerFormSchema = z
  .object({
    phone: z
      .string()
      .check(
        z.length(11, "شماره تماس باید 11 رقم باشد"),
        z.regex(/09\d{9}/g, "شماره تماس باید با 09 شروع شود"),
      ),
    first_name: z.string(),
    last_name: z.string(),
    share_capital: z.readonly(z.number().check(z.nonnegative())),
    share_decimal: z.readonly(z.number().check(z.nonnegative())),
    started_at: z.custom<Dayjs>(),
    ended_at: z.nullish(z.custom<Dayjs>()),
    description: z.nullish(z.string().check(z.maxLength(200))),
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

export default PartnerFormSchema;

export type PartnerFormType = z.infer<typeof PartnerFormSchema>;
