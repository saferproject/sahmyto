import { Dayjs } from "dayjs";
import { z } from "zod";

const ActivityFormSchema = z.object({
  date: z.custom<Dayjs>(),
  description: z.string().min(1, "توضیحات را وارد کنید"),
});

export default ActivityFormSchema;

export type ActivityFormType = z.infer<typeof ActivityFormSchema>;