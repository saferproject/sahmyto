import { useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentsListService } from "../_services/payments-list-service";

export default function useApprovePaymentEndpoint() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['approve-payment'],
    mutationFn: paymentsListService.approvePayment,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['payments']})
    }
  })
}