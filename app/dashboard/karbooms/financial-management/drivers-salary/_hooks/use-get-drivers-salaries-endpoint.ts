import useListQuery from "@/app/_hooks/use-list-query";

import { driversSalaryService } from "../_services/drivers-salary-service";

export default function useGetDriversSalaryEndpoint(
  monthId: number | null | undefined,
) {
  return useListQuery(
    ["drivers-salary", monthId],
    driversSalaryService.getDriversSalary,
    monthId,
  );
}
