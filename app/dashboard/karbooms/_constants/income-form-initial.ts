import dayjs from "dayjs";
import { IncomeFormType } from "../_schemas/income-form-schema";

export const INCOME_FORM_INITIAL: IncomeFormType = {
  reciever: {
    member: {
      id: 0,
    },
    user: {
      avatar: null,
      first_name: "",
      full_name: "",
      id: 0,
      last_name: "",
      phone: "",
      bio: null,
      email: null,
      father_name: "",
      gender: "female",
      is_complete_profile: false,
      status: "active",
    },
  },
  quantity: 0,
  unit_price: '',
  total_price: '',
  started_at: dayjs(),
  ended_at: dayjs(),
  description: null,
};
