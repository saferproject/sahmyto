import useListQuery from "@/app/_hooks/use-list-query";

import { IncomeListService } from "../_services/incomes-list-service";

export default function useGetIncomes(karboomId: number | null | undefined) {
  return useListQuery(
    ["incomes", karboomId],
    IncomeListService.getIncomes,
    karboomId,
  );
}
