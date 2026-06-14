import { Income } from "../../_types/income";

import { USER_DEFAULTS } from "@/app/dashboard/_constants/user-defaults";

export const INCOME_LIST_STORE_DEFAULTS: Income = {
  id: 0,
  type: "daily",
  unit_price: 0,
  quantity: 0,
  started_at: "",
  ended_at: "",
  status: "pending",
  description: null,
  approvals: [],
  receiver: USER_DEFAULTS,
  sender: USER_DEFAULTS,
};