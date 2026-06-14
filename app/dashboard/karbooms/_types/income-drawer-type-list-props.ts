import { IncomeTypes } from "./income-categories";

export type IncomeDrawerTypeListProps = {
  onTypeSelect: (type: IncomeTypes) => void;
};