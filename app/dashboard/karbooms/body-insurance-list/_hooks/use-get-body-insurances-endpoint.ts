import useInfiniteListQuery from "@/app/_hooks/use-infinite-list-query";
import isValidQueryId from "@/app/_utilities/is-valid-query-id";

import { bodyInsuranceService } from "../_services/body-insurance-service";

export default function useGetBodyInsurancesEndpoint(
  karboomId: number | null | undefined,
) {
  return useInfiniteListQuery({
    queryKey: ["body-insurances", karboomId],
    queryFn: (page, signal, queryKey) =>
      bodyInsuranceService.getBodyInsurances(
        queryKey[1] as number,
        signal,
        page,
      ),
    enabled: isValidQueryId(karboomId),
  });
}
