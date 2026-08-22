import { http } from "@/app/_services/http";
import { AddPaymentBody } from "../_types/add-payment-body";
import { Payment } from "../_types/payment";
import { RejectPaymentBody } from "../_types/reject-payment-body";

export const paymentsListService = {
  getPayments: async (karboomId: number, signal?: AbortSignal) => {
    const response = await http.get<Payment[]>(`karboom/payment/${karboomId}`, {
      signal,
    });

    return {
      ...response,
      data: response.data.map((payment) => ({
        ...payment,
        approvals: Array.isArray(payment.approvals) ? payment.approvals : [],
      })),
    };
  },
  addPayment: ({ karboomId, ...body }: AddPaymentBody) =>
    http.post<Payment>(`karboom/payment/store/${karboomId}`, { body }),
  approvePayment: (paymentId: number) =>
    http.post<undefined>(`karboom/payment/accept/${paymentId}`),
  rejectPayment: ({ paymentId, ...body }: RejectPaymentBody) =>
    http.post<undefined>(`karboom/payment/reject/${paymentId}`, { body }),
};
