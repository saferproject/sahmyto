import { TextField } from "@mui/material";
import DescriptionInputProps from "../_interfaces/description-input-props";

export default function DescriptionInput({
  label = "توضیحات",
  rows = 5,
  maxLength = 200,
  currentlength = 0,
  register,
  error,
  helperText,
}: DescriptionInputProps) {
  return (
    <TextField
      {...register}
      label={label}
      rows={rows}
      error={error}
      helperText={helperText}
      slotProps={{
        input: {
          endAdornment: (
            <div className="text-body-light flex">
              <p>{currentlength}</p>/<p>{maxLength}</p>
            </div>
          ),
          sx: {
            alignItems: "flex-end",
          },
        },
        htmlInput: {
          maxLength,
        },
      }}
      multiline
      fullWidth
    />
  );
}
