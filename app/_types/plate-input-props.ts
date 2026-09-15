import {
  type UseFormSetFocus,
  type UseFormRegister,
  type Control,
  FieldValues,
} from "react-hook-form";

export type PlateFormFields = {
  first_number?: string | null;
  second_character?: string | null;
  third_number?: string | null;
  fourth_number?: string | null;
};

type PlateInputProps<FormType extends FieldValues & PlateFormFields> = {
  register: UseFormRegister<FormType>;
  control: Control<FormType>;
  setFocus: UseFormSetFocus<FormType>;
};

export default PlateInputProps;
