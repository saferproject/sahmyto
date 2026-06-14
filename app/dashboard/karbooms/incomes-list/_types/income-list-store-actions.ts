import { Income } from "../../_types/income";

export type IncomeListStoreActions = {
  setActiveIncome: (income: Income) => void;
  clearActiveIncome: () => void;
};
