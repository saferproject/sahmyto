import { ExpenseFormType } from "../_schemas/expense-form-schema";
import { ExpenseCategoryTypes } from "./expense-category-types";

export type CreateExpenseBody = {
  karboom_id: number;
  category_id: number;
  receiver_id: number;
  date: string;
  type: ExpenseCategoryTypes;
} & Omit<ExpenseFormType, "receiver" | "image" | "date">;
