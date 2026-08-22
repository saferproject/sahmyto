import useInvalidatingMutation from "@/app/_hooks/use-invalidating-mutation";

import { financialManagmentService } from "../_services/financial-management-service";

export default function useCloseFinancialMonth() {
  return useInvalidatingMutation({
    mutationKey: ["close-financial-month"],
    mutationFn: financialManagmentService.closeFinancialMonth,
    invalidateQueries: [["financial-month-data"], ["financial-months"]],
  });
}
