import useInvalidatingMutation from "@/app/_hooks/use-invalidating-mutation";

import { thirdPartyInsuranceService } from "../_services/third-party-insurance-service";

export default function useAddThirdPartyInsurance() {
  return useInvalidatingMutation({
    mutationKey: ["third-party-insurances"],
    mutationFn: thirdPartyInsuranceService.addThirdPartyInsurance,
    invalidateQueries: [["third-party-insurances"]],
  });
}
