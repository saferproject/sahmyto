import useInvalidatingMutation from "@/app/_hooks/use-invalidating-mutation";

import { paymentsListService } from "../_services/payments-list-service";

export default function useRejectPaymentEndpoint() {
  return useInvalidatingMutation({
    mutationKey: ["reject-payment"],
    mutationFn: paymentsListService.rejectPayment,
    invalidateQueries: [["payments"]],
  });
}
