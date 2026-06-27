import { DriverFormType } from "../_schemas/driver-form-schema";

type AddDriverDataType = Omit<
  DriverFormType,
  "started_at" | "ended_at" | "fixed_amount"
> & {
  started_at: string;
  ended_at: string;
  karboom_id: number;
  fixed_amount: number;
};

export default AddDriverDataType;
