import { FinancialMonth } from "./financial-month";

export type MonthListProps = {
  selectedMonth: null | FinancialMonth;
  onSelectMonth: (month: FinancialMonth) => void;
};