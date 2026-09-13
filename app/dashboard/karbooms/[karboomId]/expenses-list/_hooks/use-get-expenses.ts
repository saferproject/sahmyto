import useInfiniteListQuery from "@/app/_hooks/use-infinite-list-query";
import isValidQueryId from "@/app/_utilities/is-valid-query-id";
import type { QueryParams } from "@/app/_types/query-params";
import { expensesListService } from "../_services/expenses-list-service";

export default function useGetExpenses(
  karboomId: number | null | undefined,
  queryParams: QueryParams = {},
) {
  return useInfiniteListQuery({
    queryKey: ["expenses", karboomId, queryParams],
    queryFn: (page, signal) =>
      expensesListService.getExpenses(
        karboomId as number,
        signal,
        page,
        queryParams,
      ),
    enabled: isValidQueryId(karboomId),
  });
}
