import { FinancialMonth } from "./financial-month";

export type MonthListItemProps = {
  financialMonth: FinancialMonth;
  selectedMonthId: null | number;
  onSelectMonth: (monthId: number) => void;
  index: number;
};