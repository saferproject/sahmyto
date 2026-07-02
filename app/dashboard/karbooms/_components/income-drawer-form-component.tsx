"use client";

import { Controller, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { InfoCircle } from "iconsax-reactjs";
import { DatePicker } from "@mui/x-date-pickers";
import { Autocomplete, Button, TextField } from "@mui/material";

import { useKarboomsStore } from "../_providers/karbooms-store-provider";
import { IncomeFormType } from "../_schemas/income-form-schema";
import DescriptionInput from "@/app/_components/description-input";
import useIncomeForm from "../_hooks/use-income-form";
import { IncomeDrawerFormProps } from "../_types/income-drawer-form-props";
import { IncomeTypes } from "../_types/income-categories";
import useGetMembersEndpoint from "../_hooks/use-get-members-endpoint";
import { Member } from "../_types/member";
import { INCOME_FORM_INITIAL } from "../_constants/income-form-initial";
import formatNumber from "@/app/_utilities/format-numbers";
import PriceInputComponent from "@/app/_components/price-input-component";
import parseNumber from "@/app/_utilities/parse-numbers";

export default function IncomeDrawerFormComponent({
  isOpen,
  karboomId,
  incomeType = "daily",
  onSubmit,
}: IncomeDrawerFormProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useIncomeForm();

  const { description, quantity, unit_price, total_price } = useWatch({
    control,
  });

  const selectedKarboomId = useKarboomsStore((state) => state.id);

  const { data: members, isLoading: gettingMembers } = useGetMembersEndpoint(
    karboomId,
    isOpen && karboomId == selectedKarboomId,
  );

  const submit = (data: IncomeFormType) => {
    onSubmit(data);
    reset(INCOME_FORM_INITIAL);
  };

  const quantityInputSettings: Record<
    Exclude<IncomeTypes, "travel">,
    { label: string; endAdonrment: string }
  > = {
    hourly: {
      label: "تعداد ساعت کارکرده",
      endAdonrment: "ساعت",
    },
    daily: {
      label: "تعداد روز کارکرده",
      endAdonrment: "روز",
    },
    monthly: {
      label: "تعداد ماه کارکرده",
      endAdonrment: "ماه",
    },
    services: {
      label: "تعداد سفر",
      endAdonrment: "سفر",
    },
  };

  const unitPriceSettings: Record<
    Exclude<IncomeTypes, "travel">,
    { label: string }
  > = {
    hourly: {
      label: "مبلغ برای هر ساعت",
    },
    daily: {
      label: "مبلغ برای هر روز",
    },
    monthly: {
      label: "مبلغ برای هر ماه",
    },
    services: {
      label: "مبلغ برای هر سرویس",
    },
  };

  useEffect(() => {
    if (quantity && unit_price)
      setValue(
        "total_price",
        formatNumber(quantity * (parseNumber(unit_price) || 0)),
      );
  }, [quantity, unit_price]);

  return (
    <form
      className="flex w-full flex-col items-center gap-4"
      onSubmit={handleSubmit(submit)}
    >
      <p className="text-body relative overflow-visible text-xs">
        اطلاعات درآمد را وارد کنید
      </p>
      <Controller
        control={control}
        name="reciever"
        render={({ field }) => (
          <Autocomplete<Member>
            {...field}
            loading={gettingMembers}
            options={members?.data ?? []}
            onChange={(_event, value) => field.onChange(value)}
            filterOptions={(option, { inputValue }) =>
              option.filter(({ user: { full_name } }) =>
                full_name?.includes(inputValue),
              )
            }
            getOptionLabel={(option) => option.user.full_name ?? ""}
            getOptionKey={(option) => option.member.id}
            isOptionEqualToValue={(option, value) =>
              option.member.id === value?.member.id
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="دریافت کننده"
                error={!!errors.reciever}
                helperText={errors.reciever?.message ?? ""}
                fullWidth
                required
              />
            )}
            fullWidth
          />
        )}
      />
      {incomeType !== "travel" && (
        <>
          <TextField
            {...register("quantity", { valueAsNumber: true })}
            label={quantityInputSettings[incomeType].label}
            error={!!errors.quantity}
            helperText={errors.quantity?.message ?? ""}
            type="number"
            inputMode="numeric"
            slotProps={{
              input: {
                endAdornment: (
                  <p className="text-body font-semibold">
                    {quantityInputSettings[incomeType].endAdonrment}
                  </p>
                ),
              },
              htmlInput: {
                sx: { textAlign: "left" },
              },
            }}
            fullWidth
            required
          />
          <PriceInputComponent
            register={register("unit_price")}
            value={unit_price}
            error={!!errors.unit_price}
            helperText={errors.unit_price?.message ?? ""}
            label={unitPriceSettings[incomeType].label}
            required
          />
          <PriceInputComponent
            register={register("total_price")}
            value={total_price}
            label="کل درآمد"
            error={!!errors.total_price}
            helperText={errors.total_price?.message ?? ""}
            disabled
          />
          <div className="mt-2 flex w-full items-center gap-2">
            <InfoCircle size={16} className="text-secondary" />
            <p className="text-secondary text-xs">
              تاریخ شروع و پایان بر حسب روز کامل حساب می‌شود
            </p>
          </div>
        </>
      )}
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
                required: true,
              },
            }}
            disableFuture
          />
        )}
      />
      <DescriptionInput
        register={register("description")}
        currentlength={description?.length ?? 0}
        error={!!errors.description}
        helperText={errors.description?.message ?? ""}
      />
      <Button type="submit" variant="contained" size="large" fullWidth>
        ثبت درآمد
      </Button>
    </form>
  );
}
