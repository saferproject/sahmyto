import { FinancialMonth } from "./financial-month";
import { FinancialMonthStoreActions } from "./financial-month-store-triggers";

export type FinancialMonthStore = FinancialMonth & FinancialMonthStoreActions;
