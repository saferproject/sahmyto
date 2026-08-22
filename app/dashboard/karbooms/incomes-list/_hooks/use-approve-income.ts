import useInvalidatingMutation from "@/app/_hooks/use-invalidating-mutation";

import { IncomeListService } from "../_services/incomes-list-service";

export default function useApproveIncome() {
  return useInvalidatingMutation({
    mutationKey: ["approve-income"],
    mutationFn: (incomeId: number) => IncomeListService.approveIncome(incomeId),
    invalidateQueries: [["incomes"]],
  });
}
