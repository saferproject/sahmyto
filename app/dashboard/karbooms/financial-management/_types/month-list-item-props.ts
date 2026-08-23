import { FinancialMonth } from "./financial-month";

export type MonthListItemProps = {
  financialMonth: FinancialMonth;
  selectedMonth: null | FinancialMonth;
  index: number;
  onSelectMonth: (month: FinancialMonth) => void;
};
