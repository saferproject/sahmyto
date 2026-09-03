import { Income } from "../../_types/income";

import { USER_DEFAULTS } from "@/app/dashboard/_constants/user-defaults";

export const INCOME_LIST_STORE_DEFAULTS: Income = {
  id: 0,
  is_settled: false,
  type: "daily",
  unit_price: 0,
  quantity: 0,
  settlement_date: "",
  started_at: "",
  ended_at: "",
  status: "pending",
  description: null,
  receiver: null,
  sender: USER_DEFAULTS,
  reject_reason: null,
  rejected_at: null,
};
