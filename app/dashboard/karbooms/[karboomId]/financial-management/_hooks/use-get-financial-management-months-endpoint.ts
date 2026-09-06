import useInfiniteListQuery from "@/app/_hooks/use-infinite-list-query";
import isValidQueryId from "@/app/_utilities/is-valid-query-id";

import { financialManagementService } from "../_services/financial-management-service";

export default function useGetFinancialMonthsEndpoint(
  karboomId: number | null | undefined,
) {
  return useInfiniteListQuery({
    queryKey: ["financial-months", karboomId],
    queryFn: (page, signal, queryKey) =>
      financialManagementService.getFinancialManagmentMonths(
        queryKey[1] as number,
        signal,
        page,
      ),
    enabled: isValidQueryId(karboomId),
  });
}
