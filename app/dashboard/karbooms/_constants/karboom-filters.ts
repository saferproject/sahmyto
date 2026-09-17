import type { ItemFilter } from "@/app/dashboard/_types/filter";
import type Karboom from "@/app/_types/karboom";

export const KARBOOM_FILTERS = [
  {
    type: "text",
    name: "name",
    label: "نام کاربوم",
    queryKey: "name",
  },
] as const satisfies readonly ItemFilter<Karboom>[];
