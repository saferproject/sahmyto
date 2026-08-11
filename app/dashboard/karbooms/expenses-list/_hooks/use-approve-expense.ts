import BaseResponse from "@/app/_interfaces/base-response";
import ApiError from "@/app/_errors/api-error";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ExpensesListService } from "../_services/expenses-list-service";

export default function useApproveExpense() {
  const queryClient = useQueryClient();

  return useMutation<BaseResponse<undefined>, ApiError, number>({
    mutationKey: ["approve-expense"],
    mutationFn: (expenseId) => ExpensesListService.approveExpense(expenseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
}
