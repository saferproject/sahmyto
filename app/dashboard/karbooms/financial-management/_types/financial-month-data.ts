import { Expense } from "../../_types/expense";
import { Income } from "../../_types/income";
import { FinancialMonthStatus } from "./financial-month-status";

export type FinancialMonthData = {
  id: number;
  date: string;
  status: FinancialMonthStatus;
  incomes: Array<Income>;
  expenses: Array<Expense>;
  payments: Array<unknown>;
};
