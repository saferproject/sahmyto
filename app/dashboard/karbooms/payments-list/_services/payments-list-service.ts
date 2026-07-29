import Karboom from "@/app/_interfaces/karboom";
import { fetchWithAuth } from "@/app/proxy";
import { AddPaymentBody } from "../_types/add-payment-body";

export const paymentsListService = {
  getPayments: (karboomId: number) =>
    fetchWithAuth<Karboom[]>(`karboom/payment/${karboomId}`),
  addPayment: (body: AddPaymentBody) =>
    fetchWithAuth<Karboom>("karboom/store", {
      body: JSON.stringify(body),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }),
};