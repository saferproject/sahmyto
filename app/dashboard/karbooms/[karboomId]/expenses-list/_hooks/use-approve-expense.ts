import useInvalidatingMutation from "@/app/_hooks/use-invalidating-mutation";

import { expensesListService } from "../_services/expenses-list-service";

export default function useApproveExpense() {
  return useInvalidatingMutation({
    mutationKey: ["approve-expense"],
    mutationFn: (expenseId: number) =>
      expensesListService.approveExpense(expenseId),
    invalidateQueries: [["expenses"]],
  });
}
