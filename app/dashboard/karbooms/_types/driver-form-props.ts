import { FormStates } from "@/app/dashboard/_types/form-states";
import { Driver } from "../drivers-list/_types/driver";

export type DriverFormProps = {
  formState: FormStates;
  driver?: Driver;
  onCancel: () => void;
  onSuccess: () => void;
};
