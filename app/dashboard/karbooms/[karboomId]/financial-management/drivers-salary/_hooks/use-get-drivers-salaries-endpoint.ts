import useInfiniteListQuery from "@/app/_hooks/use-infinite-list-query";
import isValidQueryId from "@/app/_utilities/is-valid-query-id";

import { driversSalaryService } from "../_services/drivers-salary-service";

export default function useGetDriversSalaryEndpoint(
  monthId: number | null | undefined,
) {
  return useInfiniteListQuery({
    queryKey: ["drivers-salary", monthId],
    queryFn: (page, signal, queryKey) =>
      driversSalaryService.getDriversSalary(
        queryKey[1] as number,
        signal,
        page,
      ),
    enabled: isValidQueryId(monthId),
  });
}
