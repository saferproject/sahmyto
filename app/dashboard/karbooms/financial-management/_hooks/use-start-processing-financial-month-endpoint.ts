import useInvalidatingMutation from "@/app/_hooks/use-invalidating-mutation";

import { financialManagementService } from "../_services/financial-management-service";

export default function useStartProcessingFinancialMonthEndpoint() {
  return useInvalidatingMutation({
    mutationKey: ["start-processing-financial-month"],
    mutationFn: financialManagementService.startProcessingFinancialMonth,
    invalidateQueries: [["financial-months"]],
  });
}
