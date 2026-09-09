import { RejectExpenseBody } from "./reject-expense-body";

export type RejectExpenseEndpointBody = {
  expenseId: number;
} & RejectExpenseBody;
