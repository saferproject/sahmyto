import useInfiniteListQuery from "@/app/_hooks/use-infinite-list-query";
import isValidQueryId from "@/app/_utilities/is-valid-query-id";

import { paymentsListService } from "../_services/payments-list-service";

export default function useGetPaymentsEndpoint(
  karboomId: number | null | undefined,
) {
  return useInfiniteListQuery({
    queryKey: ["payments", karboomId],
    queryFn: (page, signal, queryKey) =>
      paymentsListService.getPayments(queryKey[1] as number, signal, page),
    enabled: isValidQueryId(karboomId),
  });
}
