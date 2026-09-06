import useInvalidatingMutation from "@/app/_hooks/use-invalidating-mutation";
import { expensesListService } from "../_services/expenses-list-service";

export default function useSettleIncome() {
  return useInvalidatingMutation({
    mutationKey: ["settle-expense"],
    mutationFn: expensesListService.settleExpense,
    invalidateQueries: [["expenses"]],
  });
}