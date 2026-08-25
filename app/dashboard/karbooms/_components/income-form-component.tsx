"use client";

import { Controller, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { InfoCircle } from "iconsax-reactjs";
import { Autocomplete, Button, TextField } from "@mui/material";

import { useKarboomsStore } from "../_providers/karbooms-store-provider";
import { IncomeFormType } from "../_schemas/income-form-schema";
import DescriptionInput from "@/app/_components/description-input";
import DatePickerComponent from "@/app/_components/date-picker-component";
import useIncomeForm from "../_hooks/use-income-form";
import { IncomeDrawerFormProps } from "../_types/income-drawer-form-props";
import { IncomeTypes } from "../_types/income-categories";
import useGetMembersEndpoint from "../_hooks/use-get-members-endpoint";
import { Member } from "../_types/member";
import { INCOME_FORM_INITIAL } from "../_constants/income-form-initial";
import formatNumber from "@/app/_utilities/format-numbers";
import PriceInputComponent from "@/app/_components/price-input-component";
import parseNumber from "@/app/_utilities/parse-numbers";
import ApiError from "@/app/_errors/api-error";
import useCreateIncomeEndpoint from "../_hooks/use-create-income-endpoint";
import { useUserInfoStore } from "@/app/_providers/user-info-provider";
import { formatGregorianDate } from "@/app/_utilities/format-dates";

export default function IncomeFormComponent({
  isOpen,
  karboomId,
  incomeType,
  onSuccess,
}: IncomeDrawerFormProps) {
  const {
    register,
    control,
    handleSubmit,
    setError,
    setValue,
    setValues,
    formState: { errors },
  } = useIncomeForm();

  const { description, quantity, unit_price, total_price } = useWatch({
    control,
  });

  const userId = useUserInfoStore((state) => state.id);
  const selectedKarboomId = useKarboomsStore((state) => state.id);

  const {
    data: members,
    isLoading: gettingMembers,
    isSuccess: gotMembers,
  } = useGetMembersEndpoint(
    karboomId,
    isOpen && karboomId === selectedKarboomId,
  );

  const { mutate: createIncome, isPending: creatingIncome } =
    useCreateIncomeEndpoint();

  const handleMutationError = (error: Error) => {
    if (error instanceof ApiError && error.errors)
      Object.entries(error.errors).forEach(([field, errors]) =>
        setError(field as keyof IncomeFormType, {
          message: errors[0],
          type: "validate",
        }),
      );
  };

  const submit = ({
    reciever,
    started_at,
    ended_at,
    image,
    unit_price,
    total_price,
    ...other
  }: IncomeFormType) => {
    void image;

    createIncome(
      {
        ...other,
        unit_price: parseNumber(unit_price) || 0,
        total_price: parseNumber(total_price) || 0,
        type: incomeType,
        receiver_id: reciever.member.id,
        karboom_id: karboomId,
        started_at: formatGregorianDate(started_at),
        ended_at: formatGregorianDate(ended_at),
      },
      {
        onSuccess() {
          onSuccess();
          setValues(INCOME_FORM_INITIAL);
        },
        onError: handleMutationError,
      },
    );
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
      label: "تعداد سرویس",
      endAdonrment: "سرویس",
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
  }, [quantity, setValue, unit_price]);

  useEffect(() => {
    if (gotMembers) {
      const currentMember = members.data.find(
        (member) => member.user.id === userId,
      );

      if (currentMember) setValue("reciever", currentMember);
    }
  }, [gotMembers, members, setValue, userId]);

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
            required
            disableFuture
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
            required
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
      <Button
        type="submit"
        variant="contained"
        size="large"
        loading={creatingIncome}
        fullWidth
      >
        ثبت درآمد
      </Button>
    </form>
  );
}
