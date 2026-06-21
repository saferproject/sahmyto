import { Dayjs } from "dayjs";
import { z } from "zod";

import { Member } from "../_types/member";

const IncomeFormSchema = z.object({
  reciever: z.custom<Member>(),
  quantity: z.number().nullable(),
  unit_price: z.number().nullable(),
  total_price: z.number().nullable(),
  started_at: z.custom<Dayjs>(),
  ended_at: z.custom<Dayjs>(),
  // type: z.union([
  //   z.literal("monthly"),
  //   z.literal("daily"),
  //   z.literal("hourly"),
  //   z.literal("services"),
  //   z.literal("travel"),
  // ]),
  description: z.string().nullable(),
  image: z.file().mime(["image/jpeg", "image/png"]).nullish(),
});

export default IncomeFormSchema;

export type IncomeFormType = z.infer<typeof IncomeFormSchema>;
