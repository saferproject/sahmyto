import { Expense } from "../../_types/expense";

export type ExpenseListItemProps = {
  expense: Expense;
  index: number;
  onShowDetails: () => void;
  onRejectExpense: (expenseId: number) => void;
};
