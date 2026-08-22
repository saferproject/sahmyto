import useInvalidatingMutation from "@/app/_hooks/use-invalidating-mutation";

import { financialManagmentService } from "../_services/financial-management-service";

export default function useStartProcessingFinancialMonthEndpoint() {
  return useInvalidatingMutation({
    mutationKey: ["start-processing-financial-month"],
    mutationFn: financialManagmentService.startProcessingFinancialMonth,
    invalidateQueries: [["financial-months"]],
  });
}
