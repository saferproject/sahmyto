"use client";

import { createStoreContext } from "@/app/_utilities/create-store-context";
import { createExpenseListStore } from "../_stores/expense-list-store";
import { ExpenseListStore } from "../_types/expense-list-store";

export const [ExpenseListStoreProvider, useExpenseListStore] =
  createStoreContext<ExpenseListStore>(
    createExpenseListStore,
    "useExpenseListStore",
  );
