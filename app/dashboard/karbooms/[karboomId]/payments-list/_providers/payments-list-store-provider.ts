"use client";

import { createStoreContext } from "@/app/_utilities/create-store-context";
import { PaymentListStore } from "../_types/payment-list-store";
import { createPaymentListStore } from "../_stores/payment-list-store";

export const [PaymentListStoreProvider, usePaymentListStore] =
  createStoreContext<PaymentListStore>(
    createPaymentListStore,
    "usePaymentListStore",
  );
