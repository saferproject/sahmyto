import dayjs from "dayjs";
import { Payment } from "../_types/payment";
import { USER_DEFAULTS } from "@/app/dashboard/_constants/user-defaults";

export const PAYMENT_LIST_STORE_DEFAULTS: Payment = {
  id: 0,
  total_price: 0,
  type: "account",
  date: dayjs(),
  description: "",
  status: "pending",
  payer: USER_DEFAULTS,
  receiver: USER_DEFAULTS,
  user: USER_DEFAULTS,
  approvals: [],
};
