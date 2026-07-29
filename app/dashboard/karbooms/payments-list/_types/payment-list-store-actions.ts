import { Payment } from "./payment";

export type PaymentListStoreActions = {
  setActivePayment: (payment: Payment) => void;
  clearActivePayment: () => void;
};