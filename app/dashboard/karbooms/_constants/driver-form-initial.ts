import dayjs from "dayjs";
import { DriverFormType } from "../_schemas/driver-form-schema";

export const getDriverFormInitial = (): DriverFormType => ({
  phone: "",
  first_name: "",
  last_name: "",
  started_at: dayjs(),
  ended_at: null,
  fixed_amount: "", // NOTE: This is a string to allow for empty values
  service_amount: "", // NOTE: This is a string to allow for empty values
  percentage_amount: null,
  description: null,
  payment_type: "monthly",
});
