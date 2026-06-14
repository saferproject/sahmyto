import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import IncomeFormSchema from "../_schemas/income-form-schema";

import { INCOME_FORM_INITIAL } from "../_constants/income-form-initial";

export default function useIncomeForm() {
  return useForm({
    resolver: zodResolver(IncomeFormSchema),
    defaultValues: INCOME_FORM_INITIAL,
  });
}
