import { useQuery } from "@tanstack/react-query";

import { bodyInsuranceService } from "../_services/body-insurance-service";
import isValidQueryId from "@/app/_utilities/is-valid-query-id";

export default function useGetBodyInsurancesEndpoint(
  karboomId: number | null | undefined,
) {
  return useQuery({
    queryKey: ["body-insurances", karboomId],
    queryFn: ({ queryKey, signal }) =>
      bodyInsuranceService.getBodyInsurances(queryKey[1] as number, signal),
    enabled: isValidQueryId(karboomId),
  });
}
