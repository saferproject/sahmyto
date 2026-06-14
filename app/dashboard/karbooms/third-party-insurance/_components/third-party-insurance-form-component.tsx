"use client";

import { Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import useThirdPartyInsuranceForm from "../_hooks/use-third-party-insurance-form";
import InsuranceCompanyInput from "@/app/_components/insurance-company-input";
import DescriptionInput from "@/app/_components/description-input";
import { Controller, useWatch } from "react-hook-form";
import { ThirdPartyInsuranceFormType } from "../_schemas/third-party-insurance-form-schema";
import useAddThirdPartyInsurance from "../_hooks/use-add-third-party-insurance-endpoint";

export default function ThirdPartyInsuranceFormComponent() {
  const { register, control, handleSubmit, formState: {errors} } = useThirdPartyInsuranceForm();

  const { description } = useWatch({ control });

  const { mutate } = useAddThirdPartyInsurance();

  const submit = ({
    started_at,
    ended_at,
    ...other
  }: ThirdPartyInsuranceFormType) => {
    mutate({
      ...other,
      karboom_id: 2,
      started_at: started_at.toISOString().split("T")[0],
      ended_at: ended_at.toISOString().split("T")[0],
    });
  };

  return (
    <form
      className="flex w-full flex-col gap-4"
      onSubmit={handleSubmit(submit)}
    >
      <TextField {...register("insurance_number")} label="شماره بیمه" />
      {
        //@ts-ignore
        <InsuranceCompanyInput control={control} />
      }
      <TextField {...register("insurance_code")} label="کد یکتای بیمه" />
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
      <DescriptionInput
        register={register}
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
