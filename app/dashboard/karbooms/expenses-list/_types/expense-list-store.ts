import { Expense } from "../../_types/expense";
import { ExpenseListStoreActions } from "./expense-list-store-actions";

export type ExpenseListStore = Expense & ExpenseListStoreActions;