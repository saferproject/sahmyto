import { createStore } from "zustand/vanilla";

import { FinancialMonth } from "../_types/financial-month";
import { FinancialMonthStore } from "../_types/financial-month-store-type";

import { FINANCIAL_MONTH_STORE_DEFAULTS } from "../_constants/financial-month-store-defaults";
import { KARBOOMS_STORE_DEFAULTS } from "../../_constants/karbooms-store-defaults";

export const createFinancialMonthStore = (
  initState: FinancialMonth = FINANCIAL_MONTH_STORE_DEFAULTS,
) => {
  return createStore<FinancialMonthStore>()((set) => ({
    ...initState,
    setFinancialMonth(financialMonth) {
      return set(() => financialMonth);
    },
    clearFinancialMonth() {
      return set(() => KARBOOMS_STORE_DEFAULTS);
    },
  }));
};
