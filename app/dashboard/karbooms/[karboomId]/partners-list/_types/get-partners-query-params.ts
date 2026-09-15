import type { QueryParams } from "@/app/_types/query-params";

type GetPartnersQueryParams = QueryParams & {
  karboom_id: number | null | undefined;
};

export default GetPartnersQueryParams;
