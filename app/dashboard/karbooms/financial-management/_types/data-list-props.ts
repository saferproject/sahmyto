import { Income } from "../../_types/income";
import { Expense } from "../../_types/expense";

export type DataListProps = { indent: boolean; items: Income[] | Expense[] };
