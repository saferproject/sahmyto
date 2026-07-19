"use client";

import Image from "next/image";

import { Autocomplete, Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Controller, useWatch } from "react-hook-form";

import useExpenseForm from "../_hooks/use-expense-form";
import useGetMembersEndpoint from "../_hooks/use-get-members-endpoint";

import { ExpenseDrawerFormProps } from "../_types/expense-drawer-form-props";
import { Member } from "../_types/member";

import DescriptionInput from "@/app/_components/description-input";

import { ExpenseFormType } from "../_schemas/expense-form-schema";

import { useKarboomsStore } from "../_providers/karbooms-store-provider";

import { EXPENSE_FORM_INITIAL } from "../_constants/expense-form-initial";

import PriceInputComponent from "@/app/_components/price-input-component";

export default function ExpenseDrawerFormComponent({
  isOpen,
  karboomId,
  expenseFormRef,
  categoryType,
  onSubmit,
}: ExpenseDrawerFormProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useExpenseForm();

  const { description, unit_price, wage_cost } = useWatch({ control });

  const selectedKarboomId = useKarboomsStore((state) => state.id);

  const { data: members, isLoading: gettingMembers } = useGetMembersEndpoint(
    karboomId,
    isOpen && selectedKarboomId === karboomId,
  );

  const submit = (data: ExpenseFormType) => {
    onSubmit(data);
    reset(EXPENSE_FORM_INITIAL);
  };

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
        name="receiver"
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
                error={!!errors.receiver}
                helperText={errors.receiver?.message ?? ""}
                fullWidth
                required
              />
            )}
            fullWidth
          />
        )}
      />
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
          <DatePicker
            {...field}
            onChange={(value) => field.onChange(value)}
            label="تاریخ"
            format="YYYY/MM/DD"
            views={["year", "month", "day"]}
            slotProps={{
              textField: {
                error: !!errors.date,
                helperText: errors.date?.message ?? "",
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
        ثبت هزینه
      </Button>
    </form>
  );
}
