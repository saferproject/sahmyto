import useListQuery from "@/app/_hooks/use-list-query";

import { financialManagmentService } from "../_services/financial-management-service";

export default function useGetFinancialMonthsEndpoint(
  karboomId: number | null | undefined,
) {
  return useListQuery(
    ["financial-months", karboomId],
    financialManagmentService.getFinancialManagmentMonths,
    karboomId,
  );
}
