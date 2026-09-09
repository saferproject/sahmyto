"use client";

import { createStoreContext } from "@/app/_utilities/create-store-context";
import { createIncomeListStore } from "../_stores/income-list-store";
import { IncomeListStore } from "../_types/income-list-store";

export const [IncomeListStoreProvider, useIncomeListStore] =
  createStoreContext<IncomeListStore>(
    createIncomeListStore,
    "useIncomeListStore",
  );
