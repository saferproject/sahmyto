import User from "@/app/_interfaces/user";
import { PaymentTypes } from "./payment-types";
import { Dayjs } from "dayjs";
import { ActivityStatus } from "../../_types/activity-status";
import { Approval } from "../../_types/approval";

export type Payment = {
  id: number;
  receiver: User;
  payer: User;
  sender: User;
  approvals: Approval[];
  total_price: number;
  type: PaymentTypes;
  date: Dayjs;
  description: null | string;
  status: ActivityStatus;
};