import useListQuery from "@/app/_hooks/use-list-query";

import { thirdPartyInsuranceService } from "../_services/third-party-insurance-service";

export default function useGetThirdPartyInsurancesEndpoint(
  karboomId: number | null | undefined,
) {
  return useListQuery(
    ["third-party-insurances", karboomId],
    thirdPartyInsuranceService.getThirdPartyInsurances,
    karboomId,
  );
}
