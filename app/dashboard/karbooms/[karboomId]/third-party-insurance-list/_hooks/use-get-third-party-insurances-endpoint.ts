import useInfiniteListQuery from "@/app/_hooks/use-infinite-list-query";
import isValidQueryId from "@/app/_utilities/is-valid-query-id";
import type { QueryParams } from "@/app/_types/query-params";
import { thirdPartyInsuranceService } from "../_services/third-party-insurance-service";

export default function useGetThirdPartyInsurancesEndpoint(
  karboomId: number | null | undefined,
  queryParams: QueryParams = {},
) {
  return useInfiniteListQuery({
    queryKey: ["third-party-insurances", karboomId, queryParams],
    queryFn: (page, signal) =>
      thirdPartyInsuranceService.getThirdPartyInsurances(
        karboomId as number,
        signal,
        page,
        queryParams,
      ),
    enabled: isValidQueryId(karboomId),
  });
}
