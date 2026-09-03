import Karboom from "@/app/_interfaces/karboom";
import { http } from "@/app/_services/http";

import { KarboomFormType } from "../_schemas/karboom-form-schema";

import { ExpenseCategory } from "../_types/expense-category";
import { ExpenseCategoryTypes } from "../_types/expense-category-types";
import { CreateExpenseBody } from "../_types/create-expense-body";
import { CreateIncomeBody } from "../_types/create-income-body";
import { Member } from "../_types/member";
import addPaginationQuery from "@/app/_utilities/add-pagination-query";

export const karboomService = {
  getKarbooms: (signal?: AbortSignal, page: number = 1) =>
    http.get<Karboom[]>(addPaginationQuery("karboom", page), { signal }),
  createKarboom: (body: KarboomFormType) =>
    http.post<Karboom>("karboom/store", { body }),
  getExpensesCategories: (
    categoryType: ExpenseCategoryTypes,
    signal?: AbortSignal,
    page: number = 1,
  ) =>
    http.get<ExpenseCategory[]>(
      addPaginationQuery(
        `karboom/expense/categories?type=${categoryType}`,
        page,
      ),
      {
        signal,
      },
    ),
  createExpense: ({ karboom_id, ...other }: CreateExpenseBody) =>
    http.post<undefined>(`karboom/expense/store/${karboom_id}`, {
      body: other,
    }),
  createIncome: ({ karboom_id, ...other }: CreateIncomeBody) =>
    http.post<undefined>(`karboom/income/store/${karboom_id}`, { body: other }),
  getMembers: (karboom_id: number, signal?: AbortSignal) =>
    http.get<Member[]>(`karboom/members/${karboom_id}`, { signal }),
};
