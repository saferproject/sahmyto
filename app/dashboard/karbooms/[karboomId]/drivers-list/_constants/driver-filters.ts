import type { ItemFilter } from "@/app/dashboard/_types/filter";
import type { Driver } from "../_types/driver";
import { DRIVER_PAYMENT_TYPES_FA } from "./payment-types-fa";

export const DRIVER_FILTERS = [
  {
    type: "text",
    name: "full_name",
    label: "نام راننده",
    queryKey: "full_name",
  },
  {
    type: "select",
    name: "payment_type",
    label: "نوع پرداخت",
    queryKey: "payment_type",
    options: Object.entries(DRIVER_PAYMENT_TYPES_FA).map(([value, label]) => ({
      value,
      label,
    })),
  },
  {
    type: "price",
    name: "fixed_amount",
    label: "مبلغ ثابت",
    queryKey: "fixed_amount",
  },
  {
    type: "price",
    name: "service_amount",
    label: "مبلغ سرویس",
    queryKey: "service_amount",
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
    name: "ended_at",
    label: "تاریخ پایان",
    queryKeys: {
      min: "min-ended_at",
      max: "max-ended_at",
    },
  },
] as const satisfies readonly ItemFilter<Driver>[];
