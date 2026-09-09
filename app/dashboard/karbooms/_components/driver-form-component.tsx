"use client";

import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Book1 } from "iconsax-reactjs";
import { Controller, useWatch } from "react-hook-form";
import dayjs from "dayjs";
import { type ChangeEvent, useEffect, useState } from "react";

import { useKarboomsStore } from "../_providers/karbooms-store-provider";

import DescriptionInput from "@/app/_components/description-input";
import PriceInputComponent from "@/app/_components/price-input-component";
import DatePickerComponent from "@/app/_components/date-picker-component";

import useDriverForm from "../_hooks/use-driver-form";
import useAddDriver from "../_hooks/use-add-driver-endpoint";
import useEditDriver from "../_hooks/use-edit-driver-endpoint";

import { DriverFormType } from "../_schemas/driver-form-schema";

import { DriverFormProps } from "../_types/driver-form-props";

import parseNumber from "@/app/_utilities/parse-numbers";
import ApiError from "@/app/_errors/api-error";
import { getDriverFormInitial } from "../_constants/driver-form-initial";
import formatNumber from "@/app/_utilities/format-numbers";
import { formatGregorianDate } from "@/app/_utilities/format-dates";
import ContactListDrawerComponent from "./contact-list-drawer-component";

import ContactFormDrawerComponent from "../../contacts/_components/contact-drawer-component";
import useContactPhoneLookup, {
  type ContactIdentity,
} from "../_hooks/use-contact-phone-lookup";

export default function DriverFormComponent({
  formState,
  driver,
  onCancel,
  onSuccess,
}: DriverFormProps) {
  const [isContactListDrawerOpen, setContactListDrawerOpen] = useState(false);
  const [contactFormPhone, setContactFormPhone] = useState<string | null>(null);
  const lookupContact = useContactPhoneLookup();

  const {
    register,
    control,
    handleSubmit,
    reset: setValues,
    getValues,
    setError,
    setValue,
    formState: { errors },
  } = useDriverForm();

  const { description, fixed_amount, service_amount } = useWatch({
    control,
  });

  const karboomId = useKarboomsStore((state) => state.id);

  const { mutate: addDriver, isPending: addingDriver } = useAddDriver();
  const { mutate: editDriver, isPending: editingDriver } = useEditDriver();

  useEffect(() => {
    const initialValues = getDriverFormInitial();

    if (formState === "EDIT" && driver) {
      setValues({
        ...initialValues,
        phone: driver.phone,
        first_name: driver.first_name,
        last_name: driver.last_name,
        started_at: dayjs(driver.started_at),
        ended_at: driver.ended_at ? dayjs(driver.ended_at) : null,
        fixed_amount: formatNumber(driver.fixed_amount),
        service_amount: formatNumber(driver.service_amount),
        percentage_amount: driver.percentage_amount,
        description: driver.description,
        payment_type: driver.payment_type,
      });
    } else setValues(initialValues);
  }, [formState, driver, setValues]);

  const handleCancel = () => {
    setValues(getDriverFormInitial());
    onCancel();
  };

  const handleOpenContactsDrawer = () => {
    setContactListDrawerOpen(true);
  };

  const handleCloseContactsDrawer = () => {
    setContactListDrawerOpen(false);
  };

  const handleContactSelect = (contact: ContactIdentity) => {
    setValue("phone", contact.phone, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("first_name", contact.first_name, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setValue("last_name", contact.last_name, {
      shouldDirty: true,
      shouldValidate: true,
    });
    handleCloseContactsDrawer();
  };

  const handleCloseContactForm = () => {
    setContactFormPhone(null);
  };

  const handleContactCreated = (contact: ContactIdentity) => {
    handleContactSelect(contact);
    handleCloseContactForm();
  };

  const handlePhoneChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const phone = event.target.value;
    setValue("phone", phone, { shouldDirty: true });
    setValue("first_name", "");
    setValue("last_name", "");

    if (phone.length !== 11) return;

    const contact = await lookupContact(phone);
    if (getValues("phone") !== phone) return;

    if (contact) handleContactSelect(contact);
    else if (contact === null) setContactFormPhone(phone);
  };

  const handleMutationSuccess = () => {
    setValues(getDriverFormInitial());
    onSuccess();
  };

  const handleMutationError = (error: Error) => {
    if (error instanceof ApiError && error.errors)
      Object.entries(error.errors).forEach(([field, errors]) =>
        setError(field as keyof DriverFormType, {
          message: errors[0],
          type: "validate",
        }),
      );
  };

  const submit = ({
    started_at,
    ended_at,
    fixed_amount,
    service_amount,
    ...other
  }: DriverFormType) => {
    const payload = {
      ...other,
      service_amount: parseNumber(service_amount),
      fixed_amount: parseNumber(fixed_amount),
      started_at: formatGregorianDate(started_at),
      ended_at: ended_at ? formatGregorianDate(ended_at) : "",
    };

    if (formState === "EDIT" && driver) {
      editDriver(
        { ...payload, driver_id: driver.id },
        {
          onSuccess: handleMutationSuccess,
          onError: handleMutationError,
        },
      );
      return;
    }

    addDriver(
      { ...payload, karboom_id: karboomId },
      {
        onSuccess: handleMutationSuccess,
        onError: handleMutationError,
      },
    );
  };

  return (
    <>
      {contactFormPhone !== null && (
        <ContactFormDrawerComponent
          formState="ADD"
          initialPhone={contactFormPhone}
          isOpen
          onOpen={() => setContactFormPhone(contactFormPhone)}
          onClose={handleCloseContactForm}
          onSuccess={handleContactCreated}
        />
      )}
      <ContactListDrawerComponent
        isOpen={isContactListDrawerOpen}
        onOpen={handleOpenContactsDrawer}
        onClose={handleCloseContactsDrawer}
        onSelect={handleContactSelect}
      />
      <form
        className="flex w-full flex-col gap-4"
        onSubmit={handleSubmit(submit)}
      >
        <Controller
          name="phone"
          control={control}
          render={({ field: { ref, ...field } }) => (
            <TextField
              {...field}
              inputRef={ref}
              onChange={handlePhoneChange}
              type="tel"
              inputMode="tel"
              label="شماره تماس"
              error={!!errors.phone}
              helperText={errors.phone?.message ?? ""}
              slotProps={{
                input: {
                  endAdornment: (
                    <IconButton>
                      <Book1
                        size={24}
                        className="text-primary rotate-y-180"
                        onClick={handleOpenContactsDrawer}
                      />
                    </IconButton>
                  ),
                },
                htmlInput: {
                  maxLength: 11,
                },
              }}
              required
            />
          )}
        />
        <div className="flex items-center gap-4">
          <Controller
            name="first_name"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <TextField
                {...field}
                inputRef={ref}
                label="نام"
                error={!!errors.first_name}
                helperText={errors.first_name?.message ?? ""}
                fullWidth
                required
                disabled
              />
            )}
          />
          <Controller
            name="last_name"
            control={control}
            render={({ field: { ref, ...field } }) => (
              <TextField
                {...field}
                inputRef={ref}
                label="نام خانوادگی"
                error={!!errors.last_name}
                helperText={errors.last_name?.message ?? ""}
                fullWidth
                required
                disabled
              />
            )}
          />
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
              disablePast
            />
          )}
        />
        <Controller
          name="payment_type"
          control={control}
          render={({ field }) => (
            <FormControl error={!!errors.payment_type} required>
              <FormLabel
                sx={{
                  fontSize: "14px",
                }}
              >
                دستمزد این راننده در چه بازه زمانی پرداخت می شود؟
              </FormLabel>
              <RadioGroup
                {...field}
                onChange={(event) => field.onChange(event.target.value)}
                sx={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: "8px",
                  paddingTop: 0,
                }}
              >
                <FormControlLabel
                  value={"monthly"}
                  label="به صورت ماهانه"
                  control={<Radio />}
                />
                <FormControlLabel
                  value={"daily"}
                  label="به صورت روزانه"
                  control={<Radio />}
                />
              </RadioGroup>
              {errors.payment_type && (
                <FormHelperText>{errors.payment_type.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />
        <PriceInputComponent
          register={register("fixed_amount")}
          value={fixed_amount}
          label="دستمزد ثابت"
          error={!!errors.fixed_amount}
          helperText={errors.fixed_amount?.message ?? ""}
        />
        <PriceInputComponent
          register={register("service_amount")}
          value={service_amount}
          label="دستمزد سرویسی"
          error={!!errors.service_amount}
          helperText={errors.service_amount?.message ?? ""}
        />
        <TextField
          {...register("percentage_amount", { valueAsNumber: true })}
          type="number"
          label="دستمزد درصدی"
          error={!!errors.percentage_amount}
          helperText={errors.percentage_amount?.message ?? ""}
          slotProps={{
            htmlInput: {
              min: 0,
              max: 100,
            },
            input: {
              endAdornment: (
                <span className="text-body text-lg font-bold">%</span>
              ),
            },
          }}
        />
        <DescriptionInput
          register={register("description")}
          currentlength={description?.length ?? 0}
          error={!!errors.description}
          helperText={errors.description?.message ?? ""}
        />
        <div className="flex items-center gap-4">
          <Button
            variant="outlined"
            color="primary"
            type="button"
            onClick={handleCancel}
            fullWidth
          >
            انصراف
          </Button>
          <Button
            variant="contained"
            type="submit"
            loading={addingDriver || editingDriver}
            fullWidth
          >
            ثبت
          </Button>
        </div>
      </form>
    </>
  );
}
