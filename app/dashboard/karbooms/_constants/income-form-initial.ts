import dayjs from "dayjs";
import { IncomeFormInput } from "../_schemas/income-form-schema";
import { USER_DEFAULTS } from "../../_constants/user-defaults";

export const INCOME_FORM_INITIAL: IncomeFormInput = {
  is_settled: true,
  settlement_date: null,
  reciever: {
    member: {
      id: 0,
    },
    user: USER_DEFAULTS,
  },
  quantity: null,
  unit_price: "",
  total_price: "",
  started_at: dayjs(),
  ended_at: dayjs(),
  description: null,
};
