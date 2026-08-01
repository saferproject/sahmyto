import { useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentsListService } from "../payments-list/_services/payments-list-service";

export default function useAddPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["app-payment"],
    mutationFn: paymentsListService.addPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
  });
}
