import User from "@/app/_interfaces/user";
import { ActivityStatus } from "./activity-status";
import { IncomeTypes } from "./income-categories";
import { Approval } from "./approval";

export type Income = {
  id: number;
  quantity: number;
  unit_price: number;
  started_at: string; // Format: "YYYY-MM-DD hh:mm:ss"
  ended_at: string; // Format: "YYYY-MM-DD hh:mm:ss"
  description: string | null;
  type: IncomeTypes;
  status: ActivityStatus;
  receiver: User;
  sender: User;
  approvals: Approval[];
};
