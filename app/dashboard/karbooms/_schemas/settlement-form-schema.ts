import { z } from "@/app/_schemas/zod-mini";
import { Member } from "../_types/member";
import { dayjsField } from "@/app/_schemas/field-presets";

const SettlementFormSchema = z.object({
  member: z.custom<Member>(),
  settlement_date: dayjsField,
  description: z.nullable(z.string()),
});

export default SettlementFormSchema;

export type SettlementFormType = z.infer<typeof SettlementFormSchema>;
