import dayjs from "dayjs";
import { DriverFormType } from "../_schemas/driver-form-schema";

export const DRIVER_FORM_INITIAL: DriverFormType = {
  phone: "",
  first_name: "",
  last_name: "",
  started_at: dayjs(),
  ended_at: null,
  fixed_amount: "",
  service_amount: "",
  percentage_amount: 0,
  description: "",
  payment_type: "monthly",
};
