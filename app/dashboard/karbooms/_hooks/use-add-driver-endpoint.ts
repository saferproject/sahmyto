import { useMutation, useQueryClient } from "@tanstack/react-query";

import { driverFormService } from "../_services/driver-form-service";

export default function useAddDriver() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["add-driver"],
    mutationFn: driverFormService.addDriver,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drivers", "members"] });
    },
  });
}
