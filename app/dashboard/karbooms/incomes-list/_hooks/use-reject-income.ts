import { useMutation, useQueryClient } from "@tanstack/react-query";

import BaseResponse from "@/app/_interfaces/base-response";

import { RejectIncomeEndpointBody } from "../_types/reject-income-endpoint-body";

import { IncomeListService } from "../_services/incomes-list-service";

export default function useRejectIncome() {
  const queryClient = useQueryClient();

  return useMutation<
    BaseResponse<undefined>,
    BaseResponse<undefined>,
    RejectIncomeEndpointBody
  >({
    mutationKey: ["reject-income"],
    mutationFn: ({ incomeId, ...other }) =>
      IncomeListService.rejectIncome(incomeId, other),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
    },
  });
}
