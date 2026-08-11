import { useMutation, useQueryClient } from "@tanstack/react-query";

import { DriversListService } from "../_services/drivers-list-service";

export default function useDeleteDriverEndpoint() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-driver"],
    mutationFn: DriversListService.deleteDriver,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
    },
  });
}
