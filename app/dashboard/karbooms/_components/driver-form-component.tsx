"use client";

import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Book1 } from "iconsax-reactjs";
import { Controller, useWatch } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";

import { useKarboomsStore } from "../_providers/karbooms-store-provider";

import DescriptionInput from "@/app/_components/description-input";
import PriceInputComponent from "@/app/_components/price-input-component";

import useDriverForm from "../_hooks/use-driver-form";
import useAddDriver from "../_hooks/use-add-driver-endpoint";

import { DriverFormType } from "../_schemas/driver-form-schema";

import { DriverFormProps } from "../_types/driver-form-props";

import parseNumber from "@/app/_utilities/parse-numbers";
import BaseResponse from "@/app/_interfaces/base-response";
import { DRIVER_FORM_INITIAL } from "../_constants/driver-form-initial";

export default function DriverFormComponent({
  onCancel,
  onSuccess,
}: DriverFormProps) {
  const {
    register,
    control,
    handleSubmit,
    setValues,
    setError,
    formState: { errors },
  } = useDriverForm();

  const { description, fixed_amount, service_amount } = useWatch({ control });

  const { id: karboomId } = useKarboomsStore((state) => state);

  const { mutate: addDriver, isPending: addingDriver } = useAddDriver();

  const handleCancel = () => {
    setValues(DRIVER_FORM_INITIAL);
    onCancel();
  };

  const submit = ({
    started_at,
    ended_at,
    fixed_amount,
    service_amount,
    ...other
  }: DriverFormType) => {
    addDriver(
      {
        ...other,
        service_amount: parseNumber(service_amount),
        fixed_amount: parseNumber(fixed_amount),
        karboom_id: karboomId,
        started_at: started_at.toISOString().split("T")[0],
        ended_at: ended_at?.toISOString().split("T")[0] ?? "",
      },
      {
        onSuccess: () => {
          setValues(DRIVER_FORM_INITIAL);
          onSuccess();
        },
        onError: (error) => {
          const err = error as unknown as BaseResponse;

          if (err.errors)
            Object.entries(err.errors).forEach(([field, errors]) =>
              setError(field as keyof DriverFormType, {
                message: errors[0],
                type: "validate",
              }),
            );
        },
      },
    );
  };

  return (
    <form
      className="flex w-full flex-col gap-4"
      onSubmit={handleSubmit(submit)}
    >
      <TextField
        {...register("phone")}
        type="tel"
        inputMode="tel"
        label="شماره تماس"
        error={!!errors.phone}
        helperText={errors.phone?.message ?? ""}
        slotProps={{
          input: {
            endAdornment: (
              <IconButton>
                <Book1 size={24} className="text-primary rotate-y-180" />
              </IconButton>
            ),
          },
        }}
        required
      />
      <div className="flex items-center gap-4">
        <TextField
          {...register("first_name")}
          label="نام"
          error={!!errors.first_name}
          helperText={errors.first_name?.message ?? ""}
          fullWidth
          required
        />
        <TextField
          {...register("last_name")}
          label="نام خانوادگی"
          error={!!errors.last_name}
          helperText={errors.last_name?.message ?? ""}
          fullWidth
          required
        />
      </div>
      <div className="flex w-full gap-4">
        <Controller
          control={control}
          name="started_at"
          render={({ field }) => (
            <DatePicker
              {...field}
              onChange={(value) => field.onChange(value)}
              label="تاریخ شروع"
              format="YYYY/MM/DD"
              views={["year", "month", "day"]}
              slotProps={{
                textField: {
                  error: !!errors.started_at,
                  helperText: errors.started_at?.message ?? "",
                  fullWidth: true,
                  required: true,
                },
              }}
              disableFuture
            />
          )}
        />
        <Controller
          control={control}
          name="ended_at"
          render={({ field }) => (
            <DatePicker
              {...field}
              onChange={(value) => field.onChange(value)}
              label="تاریخ پایان"
              format="YYYY/MM/DD"
              views={["year", "month", "day"]}
              slotProps={{
                textField: {
                  error: !!errors.ended_at,
                  helperText: errors.ended_at?.message ?? "",
                  fullWidth: true,
                },
              }}
              disablePast
            />
          )}
        />
      </div>
      <Controller
        name="payment_type"
        control={control}
        render={({ field }) => (
          <FormControl required>
            <FormLabel>
              دستمزد این راننده در چه بازه زمانی پرداخت می شود؟
            </FormLabel>
            <RadioGroup
              {...field}
              onChange={(event) => field.onChange(event.target.value)}
              sx={{ flexDirection: "row", marginTop: 0, paddingTop: 0 }}
            >
              <FormControlLabel
                value={"monthly"}
                label="ماهانه"
                control={<Radio />}
              />
              <FormControlLabel
                value={"daily"}
                label="روزانه"
                control={<Radio />}
              />
            </RadioGroup>
          </FormControl>
        )}
      />
      <PriceInputComponent
        register={register("fixed_amount")}
        value={fixed_amount}
        label="دستمزد ثابت"
        error={!!errors.fixed_amount}
        helperText={errors.fixed_amount?.message ?? ""}
      />
      <PriceInputComponent
        register={register("service_amount")}
        value={service_amount}
        label="دستمزد سرویسی"
        error={!!errors.service_amount}
        helperText={errors.service_amount?.message ?? ""}
      />
      <TextField
        {...register("percentage_amount", { valueAsNumber: true })}
        type="number"
        label="دستمزد درصدی"
        error={!!errors.percentage_amount}
        helperText={errors.percentage_amount?.message ?? ""}
        slotProps={{
          htmlInput: {
            min: 0,
            max: 100,
          },
          input: {
            endAdornment: (
              <span className="text-body text-xl font-bold">%</span>
            ),
          },
        }}
      />
      <DescriptionInput
        register={register("description")}
        currentlength={description?.length ?? 0}
        error={!!errors.description}
        helperText={errors.description?.message ?? ""}
      />
      <div className="flex items-center gap-4">
        <Button
          variant="outlined"
          color="primary"
          type="button"
          onClick={handleCancel}
          fullWidth
        >
          انصراف
        </Button>
        <Button
          variant="contained"
          type="submit"
          loading={addingDriver}
          fullWidth
        >
          ثبت
        </Button>
      </div>
    </form>
  );
}
