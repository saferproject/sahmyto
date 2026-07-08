import { useEffect } from "react";
import { Controller, useWatch } from "react-hook-form";
import { Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

import useBodyInsuranceForm from "../_hooks/use-body-insurance-form";
import useAddBodyInsuranceEndpoint from "../_hooks/use-add-body-insurance-endpoint";

import { BodyInsuranceDrawerFormProps } from "../_types/body-insurance-drawer-form-props";

import { BodyInsuranceFormType } from "../_schemas/body-insurance-form-schema";

import { BODY_INSURANCE_FORM_INITIAL } from "../_constants/body-insurance-form-initial";

import DescriptionInput from "@/app/_components/description-input";
import InsuranceCompanyInput from "@/app/_components/insurance-company-input";

import { useKarboomsStore } from "../../_providers/karbooms-store-provider";

export default function BodyInsuranceFormComponent({
  isOpen,
  onSuccess,
}: BodyInsuranceDrawerFormProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useBodyInsuranceForm();

  const { description } = useWatch({
    control,
  });

  const karboomId = useKarboomsStore((state) => state.id);

  const {
    mutate: createBodyInsurance,
    isPending: creatingBodyInsurance,
    isSuccess: createdBodyInsuracne,
    isError: creatingBodyInsuranceFailed,
  } = useAddBodyInsuranceEndpoint();

  const submit = ({
    started_at,
    ended_at,
    ...other
  }: BodyInsuranceFormType) => {
    createBodyInsurance({
      ...other,
      karboomId,
      started_at: started_at.toISOString().split("T")[0],
      ended_at: ended_at.toISOString().split("T")[0],
    });
  };

  useEffect(() => {
    if (createdBodyInsuracne) {
      onSuccess();
      reset(BODY_INSURANCE_FORM_INITIAL);
    }
  }, [createdBodyInsuracne]);

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
        helperText={errors.description?.message ?? ""}
      />
      <Button type="submit" variant="contained" loading={creatingBodyInsurance}>
        ثبت
      </Button>
    </form>
  );
}
