import type { ItemFilter } from "@/app/dashboard/_types/filter";
import type { Income } from "../../../_types/income";
import { INCOME_TYPES_FA } from "../../../_constants/income-types-fa";

export const INCOME_FILTERS = [
  {
    type: "boolean",
    name: "is_settled",
    label: "تسویه شده",
    queryKey: "is_settled",
  },
  {
    type: "price",
    name: "unit_price",
    label: "مبلغ واحد",
    queryKey: "unit_price",
  },
  {
    type: "date",
    name: "started_at",
    label: "تاریخ شروع",
    queryKeys: {
      min: "min-started_at",
      max: "max-started_at",
    },
  },
  {
    type: "date",
    name: "endedAt",
    label: "تاریخ پایان",
    queryKeys: {
      min: "min-ended_at",
      max: "max-ended_at",
    },
  },
  {
    type: "date",
    name: "settlement_date",
    label: "تاریخ تسویه",
    queryKeys: {
      min: "min-settlement_date",
      max: "max-settlement_date",
    },
  },
  {
    type: "select",
    name: "type",
    label: "نوع درآمد",
    queryKey: "type",
    options: Object.entries(INCOME_TYPES_FA).map(([value, label]) => ({
      value,
      label,
    })),
  },
] as const satisfies readonly ItemFilter<Income>[];
