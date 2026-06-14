import { fetchWithAuth } from "@/app/proxy";
import { RejectExpenseBody } from "../_types/reject-expense-body";
import { Expense } from "../../_types/expense";

export const ExpensesListService = {
  getExpenses: (karboomId: number) =>
    fetchWithAuth<Expense[]>(`karboom/expense/karboom/${karboomId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }),
  approveExpense: (expenseId: number) =>
    fetchWithAuth<undefined>(`karboom/expense/accept/${expenseId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }),
  rejectExpense: (expenseId: number, body: RejectExpenseBody) =>
    fetchWithAuth<undefined>(`karboom/expense/reject/${expenseId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
};
