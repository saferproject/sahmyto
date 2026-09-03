import useInvalidatingMutation from "@/app/_hooks/use-invalidating-mutation";

import { paymentsListService } from "../payments-list/_services/payments-list-service";

export default function useAddPayment() {
  return useInvalidatingMutation({
    mutationKey: ["add-payment"],
    mutationFn: paymentsListService.addPayment,
    invalidateQueries: [["payments"]],
  });
}
