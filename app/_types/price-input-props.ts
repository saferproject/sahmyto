import { UseFormRegisterReturn } from "react-hook-form";

export type PriceInputProps = {
  register: UseFormRegisterReturn;
  value: string | null | undefined;
  label: string;
  error: boolean;
  helperText: string;
  disabled?: boolean;
};
