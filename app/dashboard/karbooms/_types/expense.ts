import User from "@/app/_interfaces/user";
import { ActivityStatus } from "./activity-status";
import { ExpenseCategoryTypes } from "./expense-category-types";
import { Approval } from "./approval";

export type Expense = {
  id: number;
  is_settled: boolean;
  unit_price: number;
  wage_cost: number;
  description: string | null;
  category: string;
  type: ExpenseCategoryTypes;
  status: ActivityStatus;
  payer: User | null;
  sender: User;
  settlement_date: string; // Format: "YYYY-MM-DD hh:mm:ss"
  date: string; // Format: "YYYY-MM-DD hh:mm:ss"
  created_at: string;
  deleted_at: string | null;
  approvals: Approval[];
};
