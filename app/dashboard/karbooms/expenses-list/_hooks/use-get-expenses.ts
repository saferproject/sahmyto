import { useQuery } from "@tanstack/react-query";
import { ExpensesListService } from "../_services/expenses-list-service";
import isValidQueryId from "@/app/_utilities/is-valid-query-id";

export default function useGetExpenses(karboomId: number | null | undefined) {
  return useQuery({
    queryKey: ["expenses", karboomId],
    queryFn: ({ queryKey, signal }) =>
      ExpensesListService.getExpenses(queryKey[1] as number, signal),
    enabled: isValidQueryId(karboomId),
  });
}
