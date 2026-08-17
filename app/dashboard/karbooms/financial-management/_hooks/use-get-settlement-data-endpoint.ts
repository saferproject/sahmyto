import { useQuery } from "@tanstack/react-query";
import { financialManagmentService } from "../_services/financial-management-service";
import isValidQueryId from "@/app/_utilities/is-valid-query-id";
import normalizeSettlementData from "../_utilities/normalize-settlement-data";

export default function useGetSettlementData(
  monthId: number | null | undefined,
  enabled: boolean,
) {
  return useQuery({
    queryKey: ["settlement-data", monthId],
    queryFn: async ({ queryKey, signal }) => {
      const response = await financialManagmentService.getSettlementData(
        queryKey[1] as number,
        signal,
      );

      return {
        ...response,
        data: normalizeSettlementData(response.data),
      };
    },
    enabled: enabled && isValidQueryId(monthId),
  });
}
