import { IncomeTypes } from "./income-categories";

export type IncomeDrawerFormProps = {
  isOpen: boolean;
  karboomId: number;
  incomeType: IncomeTypes;
  onSuccess: () => void;
};
