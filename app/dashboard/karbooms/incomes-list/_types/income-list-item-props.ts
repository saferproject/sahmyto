import { Income } from "../../_types/income";

export type IncomeListItemProps = {
  income: Income;
  index: number;
  onShowDetails: () => void;
  onSettle: (incomeId: number) => void;
  onReject: (incomeId: number) => void;
};
