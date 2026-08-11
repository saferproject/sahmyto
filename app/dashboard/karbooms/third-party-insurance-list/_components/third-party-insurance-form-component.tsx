"use client";

import { Button, TextField } from "@mui/material";
import { useEffect } from "react";
import { Dayjs } from "dayjs";
import { Controller, useWatch } from "react-hook-form";

import InsuranceCompanyInput from "@/app/_components/insurance-company-input";
import DescriptionInput from "@/app/_components/description-input";
import DatePickerComponent from "@/app/_components/date-picker-component";

import { ThirdPartyInsuranceFormType } from "../_schemas/third-party-insurance-form-schema";

import { ThirdPartyInsuranceFormProps } from "../_types/third-party-insurance-form-props";

import useThirdPartyInsuranceForm from "../_hooks/use-third-party-insurance-form";
import useAddThirdPartyInsuranceEndpoint from "../_hooks/use-add-third-party-insurance-endpoint";

import { THIRD_PARTY_INSURANCE_FORM_INITIAL } from "../_constants/third-party-insurance-form-initial";

import { useKarboomsStore } from "../../_providers/karbooms-store-provider";

export default function ThirdPartyInsuranceFormComponent({
  isOpen,
  onSuccess,
}: ThirdPartyInsuranceFormProps) {
  const karboomId = useKarboomsStore((state) => state.id);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useThirdPartyInsuranceForm();

  const { description, started_at } = useWatch({ control });

  const { mutate: createIncome, isPending: creatingIncome } =
    useAddThirdPartyInsuranceEndpoint();

  const submit = ({
    started_at,
    ended_at,
    ...other
  }: ThirdPartyInsuranceFormType) => {
    createIncome(
      {
        ...other,
        karboom_id: karboomId,
        started_at: started_at.toISOString().split("T")[0],
        ended_at: ended_at.toISOString().split("T")[0],
      },
      {
        onSuccess() {
          reset(THIRD_PARTY_INSURANCE_FORM_INITIAL);
          onSuccess();
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
      <Button type="submit" variant="contained" loading={creatingIncome}>
        ثبت
      </Button>
    </form>
  );
}
