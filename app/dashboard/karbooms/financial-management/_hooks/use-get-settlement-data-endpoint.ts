import { useQuery } from "@tanstack/react-query";
import { financialManagmentService } from "../_services/financial-management-service";

export default function useGetSettlementData(
  monthId: number,
  enabled: boolean,
) {
  return useQuery({
    queryKey: ["settlement-data", monthId],
    queryFn: ({ queryKey, signal }) =>
      financialManagmentService.getSettlementData(
        queryKey[1] as number,
        signal,
      ),
    enabled,
  });
}
