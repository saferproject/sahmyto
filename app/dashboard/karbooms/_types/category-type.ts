import { ExpenseCategoryTypes } from "./expense-category-types";

export type CategoryType = {
  id: number;
  category: ExpenseCategoryTypes;
  label: string;
};
