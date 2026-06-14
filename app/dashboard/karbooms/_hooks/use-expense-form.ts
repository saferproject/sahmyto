import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import ExpenseFormSchema from "../_schemas/expense-form-schema";

import { EXPENSE_FORM_INITIAL } from "../_constants/expense-form-initial";

export default function useExpenseForm() {
  return useForm({
    resolver: zodResolver(ExpenseFormSchema),
    defaultValues: EXPENSE_FORM_INITIAL,
  });
}
