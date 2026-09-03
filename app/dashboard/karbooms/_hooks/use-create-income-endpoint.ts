import useInvalidatingMutation from "@/app/_hooks/use-invalidating-mutation";

import { karboomService } from "../_services/karboom-service";

export default function useCreateIncomeEndpoint() {
  return useInvalidatingMutation({
    mutationKey: ["create-income"],
    mutationFn: karboomService.createIncome,
    invalidateQueries: [["incomes"], ["financial-month-data"]],
  });
}
