import { http } from "@/app/_services/http";
import { RejectExpenseBody } from "../_types/reject-expense-body";
import { Expense } from "../../_types/expense";

export const expensesListService = {
  getExpenses: (karboomId: number, signal?: AbortSignal) =>
    http.get<Expense[]>(`karboom/expense/karboom/${karboomId}`, { signal }),
  approveExpense: (expenseId: number) =>
    http.post<undefined>(`karboom/expense/accept/${expenseId}`),
  rejectExpense: (expenseId: number, body: RejectExpenseBody) =>
    http.post<undefined>(`karboom/expense/reject/${expenseId}`, { body }),
};
