import { useMutation } from "@tanstack/react-query";
import { thirdPartyInsuranceService } from "../_services/third-party-insurance-service";

export default function useAddThirdPartyInsurance() {
  return useMutation({
    mutationKey: ["third-party-insurances"],
    mutationFn: thirdPartyInsuranceService.addThirdPartyInsurance,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });
}
