import useInvalidatingMutation from "@/app/_hooks/use-invalidating-mutation";

import { bodyInsuranceService } from "../_services/body-insurance-service";

export default function useAddBodyInsuranceEndpoint() {
  return useInvalidatingMutation({
    mutationKey: ["add-body-insurance"],
    mutationFn: bodyInsuranceService.addBodyInsurance,
    invalidateQueries: [["body-insurances"]],
  });
}
