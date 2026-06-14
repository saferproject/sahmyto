import { IncomeTypeProps } from "../_types/income-type-props";

export const INCOME_TYPES: Array<Omit<IncomeTypeProps, "onSelect">> = [
  {
    type: "monthly",
    title: "ماهانه",
    description: "ثبت درآمد کارکرد",
  },
  {
    type: "services",
    title: "سرویس",
    description: "ثبت درآمد هر",
  },
  {
    type: "daily",
    title: "روزانه",
    description: "ثبت درآمد کارکرد",
  },
  {
    type: "hourly",
    title: "ساعتی",
    description: "ثبت درآمد کارکرد",
  },
];
