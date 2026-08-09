import { useMutation, useQueryClient } from "@tanstack/react-query";
import { financialManagmentService } from "../_services/financial-management-service";

export default function useCloseFinancialMonth() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["close-financial-month"],
    mutationFn: financialManagmentService.closeFinancialMonth,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["financial-month-data"] });
      queryClient.invalidateQueries({ queryKey: ["financial-months"] });
    },
  });
}
