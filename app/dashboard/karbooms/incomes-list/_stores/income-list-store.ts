import { createStore } from "zustand/vanilla";

import { Income } from "../../_types/income";

import { INCOME_LIST_STORE_DEFAULTS } from "../_constants/income-list-store-defaults";
import { IncomeListStore } from "../_types/income-list-store";

export const createIncomeListStore = (
  initState: Income = INCOME_LIST_STORE_DEFAULTS,
) => {
  return createStore<IncomeListStore>()((set) => ({
    ...initState,
    setActiveIncome: (income) => set(() => income),
    clearActiveIncome: () => set(() => INCOME_LIST_STORE_DEFAULTS),
  }));
};
