import { FormStates } from "@/app/dashboard/_types/form-states";
import { Activity } from "./activity";

export type ActivityFormDrawerProps = {
  formState: FormStates;
  activity?: Activity;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSuccess: () => void;
};
