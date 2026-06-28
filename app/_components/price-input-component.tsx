"use client";

import Image from "next/image";

import { TextField } from "@mui/material";

import { transformNumber } from "../_utilities/transform-numbers";
import formatNumber from "../_utilities/format-numbers";
import parseNumber from "../_utilities/parse-numbers";

import { PriceInputProps } from "../_types/price-input-props";

export default function PriceInputComponent({
  register,
  value,
  label = "مبلغ",
  error = false,
  helperText = "",
  disabled = false,
  required = false,
}: PriceInputProps) {
  const amount = parseNumber(value) || 0;

  return (
    <TextField
      {...register}
      value={value ?? ""}
      label={label}
      error={error}
      type="text"
      inputMode="numeric"
      helperText={
        error ? helperText : <span>{transformNumber(amount)} تومان</span>
      }
      slotProps={{
        input: {
          endAdornment: (
            <Image
              src="/images/toman-secondary.webp"
              alt="تومان"
              width={24}
              height={24}
            />
          ),
        },
        htmlInput: {
          sx: { textAlign: "left" },
        },
      }}
      onChange={(event) => {
        const digits = parseNumber(event.target.value);
        event.target.value = digits === 0 ? "" : formatNumber(digits);
        register.onChange(event);
      }}
      fullWidth
      disabled={disabled}
      required={required}
    />
  );
}
