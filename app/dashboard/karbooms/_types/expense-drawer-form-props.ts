import { Ref } from "react";

import { ExpensesCategoryTypes } from "./expenses-category-types";

import { ExpenseFormType } from "../_schemas/expense-form-schema";

export type ExpenseDrawerFormProps = {
  isOpen: boolean;
  karboomId: number;
  expenseFormRef: Ref<HTMLFormElement>;
  categoryType: ExpensesCategoryTypes;
  onSubmit: (expenseData: ExpenseFormType) => void;
};
