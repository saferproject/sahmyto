import { FormStates } from "@/app/dashboard/_types/form-states";
import { Activity } from "./activity";

export type ActivityFormProps = {
  formState: FormStates;
  activity?: Activity;
  onCancel: () => void;
  onSuccess: () => void;
};
