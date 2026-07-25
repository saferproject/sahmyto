import { ActivityStatus } from "../_types/activity-status";

export const ACTIVITY_STATUS_COLORS: Record<ActivityStatus, string> = {
  pending: "bg-gray-200 text-body",
  approved: "bg-green-500 text-white",
  rejected: "bg-red-500 text-white",
};
