import useInfiniteListQuery from "@/app/_hooks/use-infinite-list-query";
import isValidQueryId from "@/app/_utilities/is-valid-query-id";
import type { QueryParams } from "@/app/_types/query-params";
import { bodyInsuranceService } from "../_services/body-insurance-service";

export default function useGetBodyInsurancesEndpoint(
  karboomId: number | null | undefined,
  queryParams: QueryParams = {},
) {
  return useInfiniteListQuery({
    queryKey: ["body-insurances", karboomId, queryParams],
    queryFn: (page, signal) =>
      bodyInsuranceService.getBodyInsurances(
        karboomId as number,
        signal,
        page,
        queryParams,
      ),
    enabled: isValidQueryId(karboomId),
  });
}
