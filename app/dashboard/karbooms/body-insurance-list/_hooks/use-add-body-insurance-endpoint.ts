import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bodyInsuranceService } from "../_services/body-insurance-service";

export default function useAddBodyInsuranceEndpoint() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["add-body-insurance"],
    mutationFn: bodyInsuranceService.addBodyInsurance,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["body-insurances"] });
    },
  });
}
