import useListQuery from "@/app/_hooks/use-list-query";

import { bodyInsuranceService } from "../_services/body-insurance-service";

export default function useGetBodyInsurancesEndpoint(
  karboomId: number | null | undefined,
) {
  return useListQuery(
    ["body-insurances", karboomId],
    bodyInsuranceService.getBodyInsurances,
    karboomId,
  );
}
