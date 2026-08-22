import useInvalidatingMutation from "@/app/_hooks/use-invalidating-mutation";

import { ExpensesListService } from "../_services/expenses-list-service";

export default function useApproveExpense() {
  return useInvalidatingMutation({
    mutationKey: ["approve-expense"],
    mutationFn: (expenseId: number) =>
      ExpensesListService.approveExpense(expenseId),
    invalidateQueries: [["expenses"]],
  });
}
