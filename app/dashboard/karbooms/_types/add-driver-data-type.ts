import { DriverFormType } from "../_schemas/driver-form-schema";

type AddDriverDataType = Omit<DriverFormType, "started_at" | "ended_at"> & {
  started_at: string;
  ended_at: string;
  karboom_id: number;
};

export default AddDriverDataType;
