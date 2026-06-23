import { ActivityStatus } from "../../_types/activity-status";

export const ACTIVITY_STATUS_TEXT_COLORS: Record<ActivityStatus, string> = {
  approved: "text-green-500",
  pending: "text-yellow-500",
  rejected: "text-red-500",
};

export const ACTIVITY_STATUS_BG_COLORS: Record<ActivityStatus, string> = {
  approved: "bg-green-500",
  pending: "bg-yellow-500",
  rejected: "bg-red-500",
};
