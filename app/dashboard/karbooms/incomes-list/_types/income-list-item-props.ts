import { Income } from "../../_types/income";

export type IncomeListItemProps = {
  income: Income;
  onShowDetails: () => void;
  onRejectIncome: (incomeId: number) => void;
};
