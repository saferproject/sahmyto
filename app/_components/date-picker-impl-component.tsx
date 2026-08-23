"use client";

import { DatePicker, type DatePickerProps } from "@mui/x-date-pickers";
import type { ReactNode } from "react";

interface DatePickerComponentProps extends Omit<
  DatePickerProps,
  "format" | "slotProps" | "views"
> {
  error?: boolean;
  helperText?: ReactNode;
  required?: boolean;
}

export default function DatePickerComponent({
  error = false,
  helperText = "",
  required = false,
  ...props
}: DatePickerComponentProps) {
  return (
    <DatePicker
      {...props}
      format="YYYY/MM/DD"
      views={["year", "month", "day"]}
      slotProps={{
        textField: {
          error,
          helperText,
          fullWidth: true,
          required,
          slotProps: {
            inputLabel: {
              shrink: true,
            },
          },
        },
      }}
    />
  );
}
