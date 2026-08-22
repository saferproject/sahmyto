import { useMutation } from "@tanstack/react-query";

import { financialManagementService } from "../_services/financial-management-service";

export default function useValidateClosingFinancialMonthEndpoint() {
  return useMutation({
    mutationKey: ["validate-closing-financial-month"],
    mutationFn: financialManagementService.validateClosingFinancialMonth,
  });
}
