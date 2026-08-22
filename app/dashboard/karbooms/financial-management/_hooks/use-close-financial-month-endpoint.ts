import useInvalidatingMutation from "@/app/_hooks/use-invalidating-mutation";

import { financialManagementService } from "../_services/financial-management-service";

export default function useCloseFinancialMonth() {
  return useInvalidatingMutation({
    mutationKey: ["close-financial-month"],
    mutationFn: financialManagementService.closeFinancialMonth,
    invalidateQueries: [["financial-month-data"], ["financial-months"]],
  });
}
