import { USER_DEFAULTS } from "@/app/dashboard/_constants/user-defaults";

import { Expense } from "../../_types/expense";

export const EXPENSE_LIST_STORE_DEFAULTS: Expense = {
  id: 0,
  type: "daily",
  category: "",
  status: "pending",
  unit_price: 0,
  wage_cost: 0,
  created_at: "",
  deleted_at: "",
  date: "",
  description: null,
  sender: USER_DEFAULTS,
  payer: USER_DEFAULTS,
  approvals: [],
};
