import { PaymentFormType } from "../../_schemas/payment-form-schema";

export type AddPaymentBody = Omit<PaymentFormType, "reciever" | "total_price"> & {
  receiver_id: number;
  total_price: number;
};