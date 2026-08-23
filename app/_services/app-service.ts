import { http } from "@/app/_services/http";
import InsuranceCompany from "../_interfaces/insurance-company";

export const appService = {
  getInsuranceCompanies: (signal?: AbortSignal) =>
    http.get<InsuranceCompany[]>("insurance/companies", { signal }),
};
