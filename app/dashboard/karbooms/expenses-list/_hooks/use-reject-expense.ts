import useInvalidatingMutation from "@/app/_hooks/use-invalidating-mutation";

import { expensesListService } from "../_services/expenses-list-service";
import { RejectExpenseEndpointBody } from "../_types/reject-expense-endpoint-body";

export default function useRejectExpense() {
  return useInvalidatingMutation({
    mutationKey: ["reject-expense"],
    mutationFn: ({ expenseId, ...other }: RejectExpenseEndpointBody) =>
      expensesListService.rejectExpense(expenseId, other),
    invalidateQueries: [["expenses"]],
  });
}
