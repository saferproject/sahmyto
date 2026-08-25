import { http } from "@/app/_services/http";
import { RejectExpenseBody } from "../_types/reject-expense-body";
import { Expense } from "../../_types/expense";
import { SettleExpenseBody } from "../_types/settle-expense-body";

export const expensesListService = {
  getExpenses: (karboomId: number, signal?: AbortSignal) =>
    http.get<Expense[]>(`karboom/expense/karboom/${karboomId}`, { signal }),
  settleExpense: ({ expenseId, ...body }: SettleExpenseBody) =>
    http.post<undefined>(`karboom/expense/settle/${expenseId}`, { body }),
  approveExpense: (expenseId: number) =>
    http.post<undefined>(`karboom/expense/accept/${expenseId}`),
  rejectExpense: (expenseId: number, body: RejectExpenseBody) =>
    http.post<undefined>(`karboom/expense/reject/${expenseId}`, { body }),
};
