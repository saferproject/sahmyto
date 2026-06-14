import { z } from "zod";
import { Dayjs } from "dayjs";

const ProfileFormSchema = z.object({
  phone: z
    .string("شماره همراه فقط شامل اعداد میتواند باشد")
    .length(11, "شماره همراه باید 11 رقم باشد"),
  first_name: z.string("نام الزامی است").nullish(),
  last_name: z.string("نام خانوادگی الزامی است").nullish(),
  birthday: z.custom<Dayjs>().nullish(),
  father_name: z.string().nullish(),
  gender: z.union([z.literal("male"), z.literal("female")]).nullish(),
  email: z.string().nullish(),
});

export default ProfileFormSchema;

export type ProfileFormType = z.infer<typeof ProfileFormSchema>;
