"use client";

import { Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import useThirdPartyInsuranceForm from "../_hooks/use-third-party-insurance-form";
import InsuranceCompanyInput from "@/app/_components/insurance-company-input";
import DescriptionInput from "@/app/_components/description-input";
import { Controller, useWatch } from "react-hook-form";
import { ThirdPartyInsuranceFormType } from "../_schemas/third-party-insurance-form-schema";
import useAddThirdPartyInsurance from "../_hooks/use-add-third-party-insurance-endpoint";
import { useKarboomsStore } from "../../_providers/karbooms-store-provider";

export default function ThirdPartyInsuranceFormComponent() {
  const { register, control, handleSubmit, formState: {errors} } = useThirdPartyInsuranceForm();

  const karboomId = useKarboomsStore((state) => state.id);

  const { description } = useWatch({ control });

  const { mutate } = useAddThirdPartyInsurance();

  const submit = ({
    started_at,
    ended_at,
    ...other
  }: ThirdPartyInsuranceFormType) => {
    mutate({
      ...other,
      karboom_id: karboomId,
      started_at: started_at.toISOString().split("T")[0],
      ended_at: ended_at.toISOString().split("T")[0],
    });
  };

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
      {
        //@ts-ignore
        <InsuranceCompanyInput control={control} />
      }
      <TextField
        {...register("insurance_code")}
        label="کد یکتای بیمه"
        error={!!errors.insurance_code}
        helperText={errors.insurance_code?.message ?? ""}
      />
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
              slotProps={{
                textField: {
                  error: !!errors.started_at,
                  helperText: errors.started_at?.message ?? "",
                },
              }}
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
              slotProps={{
                textField: {
                  error: !!errors.ended_at,
                  helperText: errors.ended_at?.message ?? "",
                },
              }}
            />
          )}
        />
      </div>
      <DescriptionInput
        register={register("description")}
        currentlength={description?.length ?? 0}
        error={!!errors.description}
        helperText={errors.description?.message ?? ''}
      />
      <Button type="submit" variant="contained">
        ثبت
      </Button>
    </form>
  );
}
