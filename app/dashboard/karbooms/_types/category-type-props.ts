import { ExpenseCategoryTypes } from "./expense-category-types";

export type CategoryTypeProps = {
  category: ExpenseCategoryTypes;
  label: string;
  selectedCategoryType: ExpenseCategoryTypes;
  onSelectCategoryType: (categoryType: ExpenseCategoryTypes) => void;
};
