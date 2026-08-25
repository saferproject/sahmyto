"use client";

import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { Controller, useWatch } from "react-hook-form";

import useExpenseForm from "../_hooks/use-expense-form";
import useGetMembersEndpoint from "../_hooks/use-get-members-endpoint";

import { ExpenseDrawerFormProps } from "../_types/expense-drawer-form-props";
import { Member } from "../_types/member";

import DescriptionInput from "@/app/_components/description-input";

import { ExpenseFormType } from "../_schemas/expense-form-schema";

import { useKarboomsStore } from "../_providers/karbooms-store-provider";

import PriceInputComponent from "@/app/_components/price-input-component";
import DatePickerComponent from "@/app/_components/date-picker-component";
import useCreateExpenseEndpoint from "../_hooks/use-create-expense-endpoint";
import parseNumber from "@/app/_utilities/parse-numbers";
import { EXPENSE_FORM_INITIAL } from "../_constants/expense-form-initial";
import ApiError from "@/app/_errors/api-error";
import { useEffect } from "react";
import { useUserInfoStore } from "@/app/_providers/user-info-provider";
import { formatGregorianDate } from "@/app/_utilities/format-dates";
import dayjs from "dayjs";

export default function ExpenseFormComponent({
  isOpen,
  karboomId,
  expenseFormRef,
  categoryType,
  selectedCategory,
  onSuccess,
}: ExpenseDrawerFormProps) {
  const { enqueueSnackbar } = useSnackbar();

  const {
    register,
    control,
    handleSubmit,
    setError,
    setValue,
    setValues,
    formState: { errors },
  } = useExpenseForm();

  const { description, unit_price, wage_cost, is_settled } = useWatch({
    control,
  });

  const userId = useUserInfoStore((state) => state.id);

  const {
    data: members,
    isLoading: gettingMembers,
    isSuccess: gotMembers,
  } = useGetMembersEndpoint(karboomId, isOpen);

  const { mutate: createExpense, isPending: creatingExpense } =
    useCreateExpenseEndpoint();

  const handleMutationError = (error: Error) => {
    if (error instanceof ApiError && error.errors)
      Object.entries(error.errors).forEach(([field, errors]) =>
        setError(field as keyof ExpenseFormType, {
          message: errors[0],
          type: "validate",
        }),
      );
  };

  const submit = ({
    settlement_date,
    payer,
    date,
    image,
    unit_price,
    wage_cost,
    ...other
  }: ExpenseFormType) => {
    void image;

    if (selectedCategory)
      createExpense(
        {
          ...other,
          unit_price: parseNumber(unit_price),
          wage_cost: parseNumber(wage_cost),
          payer_id: payer.member.id,
          category_id: selectedCategory,
          karboom_id: karboomId,
          settlement_date: settlement_date
            ? formatGregorianDate(settlement_date)
            : null,
          type: categoryType,
          date: formatGregorianDate(date),
        },
        {
          onSuccess() {
            onSuccess();
            setValues(EXPENSE_FORM_INITIAL);
          },
          onError: handleMutationError,
        },
      );
    else
      enqueueSnackbar({
        message: "دسته هزینه را انتخاب کنید",
        variant: "warning",
      });
  };

  useEffect(() => {
    if (is_settled) setValue("settlement_date", dayjs());
    else setValue("settlement_date", null);
  }, [is_settled, setValue]);

  useEffect(() => {
    if (gotMembers) {
      const currentMember = members.data.find(
        (member) => member.user.id === userId,
      );

      if (currentMember) setValue("payer", currentMember);
    }
  }, [gotMembers, members, setValue, userId]);

  return (
    <form
      ref={expenseFormRef}
      className="flex w-full flex-col items-center gap-4"
      onSubmit={handleSubmit(submit)}
    >
      <p className="text-body relative overflow-visible text-xs">
        اطلاعات رسید هزینه را وارد کنید
      </p>
      <Controller
        control={control}
        name="is_settled"
        render={({ field }) => (
          <FormControlLabel
            label="تسویه شده"
            control={
              <Checkbox
                {...field}
                checked={field.value}
                slotProps={{
                  input: { "aria-label": "controlled" },
                }}
              />
            }
            sx={{
              width: "100%",
              display: "flex",
            }}
          />
        )}
      />
      {is_settled && (
        <>
          <Controller
            control={control}
            name="settlement_date"
            render={({ field }) => (
              <DatePickerComponent
                {...field}
                onChange={(value) => field.onChange(value)}
                label="تاریخ تسویه"
                error={!!errors.settlement_date}
                helperText={errors.settlement_date?.message ?? ""}
                disableFuture
              />
            )}
          />
          <Controller
            control={control}
            name="payer"
            rules={{ required: true }}
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
                    label="پرداخت کننده"
                    error={!!errors.payer}
                    helperText={errors.payer?.message ?? ""}
                    fullWidth
                    required
                  />
                )}
                fullWidth
              />
            )}
          />
        </>
      )}
      <PriceInputComponent
        register={register("unit_price")}
        value={unit_price}
        label={categoryType === "daily" ? "مبلغ" : "قیمت قطعات"}
        error={!!errors.unit_price}
        helperText={errors.unit_price?.message ?? ""}
        required={categoryType === "daily"}
      />
      {categoryType === "repair" && (
        <PriceInputComponent
          register={register("wage_cost")}
          value={wage_cost}
          label="اجرت"
          error={!!errors.wage_cost}
          helperText={errors.wage_cost?.message ?? ""}
        />
      )}
      <Controller
        control={control}
        name="date"
        render={({ field }) => (
          <DatePickerComponent
            {...field}
            onChange={(value) => field.onChange(value)}
            label="تاریخ"
            error={!!errors.date}
            helperText={errors.date?.message ?? ""}
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
        loading={creatingExpense}
        fullWidth
      >
        ثبت هزینه
      </Button>
    </form>
  );
}
