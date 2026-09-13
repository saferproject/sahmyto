import useInfiniteListQuery from "@/app/_hooks/use-infinite-list-query";
import isValidQueryId from "@/app/_utilities/is-valid-query-id";
import type { QueryParams } from "@/app/_types/query-params";

import { incomeListService } from "../_services/incomes-list-service";

export default function useGetIncomes(
  karboomId: number | null | undefined,
  queryParams: QueryParams = {},
) {
  return useInfiniteListQuery({
    queryKey: ["incomes", karboomId, queryParams],
    queryFn: (page, signal) =>
      incomeListService.getIncomes(
        karboomId as number,
        signal,
        page,
        queryParams,
      ),
    enabled: isValidQueryId(karboomId),
  });
}
