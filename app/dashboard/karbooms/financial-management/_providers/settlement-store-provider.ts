"use client";

import { createStoreContext } from "@/app/_utilities/create-store-context";
import { SettlementStore } from "../_types/settlement-store";
import { createSettlementStore } from "../_stores/settlement-store";

export const [SettlementStoreProvider, useSettlementStore] =
  createStoreContext<SettlementStore>(
    createSettlementStore,
    "useSettlementStore",
  );
