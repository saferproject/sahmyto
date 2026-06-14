import { ActivityStatus } from "../../_types/activity-status";

export const ACTIVITY_STATUS_COLORS: Record<ActivityStatus, string> = {
  approved: "green-500",
  pending: "yellow-500",
  rejected: "red-500",
};
