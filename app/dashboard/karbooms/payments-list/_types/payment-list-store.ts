import { Payment } from "./payment";
import { PaymentListStoreActions } from "./payment-list-store-actions";

export type PaymentListStore = Payment & PaymentListStoreActions;