import { useMutation, useQueryClient } from "@tanstack/react-query";

import { IncomeListService } from "../_services/incomes-list-service";

import BaseResponse from "@/app/_interfaces/base-response";
import ApiError from "@/app/_errors/api-error";

export default function useApproveIncome() {
  const queryClient = useQueryClient();

  return useMutation<BaseResponse<undefined>, ApiError, number>({
    mutationKey: ["approve-income"],
    mutationFn: (incomeId) => IncomeListService.approveIncome(incomeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
    },
  });
}
