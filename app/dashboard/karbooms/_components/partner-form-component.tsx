"use client";

import { Button, IconButton, TextField } from "@mui/material";
import { InfoCircle, Book1 } from "iconsax-reactjs";
import { Controller, useWatch } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers";

import usePartnerForm from "../_hooks/use-partner-form";
import useAddPartner from "../_hooks/use-add-partner-endpoint";

import DescriptionInput from "@/app/_components/description-input";

import { PartnerFormType } from "../_schemas/partner-form-schema";

import { useKarboomsStore } from "../_providers/karbooms-store-provider";

import { PartnerFormProps } from "../_types/partner-form-props";

import { PARTNER_FORM_INITIAL } from "../_constants/partner-form-initial";
import BaseResponse from "@/app/_interfaces/base-response";

export default function PartnerFormComponent({
  onCancel,
  onSuccess,
}: PartnerFormProps) {
  const {
    register,
    control,
    setValue,
    handleSubmit,
    setError,
    setValues,
    formState: { errors },
  } = usePartnerForm();

  const { share_capital, share_decimal, description } = useWatch({ control });

  const { id: karboom_id } = useKarboomsStore((state) => state);

  const { mutate: addPartner } = useAddPartner();

  const handleIncrementCapital = () => {
    if (share_capital !== undefined) {
      if (share_capital < 5) setValue("share_capital", share_capital + 1);
      else if (share_capital == 5) {
        setValue("share_capital", 6);
        setValue("share_decimal", 0);
      } else if (share_capital == 6) {
        setValue("share_capital", 1);
        setValue("share_decimal", 0);
      }
    }
  };

  const handleDecrementCapital = () => {
    if (share_capital !== undefined) {
      if (share_capital >= 1) setValue("share_capital", share_capital - 1);
      else if (share_capital == 0) {
        setValue("share_capital", 6);
        setValue("share_decimal", 0);
      }
    }
  };

  const handleIncrementDecimal = () => {
    if (
      share_decimal !== undefined &&
      share_capital !== undefined &&
      share_capital < 6
    ) {
      if (share_decimal < 99) setValue("share_decimal", share_decimal + 1);
      else if (share_capital !== undefined && share_capital <= 5) {
        setValue("share_decimal", 0);
        setValue("share_capital", share_capital + 1);
      }
    }
  };

  const handleDecrementDecimal = () => {
    if (
      share_decimal !== undefined &&
      share_capital !== undefined &&
      share_capital >= 0
    ) {
      if (share_decimal > 1) setValue("share_decimal", share_decimal - 1);
      else if (share_capital !== undefined && share_capital >= 1) {
        setValue("share_decimal", 99);
        setValue("share_capital", share_capital - 1);
      }
    }
  };

  const handleCancel = () => {
    setValues(PARTNER_FORM_INITIAL);
    onCancel();
  };

  const submit = ({
    started_at,
    ended_at,
    share_capital,
    share_decimal,
    ...other
  }: PartnerFormType) => {
    const share = Number(`${share_capital}.${share_decimal}`);

    addPartner(
      {
        ...other,
        share,
        karboom_id,
        started_at: started_at.toISOString().split("T")[0],
        ended_at: ended_at?.toISOString().split("T")[0] ?? "",
      },
      {
        onSuccess: () => {
          setValues(PARTNER_FORM_INITIAL);
          onSuccess();
        },
        onError: (error) => {
          const err = error as unknown as BaseResponse;

          if (err.errors)
            Object.entries(err.errors).forEach(([field, errors]) =>
              setError(field as keyof PartnerFormType, {
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
      <div className="border-secondary-light flex w-full items-center justify-between rounded-2xl border p-4">
        <span className="text-body">مقدار سهم</span>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            className="bg-secondary text-body flex h-5 w-8 items-center justify-center rounded"
            onClick={handleIncrementDecimal}
          >
            +
          </button>
          <button
            type="button"
            className="bg-secondary text-body flex h-5 w-8 items-center justify-center rounded"
            onClick={handleDecrementDecimal}
          >
            -
          </button>
        </div>
        <div className="relative">
          <input
            {...register("share_decimal")}
            type="number"
            id="share-decimal"
            className="text-body absolute -right-4 bottom-0 w-8 text-center"
            placeholder="__"
            min={0}
            max={100}
          />
          <span className="text-body text-5xl font-extralight">/</span>
          <input
            {...register("share_capital")}
            type="number"
            id="share-capital"
            className="text-primary absolute -top-2 -left-4 w-8 text-center text-2xl"
            placeholder="_"
            min={0}
            max={6}
          />
        </div>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            className="bg-primary flex h-5 w-8 items-center justify-center rounded text-white"
            onClick={handleIncrementCapital}
          >
            +
          </button>
          <button
            type="button"
            className="bg-primary flex h-5 w-8 items-center justify-center rounded text-white"
            onClick={handleDecrementCapital}
          >
            -
          </button>
        </div>
        <span className="text-body-light text-sm">دانگ</span>
      </div>
      <div className="flex items-center gap-2">
        <InfoCircle variant="Broken" size={20} className="text-body-light" />
        <p className="text-body-light text-xs">
          مقدار سهم همان دانگ است که می‌تواند عددی اعشار باشد
        </p>
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
        <Button variant="contained" type="submit" fullWidth>
          ثبت
        </Button>
      </div>
    </form>
  );
}
