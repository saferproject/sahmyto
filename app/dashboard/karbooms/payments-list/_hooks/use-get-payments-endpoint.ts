import { useQuery } from "@tanstack/react-query";
import { paymentsListService } from "../_services/payments-list-service";

export default function useGetPaymentsEndpoint(karboomId: number) {
  return useQuery({
    queryKey: ["payments", karboomId],
    queryFn: ({ queryKey, signal }) =>
      paymentsListService.getPayments(queryKey[1] as number, signal),
  });
}
