import dayjs from "dayjs";

import { PaymentFormType } from "../_schemas/payment-form-schema";

export const PAYMENT_FORM_INITIAL: PaymentFormType = {
  total_price: null,
  payer: {
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
  date: dayjs(),
  type: "debit",
  description: null,
};
