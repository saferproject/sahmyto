import type { ItemFilter } from "@/app/dashboard/_types/filter";
import type { Payment } from "../_types/payment";
import { PAYMENT_TYPES_FA } from "./payment-types-fa";

export const PAYMENT_FILTERS = [
  {
    type: "price",
    name: "total_price",
    label: "مبلغ کل",
    queryKey: "total_price",
  },
  {
    type: "date",
    name: "date",
    label: "تاریخ پرداخت",
    queryKeys: {
      min: "min-date",
      max: "max-date",
    },
  },
  {
    type: "select",
    name: "type",
    label: "نوع پرداخت",
    queryKey: "type",
    options: Object.entries(PAYMENT_TYPES_FA).map(([value, label]) => ({
      value,
      label,
    })),
  },
] as const satisfies readonly ItemFilter<Payment>[];
