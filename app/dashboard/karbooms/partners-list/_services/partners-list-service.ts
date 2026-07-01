import createQueryParams from "@/app/_utilities/create-query-params";
import { fetchWithAuth } from "@/app/proxy";
import GetPartnersQueryParams from "../_interfaces/get-partners-query-params";
import Partner from "../../_interfaces/partner";

export const PartnersListService = {
  getPartners: ({ karboom_id, ...other }: GetPartnersQueryParams) =>
    fetchWithAuth<Partner[]>(
      `karboom/partners/${karboom_id}${createQueryParams<Omit<GetPartnersQueryParams, "karboom_id">>(other)}`,
      { method: "GET", headers: { "Content-Type": "application/json" } },
    ),
};
