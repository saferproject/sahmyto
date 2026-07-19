import { useMutation, useQueryClient } from "@tanstack/react-query";

import { karboomService } from "../_services/karboom-service";

export default function useCreateExpenseEndpoint() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-expense"],
    mutationFn: karboomService.createExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expenses", "financial-month-data"],
      });
    },
  });
}
