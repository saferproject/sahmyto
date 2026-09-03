import SettlementFormSchema, {
  SettlementFormType,
} from "../_schemas/settlement-form-schema";
import { SETTLEMENT_FORM_INITIAL } from "../_constants/settlement-form-initial";
import useZodForm from "@/app/_hooks/use-zod-form";

export default function useSettlementForm() {
  return useZodForm<SettlementFormType>({
    schema: SettlementFormSchema,
    defaultValues: SETTLEMENT_FORM_INITIAL,
  });
}
