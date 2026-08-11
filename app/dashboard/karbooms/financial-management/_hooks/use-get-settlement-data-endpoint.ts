import { useQuery } from "@tanstack/react-query";
import { financialManagmentService } from "../_services/financial-management-service";
import isValidQueryId from "@/app/_utilities/is-valid-query-id";

export default function useGetSettlementData(
  monthId: number | null | undefined,
  enabled: boolean,
) {
  return useQuery({
    queryKey: ["settlement-data", monthId],
    queryFn: ({ queryKey, signal }) =>
      financialManagmentService.getSettlementData(
        queryKey[1] as number,
        signal,
      ),
    enabled: enabled && isValidQueryId(monthId),
  });
}
