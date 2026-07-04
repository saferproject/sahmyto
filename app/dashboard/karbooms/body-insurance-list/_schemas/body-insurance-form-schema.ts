import { Dayjs } from "dayjs";
import { z } from "zod";

const BodyInsuranceFormSchema = z.object({
  insurance_company_id: z.number("انتخاب شرکت بیمه الزامی است"),
  insurance_number: z.string("شماره بیمه الزامی است"),
  insurance_code: z.string("کد یکتای بیمه الزامی است"),
  started_at: z.custom<Dayjs>(),
  ended_at: z.custom<Dayjs>(),
  description: z.string().nullish(),
});

export default BodyInsuranceFormSchema;

export type BodyInsuranceFormType = z.infer<typeof BodyInsuranceFormSchema>;
