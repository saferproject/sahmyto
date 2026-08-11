import { useQuery } from "@tanstack/react-query";
import { paymentsListService } from "../_services/payments-list-service";
import isValidQueryId from "@/app/_utilities/is-valid-query-id";

export default function useGetPaymentsEndpoint(
  karboomId: number | null | undefined,
) {
  return useQuery({
    queryKey: ["payments", karboomId],
    queryFn: ({ queryKey, signal }) =>
      paymentsListService.getPayments(queryKey[1] as number, signal),
    enabled: isValidQueryId(karboomId),
  });
}
