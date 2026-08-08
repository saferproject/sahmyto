import { z } from "@/app/_schemas/zod-mini";
import { Dayjs } from "dayjs";

const ProfileFormSchema = z.object({
  phone: z
    .string("شماره همراه فقط شامل اعداد میتواند باشد")
    .check(z.length(11, "شماره همراه باید 11 رقم باشد")),
  first_name: z.nullish(z.string("نام الزامی است")),
  last_name: z.nullish(z.string("نام خانوادگی الزامی است")),
  birthday: z.nullish(z.custom<Dayjs>()),
  father_name: z.nullish(z.string()),
  gender: z.nullish(z.union([z.literal("male"), z.literal("female")])),
  email: z.nullish(z.string()),
});

export default ProfileFormSchema;

export type ProfileFormType = z.infer<typeof ProfileFormSchema>;
