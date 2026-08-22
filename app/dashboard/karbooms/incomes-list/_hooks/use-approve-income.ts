import useInvalidatingMutation from "@/app/_hooks/use-invalidating-mutation";

import { incomeListService } from "../_services/incomes-list-service";

export default function useApproveIncome() {
  return useInvalidatingMutation({
    mutationKey: ["approve-income"],
    mutationFn: (incomeId: number) => incomeListService.approveIncome(incomeId),
    invalidateQueries: [["incomes"]],
  });
}
