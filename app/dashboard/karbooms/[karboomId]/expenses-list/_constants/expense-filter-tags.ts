import { FilterTag } from "../_types/filter-tag";

export const EXPENSE_FILTER_TAGS: FilterTag[] = [
  {
    id: 1,
    label: "همه",
    searchParam: "",
  },
  {
    id: 2,
    label: "روزانه",
    searchParam: "daily",
  },
  {
    id: 3,
    label: "تعمیرات",
    searchParam: "repair",
  },
];
