import { useQuery } from "@tanstack/react-query";

import { bodyInsuranceService } from "../_services/body-insurance-service";

export default function useGetBodyInsurancesEndpoint(karboomId: number) {
  return useQuery({
    queryKey: ["body-insurances", karboomId],
    queryFn: ({ queryKey, signal }) =>
      bodyInsuranceService.getBodyInsurances(queryKey[1] as number, signal),
  });
}
