import { useQuery } from "@tanstack/react-query";
import { financialManagmentService } from "../_services/financial-management-service";
import isValidQueryId from "@/app/_utilities/is-valid-query-id";

export default function useGetFinancialMonthsEndpoint(
  karboomId: number | null | undefined,
) {
  return useQuery({
    queryKey: ["financial-months", karboomId],
    queryFn: ({ queryKey, signal }) =>
      financialManagmentService.getFinancialManagmentMonths(
        queryKey[1] as number,
        signal,
      ),
    enabled: isValidQueryId(karboomId),
  });
}
