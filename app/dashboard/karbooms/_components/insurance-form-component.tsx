"use client";

import { useEffect } from "react";
import { Controller, useWatch } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import type { Dayjs } from "dayjs";

import DatePickerComponent from "@/app/_components/date-picker-component";
import DescriptionInput from "@/app/_components/description-input";
import InsuranceCompanyInput from "@/app/_components/insurance-company-input";
import { formatGregorianDate } from "@/app/_utilities/format-dates";

import useZodForm from "@/app/_hooks/use-zod-form";

import { INSURANCE_FORM_INITIAL } from "../_constants/insurance-form-initial";
import InsuranceFormSchema, {
  type InsuranceFormType,
} from "../_schemas/insurance-form-schema";
import { useKarboomsStore } from "../_providers/karbooms-store-provider";

type KarboomIdKey = "karboomId" | "karboom_id";

interface InsuranceMutation {
  mutate: (
    body: Record<string, unknown>,
    options?: { onSuccess: () => void },
  ) => void;
  isPending: boolean;
}

interface InsuranceFormComponentProps {
  isOpen: boolean;
  onSuccess: () => void;
  mutation: InsuranceMutation;
  karboomIdKey: KarboomIdKey;
}

export default function InsuranceFormComponent({
  isOpen,
  onSuccess,
  mutation,
  karboomIdKey,
}: InsuranceFormComponentProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useZodForm<InsuranceFormType>({
    schema: InsuranceFormSchema,
    defaultValues: INSURANCE_FORM_INITIAL,
  });

  const { description, started_at } = useWatch({ control });

  const karboomId = useKarboomsStore((state) => state.id);

  const submit = ({ started_at, ended_at, ...other }: InsuranceFormType) => {
    mutation.mutate(
      {
        ...other,
        [karboomIdKey]: karboomId,
        started_at: formatGregorianDate(started_at),
        ended_at: formatGregorianDate(ended_at),
      },
      {
        onSuccess() {
          onSuccess();
          reset(INSURANCE_FORM_INITIAL);
        },
      },
    );
  };

  useEffect(() => {
    if (started_at?.isValid) {
      const startedAt = started_at as Dayjs;

      setValue("ended_at", startedAt.year(startedAt.year() + 1));
    }
  }, [setValue, started_at]);

  return (
    <form
      className="flex w-full flex-col gap-4"
      onSubmit={handleSubmit(submit)}
    >
      <TextField
        {...register("insurance_number")}
        label="شماره بیمه"
        error={!!errors.insurance_number}
        helperText={errors.insurance_number?.message ?? ""}
      />
      <InsuranceCompanyInput control={control} enableGettingData={isOpen} />
      <TextField
        {...register("insurance_code")}
        label="کد یکتای بیمه"
        error={!!errors.insurance_code}
        helperText={errors.insurance_code?.message ?? ""}
      />
      <Controller
        control={control}
        name="started_at"
        render={({ field }) => (
          <DatePickerComponent
            {...field}
            onChange={(value) => field.onChange(value)}
            label="تاریخ شروع"
            error={!!errors.started_at}
            helperText={errors.started_at?.message ?? ""}
          />
        )}
      />
      <Controller
        control={control}
        name="ended_at"
        render={({ field }) => (
          <DatePickerComponent
            {...field}
            onChange={(value) => field.onChange(value)}
            label="تاریخ پایان"
            error={!!errors.ended_at}
            helperText={errors.ended_at?.message ?? ""}
          />
        )}
      />
      <DescriptionInput
        register={register("description")}
        currentlength={description?.length ?? 0}
        error={!!errors.description}
        helperText={errors.description?.message ?? ""}
      />
      <Button type="submit" variant="contained" loading={mutation.isPending}>
        ثبت
      </Button>
    </form>
  );
}
