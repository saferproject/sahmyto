import useInvalidatingMutation from "@/app/_hooks/use-invalidating-mutation";

import { paymentsListService } from "../_services/payments-list-service";

export default function useApprovePaymentEndpoint() {
  return useInvalidatingMutation({
    mutationKey: ["approve-payment"],
    mutationFn: paymentsListService.approvePayment,
    invalidateQueries: [["payments"]],
  });
}
