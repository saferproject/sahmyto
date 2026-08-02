import { useMutation, useQueryClient } from "@tanstack/react-query";

import { paymentsListService } from "../_services/payments-list-service";

export default function useRejectPaymentEndpoint() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["reject-payment"],
    mutationFn: paymentsListService.rejectPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
  });
}
