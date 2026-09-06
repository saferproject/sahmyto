import useInvalidatingMutation from "@/app/_hooks/use-invalidating-mutation";
import { incomeListService } from "../_services/incomes-list-service";

export default function useSettleIncome() {
  return useInvalidatingMutation({
      mutationKey: ["settle-income"],
      mutationFn: incomeListService.settleIncome,
      invalidateQueries: [["incomes"]],
    });
}