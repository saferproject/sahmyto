import useZodForm from "@/app/_hooks/use-zod-form";

import ExpenseFormSchema from "../_schemas/expense-form-schema";

import { EXPENSE_FORM_INITIAL } from "../_constants/expense-form-initial";

export default function useExpenseForm() {
  return useZodForm({
    schema: ExpenseFormSchema,
    defaultValues: EXPENSE_FORM_INITIAL,
  });
}
