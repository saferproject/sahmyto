import useInfiniteListQuery from "@/app/_hooks/use-infinite-list-query";
import isValidQueryId from "@/app/_utilities/is-valid-query-id";

import { thirdPartyInsuranceService } from "../_services/third-party-insurance-service";

export default function useGetThirdPartyInsurancesEndpoint(
  karboomId: number | null | undefined,
) {
  return useInfiniteListQuery({
    queryKey: ["third-party-insurances", karboomId],
    queryFn: (page, signal, queryKey) =>
      thirdPartyInsuranceService.getThirdPartyInsurances(
        queryKey[1] as number,
        signal,
        page,
      ),
    enabled: isValidQueryId(karboomId),
  });
}
