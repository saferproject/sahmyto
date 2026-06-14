import { Status } from "../../_types/status";
import { ExpenseCategoryTypes } from "./expense-category-types";

export type ExpenseCategory = {
  id: number;
  name: string;
  type: ExpenseCategoryTypes;
  status: Status
}