import useInfiniteListQuery from "@/app/_hooks/use-infinite-list-query";
import isValidQueryId from "@/app/_utilities/is-valid-query-id";

import { expensesListService } from "../_services/expenses-list-service";

export default function useGetExpenses(karboomId: number | null | undefined) {
  return useInfiniteListQuery({
    queryKey: ["expenses", karboomId],
    queryFn: (page, signal, queryKey) =>
      expensesListService.getExpenses(queryKey[1] as number, signal, page),
    enabled: isValidQueryId(karboomId),
  });
}
