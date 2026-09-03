import { ACTIVITY_STATUS_FA } from "../_constants/activity-status-fa";
import { ACTIVITY_STATUS_TEXT_COLORS } from "../_constants/activity-status-colors";
import type { ActivityStatus } from "../_types/activity-status";

interface StatusChipComponentProps {
  status: ActivityStatus;
  className?: string;
}

export default function StatusChipComponent({
  status,
  className = "text-sm font-semibold",
}: StatusChipComponentProps) {
  return (
    <p className={`${className} ${ACTIVITY_STATUS_TEXT_COLORS[status]}`}>
      {ACTIVITY_STATUS_FA[status]}
    </p>
  );
}
