import { useQuery } from "@tanstack/react-query";
import { IncomeListService } from "../_services/incomes-list-service";

export default function useGetIncomes(karboomId: number) {
  return useQuery({
    queryKey: ["incomes", karboomId],
    queryFn: ({ queryKey }) =>
      IncomeListService.getIncomes(queryKey[1] as number),
  });
}
