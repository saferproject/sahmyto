import usePaymentForm from "../_hooks/use-payment-form";
import { Controller, useWatch } from "react-hook-form";
import PriceInputComponent from "@/app/_components/price-input-component";
import { DatePicker } from "@mui/x-date-pickers";
import DescriptionInput from "@/app/_components/description-input";
import { Autocomplete, Button, TextField } from "@mui/material";
import { Member } from "../_types/member";
import { useEffect } from "react";
import useGetMembersEndpoint from "../_hooks/use-get-members-endpoint";
import { useUserInfoStore } from "@/app/_providers/user-info-provider";
import { useKarboomsStore } from "../_providers/karbooms-store-provider";
import { PaymentFormProps } from "../_types/payment-form-props";
import useAddPaymentEndpoint from "../_hooks/use-add-payment-endpoint";
import { PaymentFormType } from "../_schemas/payment-form-schema";
import parseNumber from "@/app/_utilities/parse-numbers";
import { PAYMENT_FORM_INITIAL } from "../_constants/payment-form-initial";
import BaseResponse from "@/app/_interfaces/base-response";

export default function PaymentFormComponent({
  isOpen,
  karboomId,
  onSuccess,
}: PaymentFormProps) {

  const {
    register,
    control,
    handleSubmit,
    setError,
    setValue,
    setValues,
    formState: { errors },
  } = usePaymentForm();

  const { description, total_price } = useWatch({ control });

  const userId = useUserInfoStore((state) => state.id);
  const selectedKarboomId = useKarboomsStore((state) => state.id);

  const {
    data: members,
    isLoading: gettingMembers,
    isSuccess: gotMembers,
  } = useGetMembersEndpoint(
    karboomId,
    isOpen && selectedKarboomId === karboomId,
  );

  const {
    mutate: createExpense,
    isPending: creatingExpense,
    isSuccess: createdExpense,
    isError: creatingExpenseFailed,
  } = useAddPaymentEndpoint();

  const submit = ({
    payer,
    reciever,
    date,
    total_price,
    ...other
  }: PaymentFormType) => {
    createExpense(
      {
        ...other,
        total_price: parseNumber(total_price),
        payer_id: payer.member.id,
        reciever_id: reciever.member.id,
        karboomId: karboomId,
        date: date.toISOString().split("T")[0],
      },
      {
        onSuccess() {
          onSuccess();
          setValues(PAYMENT_FORM_INITIAL);
        },
        onError(error) {
          const err = error as unknown as BaseResponse;

          if (err.errors)
            Object.entries(err.errors).forEach(([field, errors]) =>
              setError(field as keyof PaymentFormType, {
                message: errors[0],
                type: "validate",
              }),
            );
        },
      },
    );
  };

  useEffect(() => {
    if (gotMembers) {
      const currentMember = members.data.find(
        (member) => member.user.id === userId,
      );

      if (currentMember) setValue("payer", currentMember);
    }
  }, [gotMembers, members]);

  return (
    <form
      className="flex w-full flex-col items-center gap-4"
      onSubmit={handleSubmit(submit)}
    >
      <p className="text-body relative overflow-visible text-xs">
        اطلاعات رسید دریافتی یا پرداختی را وارد کنید
      </p>
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
      <PriceInputComponent
        register={register("total_price")}
        value={total_price}
        label="مبلغ"
        error={!!errors.total_price}
        helperText={errors.total_price?.message ?? ""}
        required
      />
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
      <Button
        type="submit"
        variant="contained"
        size="large"
        loading={creatingExpense}
        fullWidth
      >
        ثبت دریافتی یا پرداختی
      </Button>
    </form>
  );
}
