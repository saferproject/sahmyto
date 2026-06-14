import { ExpenseCategory } from "./expense-category";

export type KarboomExpenseDrawerListItemProps = {
  selectedCategory: number | null;
  onSelectCategory: (id: number) => void;
} & ExpenseCategory;
