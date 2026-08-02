export type RejectPaymentBody = {
  paymentId: number
  reject_reason: string | null;
};