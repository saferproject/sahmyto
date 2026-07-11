import { useQuery } from "@tanstack/react-query";
import { financialManagmentService } from "../_services/financial-management-service";

export default function useGetFinancialMonthsEndpoint(karboomId: number) {
  return useQuery({
    queryKey: ["financial-months", karboomId],
    queryFn: ({ queryKey }) =>
      financialManagmentService.getFinancialManagmentMonths(
        queryKey[1] as number,
      ),
  });
}
