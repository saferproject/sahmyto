import useListQuery from "@/app/_hooks/use-list-query";

import { financialManagmentService } from "../_services/financial-management-service";
import normalizeSettlementData from "../_utilities/normalize-settlement-data";

export default function useGetSettlementData(
  monthId: number | null | undefined,
  enabled: boolean,
) {
  return useListQuery(
    ["settlement-data", monthId],
    async (id, signal) => {
      const response = await financialManagmentService.getSettlementData(
        id,
        signal,
      );

      return {
        ...response,
        data: normalizeSettlementData(response.data),
      };
    },
    monthId,
    enabled,
  );
}
