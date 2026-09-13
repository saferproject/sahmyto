import type { ItemFilter } from "@/app/dashboard/_types/filter";
import type { ThirdPartyInsurance } from "../_types/third-party-insurance";

export const THIRD_PARTY_INSURANCE_FILTERS = [
  {
    type: "date",
    name: "started_at",
    label: "تاریخ شروع بیمه",
    queryKeys: {
      min: "min-started_at",
      max: "max-started_at",
    },
  },
  {
    type: "date",
    name: "ended_at",
    label: "تاریخ پایان بیمه",
    queryKeys: {
      min: "min-ended_at",
      max: "max-ended_at",
    },
  },
  {
    type: "select",
    name: "status",
    label: "وضعیت بیمه",
    queryKey: "status",
    options: [
      {
        value: "active",
        label: "فعال",
      },
      {
        value: "expired",
        label: "منقضی شده",
      },
    ],
  },
] as const satisfies readonly ItemFilter<ThirdPartyInsurance>[];
