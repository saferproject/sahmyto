import { useMutation, useQueryClient } from "@tanstack/react-query";
import { karboomService } from "../_services/karboom-service";

export default function useCreateIncomeEndpoint() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-income"],
    mutationFn: karboomService.createIncome,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
    },
  });
}
