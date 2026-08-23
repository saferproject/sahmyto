import useListQuery from "@/app/_hooks/use-list-query";

import { paymentsListService } from "../_services/payments-list-service";

export default function useGetPaymentsEndpoint(
  karboomId: number | null | undefined,
) {
  return useListQuery(
    ["payments", karboomId],
    paymentsListService.getPayments,
    karboomId,
  );
}
