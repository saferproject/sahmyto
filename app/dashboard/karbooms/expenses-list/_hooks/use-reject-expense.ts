import BaseResponse from "@/app/_interfaces/base-response";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ExpensesListService } from "../_services/expenses-list-service";
import { RejectExpenseEndpointBody } from "../_types/reject-expense-endpoint-body";

export default function useRejectExpense() {
  const queryClient = useQueryClient();

  return useMutation<
    BaseResponse<undefined>,
    BaseResponse<undefined>,
    RejectExpenseEndpointBody
  >({
    mutationKey: ["reject-expense"],
    mutationFn: ({ expenseId, ...other }) =>
      ExpensesListService.rejectExpense(expenseId, other),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
}
