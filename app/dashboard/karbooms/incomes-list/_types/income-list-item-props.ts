import { Income } from "../../_types/income";

export type IncomeListItemProps = {
  income: Income;
  index: number;
  onShowDetails: () => void;
  onRejectIncome: (incomeId: number) => void;
};
