import useZodForm from "@/app/_hooks/use-zod-form";

import IncomeFormSchema from "../_schemas/income-form-schema";

import { INCOME_FORM_INITIAL } from "../_constants/income-form-initial";

export default function useIncomeForm() {
  return useZodForm({
    schema: IncomeFormSchema,
    defaultValues: INCOME_FORM_INITIAL,
  });
}
