import { IncomeFormType } from "../_schemas/income-form-schema";
import { IncomeTypes } from "./income-categories";

export type IncomeDrawerFormProps = {
  isOpen: boolean;
  karboomId: number;
  incomeType: IncomeTypes;
  onSubmit: (income: IncomeFormType) => void;
};
