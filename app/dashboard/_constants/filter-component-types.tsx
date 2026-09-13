"use client";

import { Controller, type Control } from "react-hook-form";
import type { ComponentType } from "react";
import {
  Checkbox,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";

import DatePickerComponent from "@/app/_components/date-picker-component";
import formatNumber from "@/app/_utilities/format-numbers";
import { formatGregorianDate } from "@/app/_utilities/format-dates";
import type { Filter, FilterValues } from "../_types/filter";
import type { FilterTypes } from "../_types/filter-types";
import {
  normalizeFilterDigits,
  parseFilterNumber,
  validateFilterValue,
} from "../_utilities/list-filters";

type FilterControlProps = {
  filter: Filter;
  control: Control<FilterValues>;
};

function ScalarFilterControl({ filter, control }: FilterControlProps) {
  return (
    <Controller
      name={filter.name}
      control={control}
      rules={{ validate: (value) => validateFilterValue(filter, value) }}
      render={({
        field: { ref, value, onChange, ...field },
        fieldState: { error },
      }) => {
        const text = typeof value === "string" ? value : "";
        const price =
          filter.type === "price" ? parseFilterNumber(text, true) : null;
        return (
          <TextField
            {...field}
            inputRef={ref}
            label={filter.label}
            value={price === null ? text : formatNumber(price)}
            onChange={(event) =>
              onChange(
                filter.type === "price"
                  ? normalizeFilterDigits(event.target.value).replace(
                      /[,٬]/g,
                      "",
                    )
                  : event.target.value,
              )
            }
            select={filter.type === "select"}
            error={!!error}
            helperText={error?.message ?? ""}
            slotProps={{
              htmlInput: {
                inputMode:
                  filter.type === "price"
                    ? "numeric"
                    : filter.type === "number"
                      ? "decimal"
                      : "text",
              },
              input:
                filter.type === "price"
                  ? {
                      endAdornment: (
                        <InputAdornment position="end">تومان</InputAdornment>
                      ),
                    }
                  : undefined,
            }}
            fullWidth
          >
            {filter.type === "select" && [
              <MenuItem key="empty" value="">
                همه
              </MenuItem>,
              ...filter.options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              )),
            ]}
          </TextField>
        );
      }}
    />
  );
}

function BooleanFilterControl({ filter, control }: FilterControlProps) {
  return (
    <Controller
      name={filter.name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          label={filter.label}
          control={
            <Checkbox
              name={field.name}
              checked={field.value === true}
              onChange={(_, checked) => field.onChange(checked)}
              onBlur={field.onBlur}
              slotProps={{ input: { ref: field.ref } }}
            />
          }
        />
      )}
    />
  );
}

function DateFilterControl({ filter, control }: FilterControlProps) {
  return (
    <Controller
      name={filter.name}
      control={control}
      rules={{ validate: (value) => validateFilterValue(filter, value) }}
      render={({ field, fieldState: { error } }) => {
        const range = Array.isArray(field.value) ? field.value : ["", ""];
        return (
          <div className="flex w-full flex-col gap-4 sm:flex-row">
            {(["از", "تا"] as const).map((label, index) => (
              <DatePickerComponent
                key={label}
                label={`${filter.label} (${label})`}
                value={range[index] ? dayjs(range[index]) : null}
                inputRef={index === 0 ? field.ref : undefined}
                onChange={(date) => {
                  const next: [string, string] = [range[0], range[1]];
                  next[index] =
                    date === null
                      ? ""
                      : date.isValid()
                        ? formatGregorianDate(date)
                        : "invalid";
                  field.onChange(next);
                }}
                error={!!error}
                helperText={error?.message ?? ""}
              />
            ))}
          </div>
        );
      }}
    />
  );
}

export const FILTER_COMPONENT_TYPES: Record<
  FilterTypes,
  ComponentType<FilterControlProps>
> = {
  text: ScalarFilterControl,
  number: ScalarFilterControl,
  price: ScalarFilterControl,
  select: ScalarFilterControl,
  boolean: BooleanFilterControl,
  date: DateFilterControl,
};
