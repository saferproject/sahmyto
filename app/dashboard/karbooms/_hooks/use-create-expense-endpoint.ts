import useInvalidatingMutation from "@/app/_hooks/use-invalidating-mutation";

import { karboomService } from "../_services/karboom-service";

export default function useCreateExpenseEndpoint() {
  return useInvalidatingMutation({
    mutationKey: ["create-expense"],
    mutationFn: karboomService.createExpense,
    invalidateQueries: [["expenses"], ["financial-month-data"]],
  });
}
