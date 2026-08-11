import { useQuery } from "@tanstack/react-query";

import { thirdPartyInsuranceService } from "../_services/third-party-insurance-service";
import isValidQueryId from "@/app/_utilities/is-valid-query-id";

export default function useGetThirdPartyInsurancesEndpoint(
  karboomId: number | null | undefined,
) {
  return useQuery({
    queryKey: ["third-party-insurances", karboomId],
    queryFn: ({ queryKey, signal }) =>
      thirdPartyInsuranceService.getThirdPartyInsurances(
        queryKey[1] as number,
        signal,
      ),
    enabled: isValidQueryId(karboomId),
  });
}
