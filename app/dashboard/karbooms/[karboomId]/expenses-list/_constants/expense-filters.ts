import type { ItemFilter } from "@/app/dashboard/_types/filter";
import type { Expense } from "../../../_types/expense";
import { EXPENSE_CATEGORY_TYPES } from "../../../_constants/expense-category-types";

export const EXPENSE_FILTERS = [
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
    type: "price",
    name: "wage_cost",
    label: "اجرت",
    queryKey: "wage_cost",
  },
  {
    type: "date",
    name: "date",
    label: "تاریخ هزینه",
    queryKeys: {
      min: "min-date",
      max: "max-date",
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
    label: "نوع هزینه",
    queryKey: "type",
    options: EXPENSE_CATEGORY_TYPES.map(({ category, label }) => ({
      value: category,
      label,
    })),
  },
  {
    type: "text",
    name: "category",
    label: "دسته‌بندی هزینه",
    queryKey: "category__name",
  },
] as const satisfies readonly ItemFilter<Expense>[];
