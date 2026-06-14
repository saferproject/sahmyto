import Image from "next/image";

import { Controller, useWatch } from "react-hook-form";
import { useKarboomsStore } from "../_providers/karbooms-store-provider";
import { IncomeFormType } from "../_schemas/income-form-schema";
import { Autocomplete, Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import DescriptionInput from "@/app/_components/description-input";
import useIncomeForm from "../_hooks/use-income-form";
import { IncomeDrawerFormProps } from "../_types/income-drawer-form-props";
import { IncomeTypes } from "../_types/income-categories";
import { InfoCircle } from "iconsax-reactjs";
import useGetMembersEndpoint from "../_hooks/use-get-members-endpoint";
import { Member } from "../_types/member";

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
    formState: { errors },
  } = useIncomeForm();

  const { description } = useWatch({ control });

  const selectedKarboomId = useKarboomsStore((state) => state.id);

  const { data: members, isLoading: gettingMembers } = useGetMembersEndpoint(
    karboomId,
    isOpen && karboomId == selectedKarboomId,
  );

  const submit = (data: IncomeFormType) => {
    onSubmit(data);
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
        rules={{ required: true }}
        render={({ field }) => (
          <Autocomplete<Member>
            {...field}
            loading={gettingMembers}
            options={members?.data ?? []}
            onChange={(_event, value) => field.onChange(value)}
            filterOptions={(option, { inputValue }) =>
              option.filter(({ user: { full_name } }) =>
                full_name.includes(inputValue),
              )
            }
            getOptionLabel={(option) => option.user.full_name}
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
            error={!!errors.unit_price}
            helperText={errors.unit_price?.message ?? ""}
            slotProps={{
              input: {
                endAdornment: (
                  <p className="text-body font-semibold">
                    {quantityInputSettings[incomeType].endAdonrment}
                  </p>
                ),
              },
            }}
            fullWidth
          />
          <TextField
            {...register("unit_price", { valueAsNumber: true })}
            label={unitPriceSettings[incomeType].label}
            error={!!errors.unit_price}
            helperText={errors.unit_price?.message ?? ""}
            slotProps={{
              input: {
                endAdornment: (
                  <Image
                    src="/images/toman-secondary.webp"
                    alt="تومان"
                    width={24}
                    height={24}
                  />
                ),
              },
            }}
            fullWidth
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
