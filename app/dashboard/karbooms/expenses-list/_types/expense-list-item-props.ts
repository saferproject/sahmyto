import { Expense } from "../../_types/expense";

export type ExpenseListItemProps = {
  expense: Expense;
  onShowDetails: () => void;
  onRejectExpense: (expenseId: number) => void;
};
