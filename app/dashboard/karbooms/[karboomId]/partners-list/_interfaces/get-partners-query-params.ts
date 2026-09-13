import type { QueryParams } from "@/app/_types/query-params";

export default interface GetPartnersQueryParams extends QueryParams {
  karboom_id: number | null | undefined;
}
