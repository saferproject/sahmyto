import useListQuery from "@/app/_hooks/use-list-query";

import { incomeListService } from "../_services/incomes-list-service";

export default function useGetIncomes(karboomId: number | null | undefined) {
  return useListQuery(
    ["incomes", karboomId],
    incomeListService.getIncomes,
    karboomId,
  );
}
