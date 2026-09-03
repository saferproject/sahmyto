import dayjs from "dayjs";
import { ExpenseFormType } from "../_schemas/expense-form-schema";
import { USER_DEFAULTS } from "../../_constants/user-defaults";

export const EXPENSE_FORM_INITIAL: ExpenseFormType = {
  is_settled: true,
  settlement_date: null,
  payer: {
    member: {
      id: 0,
    },
    user: USER_DEFAULTS,
  },
  unit_price: null,
  wage_cost: null,
  date: dayjs(),
  description: null,
  image: null,
};
