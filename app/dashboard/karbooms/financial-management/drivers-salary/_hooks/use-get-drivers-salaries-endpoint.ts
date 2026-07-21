import { useQuery } from "@tanstack/react-query";

import { driversSalaryService } from "../_services/drivers-salary-service";

export default function useGetDriversSalaryEndpoint(monthId: number) {
  return useQuery({
    queryKey: ["drivers-salary", monthId],
    queryFn: ({ queryKey }) =>
      driversSalaryService.getDriversSalaryEndpoint(queryKey[1] as number),
  });
}
