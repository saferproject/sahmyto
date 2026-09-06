import { FinancialMonthStatus } from "./financial-month-status";

export type FinancialMonth = {
  id: number;
  karboom_id: number;
  date: string;
  status: FinancialMonthStatus;
  closed_at: string;
  created_at: string;
  updated_at: string;
};
