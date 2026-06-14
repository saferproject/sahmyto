import Karboom from "@/app/_interfaces/karboom";
import { fetchWithAuth } from "@/app/proxy";

import { KarboomFormType } from "../_schemas/karboom-form-schema";

import { ExpenseCategory } from "../_types/expense-category";
import { ExpenseCategoryTypes } from "../_types/expense-category-types";
import { CreateExpenseBody } from "../_types/create-expense-body";
import { CreateIncomeBody } from "../_types/create-income-body";

export const karboomService = {
  getKarbooms: () => fetchWithAuth<Karboom[]>("karboom"),
  createKarboom: (body: KarboomFormType) =>
    fetchWithAuth<Karboom>("karboom/store", {
      body: JSON.stringify(body),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }),
  getExpensesCategories: (categoryType: ExpenseCategoryTypes) =>
    fetchWithAuth<ExpenseCategory[]>(
      `karboom/expense/categories?type=${categoryType}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      },
    ),
  createExpense: ({ karboom_id, ...other }: CreateExpenseBody) =>
    fetchWithAuth<undefined>(`karboom/expense/store/${karboom_id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(other),
    }),
  createIncome: ({ karboom_id, ...other }: CreateIncomeBody) =>
    fetchWithAuth<undefined>(`karboom/income/store/${karboom_id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(other),
    }),
  getMembers: (karboom_id: number) =>
    fetchWithAuth<undefined>(`karboom/members/${karboom_id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }),
};
