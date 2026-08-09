import { useMutation, useQueryClient } from "@tanstack/react-query";
import { financialManagmentService } from "../_services/financial-management-service";

export default function useStartProcessingFinancialMonthEndpoint() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["start-processing-financial-month"],
    mutationFn: financialManagmentService.startProcessingFinancialMonth,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["financial-months"] });
    },
  });
}
