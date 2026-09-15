import { http } from "@/app/_services/http";
import addPaginationQuery from "@/app/_utilities/add-pagination-query";
import InsuranceCompany from "../_types/insurance-company";

export const appService = {
  getInsuranceCompanies: (signal?: AbortSignal, page: number = 1) =>
    http.get<InsuranceCompany[]>(
      addPaginationQuery("insurance/companies", page),
      { signal },
    ),
};
