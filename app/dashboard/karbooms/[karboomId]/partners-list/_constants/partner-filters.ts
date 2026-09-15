import type { ItemFilter } from "@/app/dashboard/_types/filter";
import type Partner from "../../../_types/partner";
import { ACTIVITY_STATUS_FA } from "../../../_constants/activity-status-fa";

export const PARTNER_FILTERS = [
  {
    type: "text",
    name: "full_name",
    label: "نام مالک",
    queryKey: "full_name",
  },
  {
    type: "number",
    name: "share",
    label: "سهم",
    queryKey: "share",
  },
  {
    type: "select",
    name: "status",
    label: "وضعیت",
    queryKey: "status",
    options: Object.entries(ACTIVITY_STATUS_FA).map(([value, label]) => ({
      value,
      label,
    })),
  },
] as const satisfies readonly ItemFilter<Partner>[];
