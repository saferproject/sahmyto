import BaseResponse from "@/app/_interfaces/base-response";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ExpensesListService } from "../_services/expenses-list-service";

export default function useApproveExpense() {
  const queryClient = useQueryClient();

  return useMutation<BaseResponse<undefined>, BaseResponse<undefined>, number>({
    mutationKey: ["approve-expense"],
    mutationFn: (expenseId) => ExpensesListService.approveExpense(expenseId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
}
