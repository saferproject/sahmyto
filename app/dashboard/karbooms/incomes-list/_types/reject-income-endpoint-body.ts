import { RejectIncomeBody } from "./reject-income-body";

export type RejectIncomeEndpointBody = {
  incomeId: number;
} & RejectIncomeBody;
