import { useMutation, useQueryClient } from "@tanstack/react-query";

import { driverFormService } from "../_services/driver-form-service";

export default function useEditDriver() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["edit-driver"],
    mutationFn: driverFormService.editDriver,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
  });
}
