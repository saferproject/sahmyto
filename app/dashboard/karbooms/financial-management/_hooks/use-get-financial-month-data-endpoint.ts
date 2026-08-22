import useListQuery from "@/app/_hooks/use-list-query";

import { financialManagmentService } from "../_services/financial-management-service";

export default function useGetFinancialMonthDataEndpoint(
  monthId: number | null | undefined,
  enabled: boolean,
) {
  return useListQuery(
    ["financial-month-data", monthId],
    financialManagmentService.getFinancialMonthData,
    monthId,
    enabled,
  );
}
