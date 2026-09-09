import useListQuery from "@/app/_hooks/use-list-query";

import { financialManagementService } from "../_services/financial-management-service";

export default function useGetFinancialMonthDataEndpoint(
  monthId: number | null | undefined,
  enabled: boolean,
) {
  return useListQuery(
    ["financial-month-data", monthId],
    financialManagementService.getFinancialMonthData,
    monthId,
    enabled,
  );
}
