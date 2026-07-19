import dayjs from "dayjs";
import { DriverFormType } from "../_schemas/driver-form-schema";

export const DRIVER_FORM_INITIAL: DriverFormType = {
  phone: "",
  first_name: "",
  last_name: "",
  started_at: dayjs(),
  ended_at: null,
  fixed_amount: null,
  service_amount: null,
  percentage_amount: null,
  description: null,
  payment_type: "monthly",
};
