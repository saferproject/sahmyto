import useInfiniteListQuery from "@/app/_hooks/use-infinite-list-query";
import isValidQueryId from "@/app/_utilities/is-valid-query-id";

import { incomeListService } from "../_services/incomes-list-service";

export default function useGetIncomes(karboomId: number | null | undefined) {
  return useInfiniteListQuery({
    queryKey: ["incomes", karboomId],
    queryFn: (page, signal, queryKey) =>
      incomeListService.getIncomes(queryKey[1] as number, signal, page),
    enabled: isValidQueryId(karboomId),
  });
}
