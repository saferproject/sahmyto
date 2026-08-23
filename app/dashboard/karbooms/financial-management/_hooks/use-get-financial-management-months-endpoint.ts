import useListQuery from "@/app/_hooks/use-list-query";

import { financialManagementService } from "../_services/financial-management-service";

export default function useGetFinancialMonthsEndpoint(
  karboomId: number | null | undefined,
) {
  return useListQuery(
    ["financial-months", karboomId],
    financialManagementService.getFinancialManagmentMonths,
    karboomId,
  );
}
