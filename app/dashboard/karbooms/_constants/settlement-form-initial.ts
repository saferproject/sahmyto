import dayjs from "dayjs";
import { SettlementFormType } from "../_schemas/settlement-form-schema";
import { USER_DEFAULTS } from "../../_constants/user-defaults";

export const SETTLEMENT_FORM_INITIAL: SettlementFormType = {
  member: {
    member: {
      id: 0,
    },
    user: USER_DEFAULTS,
  },
  settlement_date: dayjs(),
  description: null,
};
