import { Ref } from "react";

import { ExpensesCategoryTypes } from "./expenses-category-types";

export type ExpenseDrawerFormProps = {
  isOpen: boolean;
  karboomId: number;
  expenseFormRef: Ref<HTMLFormElement>;
  categoryType: ExpensesCategoryTypes;
  selectedCategory: number | null;
  onSuccess: () => void;
};
