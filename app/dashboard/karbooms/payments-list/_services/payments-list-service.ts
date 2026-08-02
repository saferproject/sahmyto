import { fetchWithAuth } from "@/app/proxy";
import { AddPaymentBody } from "../_types/add-payment-body";
import { Payment } from "../_types/payment";
import { RejectPaymentBody } from "../_types/rehect-payment-body";

export const paymentsListService = {
  getPayments: (karboomId: number) =>
    fetchWithAuth<Payment[]>(`karboom/payment/${karboomId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }),
  addPayment: ({ karboomId, ...body }: AddPaymentBody) =>
    fetchWithAuth<Payment>(`karboom/payment/store/${karboomId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
  approvePayment: (paymentId: number) =>
    fetchWithAuth<undefined>(`karboom/payment/accept/${paymentId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }),
  rejectPayment: ({ paymentId, ...body }: RejectPaymentBody) =>
    fetchWithAuth<undefined>(`karboom/payment/reject/${paymentId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
};
