import { ExpenseCategoryTypes } from "./expense-category-types";

export type ExpenseDrawerCategoryListProps = {
  categoryType: ExpenseCategoryTypes;
  selectedCategory: number | null;
  onSelectCategoryType: (categoryType: ExpenseCategoryTypes) => void;
  onSelectCategory: (id: number) => void;
};
