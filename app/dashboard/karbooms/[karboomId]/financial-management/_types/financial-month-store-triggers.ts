import { FinancialMonth } from "./financial-month";

export type FinancialMonthStoreActions = {
  setFinancialMonth: (financialMonth: FinancialMonth) => void;
  clearFinancialMonth: () => void;
};
