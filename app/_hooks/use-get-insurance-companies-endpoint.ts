import useInfiniteListQuery from "./use-infinite-list-query";
import { appService } from "../_services/app-service";

export default function useGetInsuranceCompaniesEndpoint(enabled: boolean) {
  return useInfiniteListQuery({
    queryKey: ["insurance-companies"],
    queryFn: (page, signal) => appService.getInsuranceCompanies(signal, page),
    enabled,
  });
}
