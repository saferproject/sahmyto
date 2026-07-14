"use client";

import { createStoreContext } from "@/app/_utilities/create-store-context";
import { createFinancialMonthStore } from "../_stores/financial-management-store";
import { FinancialMonthStore } from "../_types/financial-month-store-type";

export const [FinancialMonthStoreProvider, useFinancialMonthStore] =
  createStoreContext<FinancialMonthStore>(createFinancialMonthStore, "useFinancialMonthStore");
