"use client";

import Image from "next/image";

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

import useDriverForm from "../_hooks/use-driver-form";
import useAddDriver from "../_hooks/use-add-driver-endpoint";

import { DriverFormType } from "../_schemas/driver-form-schema";

import { DriverFormProps } from "../_types/driver-form-props";
import formatNumber from "@/app/_utilities/format-numbers";

export default function DriverFormComponent({
  onCancel,
  onSuccess,
}: DriverFormProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useDriverForm();

  const { description, fixed_amount } = useWatch({ control });

  const { id: karboom_id } = useKarboomsStore((state) => state);

  const { mutate } = useAddDriver();

  const handleCancel = () => {
    reset();
    onCancel();
  };

  const submit = ({ started_at, ended_at, ...other }: DriverFormType) => {
    mutate(
      {
        ...other,
        karboom_id,
        started_at: started_at.toISOString().split("T")[0],
        ended_at: ended_at?.toISOString().split("T")[0] ?? "",
      },
      {
        onSuccess: () => {
          reset();
          onSuccess();
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
        label="شماره تماس"
        slotProps={{
          input: {
            endAdornment: (
              <IconButton>
                <Book1 size={24} className="text-primary rotate-y-180" />
              </IconButton>
            ),
          },
        }}
      />
      <div className="flex items-center gap-4">
        <TextField {...register("first_name")} label="نام" fullWidth />
        <TextField {...register("last_name")} label="نام خانوادگی" fullWidth />
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
            />
          )}
        />
      </div>
      <TextField
        {...register("fixed_amount", { valueAsNumber: true })}
        type="number"
        label="دستمزد ثابت"
        error={!!errors.fixed_amount}
        helperText={
          errors.fixed_amount ? (
            (errors.fixed_amount?.message ?? "")
          ) : (
            <span className="text-body">
              {formatNumber(fixed_amount ?? 0)} تومان
            </span>
          )
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
        }}
      />
      <TextField
        {...register("percentage_amount", { valueAsNumber: true })}
        type="number"
        label="دستمزد درصدی"
        slotProps={{
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
        error={false}
        helperText=""
      />
      <Controller
        name="payment_type"
        control={control}
        render={({ field }) => (
          <FormControl>
            <FormLabel>
              دستمزد این راننده در چه بازه زمانی پرداخت می شود؟
            </FormLabel>
            <RadioGroup
              {...field}
              onChange={(event) => field.onChange(event.target.value)}
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
        <Button variant="contained" type="submit" fullWidth>
          ثبت
        </Button>
      </div>
    </form>
  );
}
