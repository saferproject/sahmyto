import { IncomeTypes } from "./income-categories";

export type IncomeTypeProps = {
  title: string;
  type: IncomeTypes;
  description: string;
  onSelect: (type: IncomeTypes) => void;
};