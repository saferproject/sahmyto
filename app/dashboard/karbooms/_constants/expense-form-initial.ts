import dayjs from "dayjs";
import { ExpenseFormType } from "../_schemas/expense-form-schema";

export const EXPENSE_FORM_INITIAL: ExpenseFormType = {
  receiver: {
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
  unit_price: 0,
  wage_cost: 0,
  date: dayjs(),
  description: null,
  image: null,
};
