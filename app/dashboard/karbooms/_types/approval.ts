import User from "@/app/_types/user";
import { ActivityStatus } from "./activity-status";

export type Approval = {
  id: number;
  reject_reason: string | null;
  action_at: string | null;
  status: ActivityStatus;
  user: User;
};
