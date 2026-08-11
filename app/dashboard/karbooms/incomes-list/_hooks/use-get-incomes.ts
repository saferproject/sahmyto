import { useQuery } from "@tanstack/react-query";
import { IncomeListService } from "../_services/incomes-list-service";
import isValidQueryId from "@/app/_utilities/is-valid-query-id";

export default function useGetIncomes(karboomId: number | null | undefined) {
  return useQuery({
    queryKey: ["incomes", karboomId],
    queryFn: ({ queryKey, signal }) =>
      IncomeListService.getIncomes(queryKey[1] as number, signal),
    enabled: isValidQueryId(karboomId),
  });
}
