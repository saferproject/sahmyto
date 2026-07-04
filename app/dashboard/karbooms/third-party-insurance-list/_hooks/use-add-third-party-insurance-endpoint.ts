import { useMutation, useQueryClient } from "@tanstack/react-query";
import { thirdPartyInsuranceService } from "../_services/third-party-insurance-service";

export default function useAddThirdPartyInsurance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["third-party-insurances"],
    mutationFn: thirdPartyInsuranceService.addThirdPartyInsurance,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["third-party-insurances"] });
    },
  });
}
