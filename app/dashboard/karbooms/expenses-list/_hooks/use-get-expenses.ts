import useListQuery from "@/app/_hooks/use-list-query";

import { ExpensesListService } from "../_services/expenses-list-service";

export default function useGetExpenses(karboomId: number | null | undefined) {
  return useListQuery(
    ["expenses", karboomId],
    ExpensesListService.getExpenses,
    karboomId,
  );
}
