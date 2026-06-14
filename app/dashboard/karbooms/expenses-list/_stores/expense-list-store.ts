import { createStore } from "zustand/vanilla";

import { Expense } from "../../_types/expense";

import { EXPENSE_LIST_STORE_DEFAULTS } from "../_constants/expense-list-store-defaults";

import { ExpenseListStore } from "../_types/expense-list-store";

export const createExpenseListStore = (
  initState: Expense = EXPENSE_LIST_STORE_DEFAULTS,
) => {
  return createStore<ExpenseListStore>()((set) => ({
    ...initState,
    setActiveExpense: (expense) => set(() => expense),
    clearActiveExpense: () => set(() => EXPENSE_LIST_STORE_DEFAULTS),
  }));
};
