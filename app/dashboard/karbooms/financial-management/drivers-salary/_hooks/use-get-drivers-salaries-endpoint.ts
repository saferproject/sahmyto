import { useQuery } from "@tanstack/react-query";

import { driversSalaryService } from "../_services/drivers-salary-service";
import isValidQueryId from "@/app/_utilities/is-valid-query-id";

export default function useGetDriversSalaryEndpoint(
  monthId: number | null | undefined,
) {
  return useQuery({
    queryKey: ["drivers-salary", monthId],
    queryFn: ({ queryKey, signal }) =>
      driversSalaryService.getDriversSalary(queryKey[1] as number, signal),
    enabled: isValidQueryId(monthId),
  });
}
