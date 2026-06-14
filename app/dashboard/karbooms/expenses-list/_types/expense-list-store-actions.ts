import { Expense } from "../../_types/expense";

export type ExpenseListStoreActions = {
  setActiveExpense: (expense: Expense) => void;
  clearActiveExpense: () => void;
};
