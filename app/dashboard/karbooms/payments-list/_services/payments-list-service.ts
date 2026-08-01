import { fetchWithAuth } from "@/app/proxy";
import { AddPaymentBody } from "../_types/add-payment-body";
import { Payment } from "../_types/payment";

export const paymentsListService = {
  getPayments: (karboomId: number) =>
    fetchWithAuth<Payment[]>(`karboom/payment/${karboomId}`),
  addPayment: ({ karboomId, ...body }: AddPaymentBody) =>
    fetchWithAuth<Payment>(`karboom/payment/store/${karboomId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
};
