import {
  type UseFormSetFocus,
  type UseFormRegister,
  type Control,
  FieldValues,
} from "react-hook-form";

export default interface PlateInputProps<FormType extends FieldValues> {
  register: UseFormRegister<FormType>;
  control: Control<FormType>;
  setFocus: UseFormSetFocus<FormType>;
}
