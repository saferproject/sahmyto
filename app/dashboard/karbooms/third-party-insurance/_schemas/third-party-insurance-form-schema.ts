import { Dayjs } from "dayjs";
import { z } from "zod";

const ThirdPartyInsuranceFormSchema = z.object({
  insurance_company_id: z.number(),
  insurance_number: z.string("شماره بیمه الزامی است"),
  insurance_code: z.string("کد یکتای بیمه الزامی است"),
  started_at: z.custom<Dayjs>(),
  ended_at: z.custom<Dayjs>(),
  // started_at: z.string(),
  // ended_at: z.string(),
  description: z.string().nullish(),
});

export default ThirdPartyInsuranceFormSchema;

export type ThirdPartyInsuranceFormType = z.infer<
  typeof ThirdPartyInsuranceFormSchema
>;
