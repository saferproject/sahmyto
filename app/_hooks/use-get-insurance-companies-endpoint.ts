import { useQuery } from "@tanstack/react-query";
import { appService } from "../_services/app-service";

export default function useGetInsuranceCompaniesEndpoint() {
  return useQuery({
    queryKey: ["insurance-companies"],
    queryFn: appService.getInsuranceCompanies,
  });
}