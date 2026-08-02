import { PaymentFormType } from "../../_schemas/payment-form-schema";

export type AddPaymentBody = Omit<
  PaymentFormType,
  "reciever" | "payer" | "total_price" | "date"
> & {
  karboomId: number;
  receiver_id: number;
  payer_id: number;
  total_price: number;
  date: string;
};
