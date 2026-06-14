import { ActivityStatus } from "../../_types/activity-status";

export default function getActivityStatusColor(status: ActivityStatus) {
  switch (status) {
    case "pending":
      return "bg-gray-200";

    case "approved":
      return "bg-green-500 text-white";

    case "rejected":
      return "bg-red-500 text-white";
  }
}
