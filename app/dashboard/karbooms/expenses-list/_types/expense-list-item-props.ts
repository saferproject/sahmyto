import { Expense } from "../../_types/expense";

export type ExpenseListItemProps = {
  expense: Expense;
  index: number;
  onShowDetails: () => void;
  onSettle: (expenseId: number) => void;
  onReject: (expenseId: number) => void;
};
