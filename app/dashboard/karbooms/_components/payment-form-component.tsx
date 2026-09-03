import usePaymentForm from "../_hooks/use-payment-form";
import { Controller, useWatch } from "react-hook-form";
import PriceInputComponent from "@/app/_components/price-input-component";
import DatePickerComponent from "@/app/_components/date-picker-component";
import DescriptionInput from "@/app/_components/description-input";
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect } from "react";
import useGetMembersEndpoint from "../_hooks/use-get-members-endpoint";
import { useUserInfoStore } from "@/app/_providers/user-info-provider";
import { useKarboomsStore } from "../_providers/karbooms-store-provider";
import { PaymentFormProps } from "../_types/payment-form-props";
import useAddPaymentEndpoint from "../_hooks/use-add-payment-endpoint";
import { PaymentFormType } from "../_schemas/payment-form-schema";
import parseNumber from "@/app/_utilities/parse-numbers";
import { PAYMENT_FORM_INITIAL } from "../_constants/payment-form-initial";
import ApiError from "@/app/_errors/api-error";
import { formatGregorianDate } from "@/app/_utilities/format-dates";
import { PAYMENT_TYPES_FA } from "../payments-list/_constants/payment-types-fa";

export default function PaymentFormComponent({
  isOpen,
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

  const { description, total_price, payer } = useWatch({ control });

  const userId = useUserInfoStore((state) => state.id);
  const karboomId = useKarboomsStore((state) => state.id);

  const {
    data: members,
    isLoading: gettingMembers,
    isSuccess: gotMembers,
  } = useGetMembersEndpoint(karboomId, isOpen && !!karboomId);

  const { mutate: createExpense, isPending: creatingExpense } =
    useAddPaymentEndpoint();

  const handleMutationError = (error: Error) => {
    if (error instanceof ApiError && error.errors)
      Object.entries(error.errors).forEach(([field, errors]) =>
        setError(field as keyof PaymentFormType, {
          message: errors[0],
          type: "validate",
        }),
      );
  };

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
        receiver_id: reciever.member.id,
        karboomId: karboomId,
        date: formatGregorianDate(date),
      },
      {
        onSuccess() {
          onSuccess();
          setValues(PAYMENT_FORM_INITIAL);
        },
        onError: handleMutationError,
      },
    );
  };

  useEffect(() => {
    if (gotMembers && !payer?.member?.id) {
      const currentMember = members.data?.find(
        (member) => member.user.id === userId,
      );

      if (currentMember) setValue("payer", currentMember);
    }
  }, [gotMembers, members, payer, setValue, userId]);

  return (
    <form
      className="flex w-full flex-col items-center gap-4"
      onSubmit={handleSubmit(submit)}
    >
      <Controller
        control={control}
        name="payer"
        rules={{ required: true }}
        render={({ field }) => (
          <FormControl error={!!errors.payer} fullWidth required>
            <InputLabel id="payment-payer-label">پرداخت کننده</InputLabel>
            <Select
              name={field.name}
              labelId="payment-payer-label"
              id="payment-payer"
              label="پرداخت کننده"
              value={field.value?.member.id || ""}
              onChange={(event) =>
                field.onChange(
                  members?.data?.find(
                    ({ member }) => member.id === Number(event.target.value),
                  ),
                )
              }
              onBlur={field.onBlur}
              inputRef={field.ref}
              disabled={gettingMembers}
            >
              {members?.data?.map(({ member, user }) => (
                <MenuItem key={member.id} value={member.id}>
                  {user.full_name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.payer?.message ?? ""}</FormHelperText>
          </FormControl>
        )}
      />
      <Controller
        control={control}
        name="reciever"
        rules={{ required: true }}
        render={({ field }) => (
          <FormControl error={!!errors.reciever} fullWidth required>
            <InputLabel id="payment-receiver-label">دریافت کننده</InputLabel>
            <Select
              name={field.name}
              labelId="payment-receiver-label"
              id="payment-receiver"
              label="دریافت کننده"
              value={field.value?.member.id || ""}
              onChange={(event) =>
                field.onChange(
                  members?.data?.find(
                    ({ member }) => member.id === Number(event.target.value),
                  ),
                )
              }
              onBlur={field.onBlur}
              inputRef={field.ref}
              disabled={gettingMembers}
            >
              {members?.data?.map(({ member, user }) => (
                <MenuItem key={member.id} value={member.id}>
                  {user.full_name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{errors.reciever?.message ?? ""}</FormHelperText>
          </FormControl>
        )}
      />
      <Controller
        control={control}
        name="type"
        render={({ field }) => (
          <FormControl fullWidth>
            <InputLabel id="insurance-company-id-label">روش انتقال</InputLabel>
            <Select
              {...field}
              labelId="insurance-company-id-label"
              id="insurance-company-id"
              label="شرکت بیمه"
            >
              <MenuItem value={0} disabled>
                انتخاب کنید
              </MenuItem>
              {Object.entries(PAYMENT_TYPES_FA).map(([type, title]) => (
                <MenuItem key={type} value={type}>
                  {title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
        ثبت دریافتی یا پرداختی
      </Button>
    </form>
  );
}
