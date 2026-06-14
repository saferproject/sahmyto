import User from "@/app/_interfaces/user";
import { ActivityStatus } from "./activity-status";

export type Approval = {
  id: number;
  reject_reason: string | null;
  action_at: string | null;
  status: ActivityStatus;
  user: User;
};
