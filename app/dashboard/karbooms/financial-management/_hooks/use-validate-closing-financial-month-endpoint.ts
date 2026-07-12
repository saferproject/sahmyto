import { useMutation } from "@tanstack/react-query";

import { financialManagmentService } from "../_services/financial-management-service";

export default function useValidateClosingFinancialMonthEndpoint() {
  return useMutation({
    mutationKey: ["validate-closing-financial-month"],
    mutationFn: financialManagmentService.validateClosingFinancialMonth,
  });
}
