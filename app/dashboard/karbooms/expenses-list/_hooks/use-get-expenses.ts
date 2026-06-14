import { useQuery } from "@tanstack/react-query";
import { ExpensesListService } from "../_services/expenses-list-service";

export default function useGetExpenses(karboomId: number) {
  return useQuery({
    queryKey: ["expenses", karboomId],
    queryFn: ({ queryKey }) =>
      ExpensesListService.getExpenses(queryKey[1] as number),
  });
}
