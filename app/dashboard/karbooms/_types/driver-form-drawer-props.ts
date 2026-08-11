import { FormStates } from "@/app/dashboard/_types/form-states";
import { Driver } from "../drivers-list/_types/driver";

export type DriverFormDrawerProps = {
  formState: FormStates;
  driver?: Driver;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSuccess: () => void;
};
