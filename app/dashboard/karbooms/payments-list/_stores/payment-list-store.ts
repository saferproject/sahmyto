import { createStore } from "zustand/vanilla";
import { Payment } from "../_types/payment";
import { PAYMENT_LIST_STORE_DEFAULTS } from "../_constants/payment-list-store-defaults";
import { PaymentListStore } from "../_types/payment-list-store";

export const createPaymentListStore = (
  initState: Payment = PAYMENT_LIST_STORE_DEFAULTS,
) => {
  return createStore<PaymentListStore>()((set) => ({
    ...initState,
    setActivePayment: (payment) => set(() => payment),
    clearActivePayment: () => set(() => PAYMENT_LIST_STORE_DEFAULTS),
  }));
};
