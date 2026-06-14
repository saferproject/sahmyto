"use client";

import { createContext, useState, useContext } from "react";
import { useStore } from "zustand";

import StoreProviderProps from "@/app/_interfaces/store-provider-props";
import { createIncomeListStore } from "../_stores/income-list-store";
import { IncomeListStore } from "../_types/income-list-store";

export type IncomeListStoreApi = ReturnType<typeof createIncomeListStore>;

export const IncomeListStoreContext = createContext<
  IncomeListStoreApi | undefined
>(undefined);

export const IncomeListStoreProvider = ({ children }: StoreProviderProps) => {
  const [store] = useState(() => createIncomeListStore());

  return (
    <IncomeListStoreContext.Provider value={store}>
      {children}
    </IncomeListStoreContext.Provider>
  );
};

export const useIncomeListStore = <T,>(
  selector: (store: IncomeListStore) => T,
): T => {
  const incomeListStoreContext = useContext(IncomeListStoreContext);

  if (!incomeListStoreContext) {
    throw new Error(
      `useUserInfoStore must be used within UserInfoStoreProvider`,
    );
  }

  return useStore(incomeListStoreContext, selector);
};
