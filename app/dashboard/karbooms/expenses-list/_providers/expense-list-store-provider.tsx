"use client";

import StoreProviderProps from "@/app/_interfaces/store-provider-props";
import { createContext, useState, useContext } from "react";
import { useStore } from "zustand";
import { createExpenseListStore } from "../_stores/expense-list-store";
import { ExpenseListStore } from "../_types/expense-list-store";

export type ExpenseListStoreApi = ReturnType<typeof createExpenseListStore>;

export const ExpenseListStoreContext = createContext<
  ExpenseListStoreApi | undefined
>(undefined);

export const ExpenseListStoreProvider = ({ children }: StoreProviderProps) => {
  const [store] = useState(() => createExpenseListStore());

  return (
    <ExpenseListStoreContext.Provider value={store}>
      {children}
    </ExpenseListStoreContext.Provider>
  );
};

export const useExpenseListStore = <T,>(
  selector: (store: ExpenseListStore) => T,
): T => {
  const expenseListStoreContext = useContext(ExpenseListStoreContext);

  if (!expenseListStoreContext) {
    throw new Error(
      `useUserInfoStore must be used within UserInfoStoreProvider`,
    );
  }

  return useStore(expenseListStoreContext, selector);
};
