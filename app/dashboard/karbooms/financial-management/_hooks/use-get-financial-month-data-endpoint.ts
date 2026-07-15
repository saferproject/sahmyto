import { useQuery } from "@tanstack/react-query";
import { financialManagmentService } from "../_services/financial-management-service";

export default function useGetFinancialMonthDataEndpoint(monthId: number, enabled: boolean) {
  return useQuery({
    queryKey: ["financial-month-data", monthId],
    queryFn: ({ queryKey }) =>
      financialManagmentService.getFinancialMonthData(queryKey[1] as number),
    enabled,
  });
}
