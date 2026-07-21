"use client";

import { useWatch } from "react-hook-form";
import { Button } from "@mui/material";

import { useFinancialMonthStore } from "../../_providers/financial-managment-store-provider";

import useDriverTipForm from "../_hooks/use-driver-tip-form";
import useGetDriversSalaryEndpoint from "../_hooks/use-get-drivers-salaries-endpoint";

import { DriverTipFormProps } from "../_types/driver-tip-form-props";
import useAddBonusPenaltyDriverEndpoint from "../_hooks/use-add-bonus-penalty-driver-endpoint";
import { DriverTipFormType } from "../_schemas/driver-tip-form-schema";
import { DRIVER_TIP_FORM_DEFAULTS } from "../_constants/driver-tip-form-defaults";
import BaseResponse from "@/app/_interfaces/base-response";
import { BONUS_PENALTY_TYPE_FA } from "../_constants/bonus-penalty-type-fa";
import DescriptionInput from "@/app/_components/description-input";
import PriceInputComponent from "@/app/_components/price-input-component";
import parseNumber from "@/app/_utilities/parse-numbers";

export default function DriverTipFormComponent({
  type,
  driverId,
  onSuccess,
}: DriverTipFormProps) {
  const {
    register,
    control,
    handleSubmit,
    setError,
    setValues,
    formState: { errors },
  } = useDriverTipForm();

  const { description, amount } = useWatch({
    control,
  });

  const financialMonthId = useFinancialMonthStore((state) => state.id);

  const {
    mutate: addBonusPenalty,
    isPending: addingBonusPenalty,
    isSuccess: addedBonusPenalty,
    isError: adddingBonusPenaltyFailed,
  } = useAddBonusPenaltyDriverEndpoint();

  const submit = ({ amount, ...other }: DriverTipFormType) => {
    addBonusPenalty(
      {
        financialMonthId,
        driverId,
        type,
        amount: parseNumber(amount),
        ...other,
      },
      {
        onSuccess() {
          onSuccess();
          setValues(DRIVER_TIP_FORM_DEFAULTS);
        },
        onError(error) {
          const err = error as unknown as BaseResponse;

          if (err.errors)
            Object.entries(err.errors).forEach(([field, errors]) =>
              setError(field as keyof DriverTipFormType, {
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
      className="flex w-full flex-col items-center gap-4"
      onSubmit={handleSubmit(submit)}
    >
      <PriceInputComponent
        register={register("amount")}
        value={amount}
        error={!!errors.amount}
        helperText={errors.amount?.message ?? ""}
        label="مقدار"
        required
      />
      <DescriptionInput
        register={register("description")}
        currentlength={description?.length ?? 0}
        error={!!errors.description}
        helperText={errors.description?.message ?? ""}
      />
      <Button
        type="submit"
        variant="contained"
        size="large"
        loading={addingBonusPenalty}
        fullWidth
      >
        ثبت {BONUS_PENALTY_TYPE_FA[type]}
      </Button>
    </form>
  );
}
