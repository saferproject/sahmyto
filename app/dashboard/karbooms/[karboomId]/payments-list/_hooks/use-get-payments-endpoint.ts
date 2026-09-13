import useInfiniteListQuery from "@/app/_hooks/use-infinite-list-query";
import isValidQueryId from "@/app/_utilities/is-valid-query-id";
import type { QueryParams } from "@/app/_types/query-params";
import { paymentsListService } from "../_services/payments-list-service";

export default function useGetPaymentsEndpoint(
  karboomId: number | null | undefined,
  queryParams: QueryParams = {},
) {
  return useInfiniteListQuery({
    queryKey: ["payments", karboomId, queryParams],
    queryFn: (page, signal) =>
      paymentsListService.getPayments(
        karboomId as number,
        signal,
        page,
        queryParams,
      ),
    enabled: isValidQueryId(karboomId),
  });
}
