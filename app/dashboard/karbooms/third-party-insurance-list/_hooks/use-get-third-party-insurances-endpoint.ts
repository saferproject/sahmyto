import { useQuery } from "@tanstack/react-query";

import { thirdPartyInsuranceService } from "../_services/third-party-insurance-service";

export default function useGetThirdPartyInsurancesEndpoint(karboomId: number) {
  return useQuery({
    queryKey: ["third-party-insurances", karboomId],
    queryFn: ({ queryKey }) =>
      thirdPartyInsuranceService.getThirdPartyInsurances(queryKey[1] as number),
  });
}
