import User from "@/app/_interfaces/user";
import { ActivityStatus } from "./activity-status";
import { IncomeTypes } from "./income-categories";
import { Dayjs } from "dayjs";

export type Income = {
  id: number;
  is_settled: boolean;
  quantity: number;
  unit_price: number;
  settlement_date: string; // Format: "YYYY-MM-DD hh:mm:ss"
  started_at: string; // Format: "YYYY-MM-DD hh:mm:ss"
  ended_at: string; // Format: "YYYY-MM-DD hh:mm:ss"
  description: string | null;
  type: IncomeTypes;
  status: ActivityStatus;
  receiver: User | null;
  sender: User;
  reject_reason: null | string;
  rejected_at: null | Dayjs;
};
