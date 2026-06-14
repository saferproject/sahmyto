import { fetchWithAuth } from "@/app/proxy";
import InsuranceCompany from "../_interfaces/insurance-company";

export const appService = {
  getInsuranceCompanies: () =>
    fetchWithAuth<InsuranceCompany[]>("insurance/companies", {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    }),
};
