import useInvalidatingMutation from "@/app/_hooks/use-invalidating-mutation";

import { RejectIncomeEndpointBody } from "../_types/reject-income-endpoint-body";

import { incomeListService } from "../_services/incomes-list-service";

export default function useRejectIncome() {
  return useInvalidatingMutation({
    mutationKey: ["reject-income"],
    mutationFn: ({ incomeId, ...other }: RejectIncomeEndpointBody) =>
      incomeListService.rejectIncome(incomeId, other),
    invalidateQueries: [["incomes"]],
  });
}
