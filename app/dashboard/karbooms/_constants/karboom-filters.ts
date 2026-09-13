import type { ItemFilter } from "@/app/dashboard/_types/filter";
import type Karboom from "@/app/_interfaces/karboom";

export const KARBOOM_FILTERS = [
  {
    type: "text",
    name: "name",
    label: "نام کاربوم",
    queryKey: "name",
  },
  {
    type: "select",
    name: "type",
    label: "نوع کاربوم",
    queryKey: "type",
    options: [
      {
        value: "distance",
        label: "مسافتی",
      },
      {
        value: "time",
        label: "زمانی",
      },
    ],
  },
] as const satisfies readonly ItemFilter<Karboom>[];
