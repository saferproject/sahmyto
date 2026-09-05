"use client";

import { Button, IconButton, TextField } from "@mui/material";
import { InfoCircle, Book1 } from "iconsax-reactjs";
import { Controller, useWatch } from "react-hook-form";
import { type ChangeEvent, useEffect, useRef, useState } from "react";

import usePartnerForm from "../_hooks/use-partner-form";
import useAddPartner from "../_hooks/use-add-partner-endpoint";
import useEditPartner from "../_hooks/use-edit-partner-endpoint";

import DescriptionInput from "@/app/_components/description-input";
import DatePickerComponent from "@/app/_components/date-picker-component";

import { PartnerFormType } from "../_schemas/partner-form-schema";

import { useKarboomsStore } from "../_providers/karbooms-store-provider";

import { PartnerFormProps } from "../_types/partner-form-props";

import { getPartnerFormInitial } from "../_constants/partner-form-initial";
import ApiError from "@/app/_errors/api-error";
import { formatGregorianDate } from "@/app/_utilities/format-dates";
import ContactListDrawerComponent from "./contact-list-drawer-component";

import ContactFormDrawerComponent from "../../contacts/_components/contact-drawer-component";
import useContactPhoneLookup, {
  type ContactIdentity,
} from "../_hooks/use-contact-phone-lookup";

export default function PartnerFormComponent({
  formState,
  partner,
  onCancel,
  onSuccess,
}: PartnerFormProps) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [isContactListDrawerOpen, setContactListDrawerOpen] = useState(false);
  const [contactFormPhone, setContactFormPhone] = useState<string | null>(null);
  const lookupContact = useContactPhoneLookup();

  const {
    register,
    control,
    setValue,
    handleSubmit,
    setError,
    reset: setValues,
    getValues,
    watch,
    formState: { errors },
  } = usePartnerForm();

  const { share_capital, share_decimal, description } = useWatch({ control });

  const karboom_id = useKarboomsStore((state) => state.id);

  const { mutate: addPartner } = useAddPartner();
  const { mutate: editPartner } = useEditPartner();

  useEffect(() => {
    const initialValues = getPartnerFormInitial();

    if (formState === "EDIT" && partner) {
      const [shareCapital, shareDecimal = "0"] = partner.share
        .toString()
        .split(".");

      setValues({
        ...initialValues,
        phone: partner.phone,
        first_name: partner.first_name,
        last_name: partner.last_name,
        share_capital: Number(shareCapital),
        share_decimal: Number(shareDecimal),
        description: partner.description,
      });
    } else setValues(initialValues);
  }, [formState, partner, setValues]);

  const handleIncrementCapital = () => {
    if (watch("share_capital") !== undefined) {
      if (watch("share_capital") < 5)
        setValue("share_capital", watch("share_capital") + 1);
      else if (watch("share_capital") === 5) {
        setValue("share_capital", 6);
        setValue("share_decimal", 0);
      } else if (watch("share_capital") === 6) {
        setValue("share_capital", 1);
        setValue("share_decimal", 0);
      }
    }
  };

  const handleDecrementCapital = () => {
    if (watch("share_capital") !== undefined) {
      if (watch("share_capital") >= 1)
        setValue("share_capital", watch("share_capital") - 1);
      else if (watch("share_capital") === 0) {
        setValue("share_capital", 6);
        setValue("share_decimal", 0);
      }
    }
  };

  const handleIncrementDecimal = () => {
    if (
      watch("share_decimal") !== undefined &&
      watch("share_capital") !== undefined &&
      watch("share_capital") < 6
    ) {
      if (watch("share_decimal") < 99)
        setValue("share_decimal", watch("share_decimal") + 1);
      else if (
        watch("share_capital") !== undefined &&
        watch("share_capital") <= 5
      ) {
        setValue("share_decimal", 0);
        setValue("share_capital", watch("share_capital") + 1);
      }
    }
  };

  const handleRapidIncrementDecimal = () => {
    if (!timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        if (!intervalRef.current)
          intervalRef.current = setInterval(() => {
            handleIncrementDecimal();
          }, 50);
      }, 200);
  };

  const handleStopRapidIncrementDecimal = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleDecrementDecimal = () => {
    if (
      watch("share_decimal") !== undefined &&
      watch("share_capital") !== undefined &&
      watch("share_capital") >= 0
    ) {
      if (watch("share_decimal") > 1)
        setValue("share_decimal", watch("share_decimal") - 1);
      else if (
        watch("share_capital") !== undefined &&
        watch("share_capital") >= 1
      ) {
        setValue("share_decimal", 99);
        setValue("share_capital", watch("share_capital") - 1);
      }
    }
  };

  const handleRapidDecrementDecimal = () => {
    if (!timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
        if (!intervalRef.current)
          intervalRef.current = setInterval(() => {
            handleDecrementDecimal();
          }, 50);
      }, 200);
  };

  const handleStopRapidDecrementDecimal = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleCancel = () => {
    setValues(getPartnerFormInitial());
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
    setValues(getPartnerFormInitial());
    onSuccess();
  };

  const handleMutationError = (error: Error) => {
    if (error instanceof ApiError && error.errors)
      Object.entries(error.errors).forEach(([field, errors]) =>
        setError(field as keyof PartnerFormType, {
          message: errors[0],
          type: "validate",
        }),
      );
  };

  const submit = ({
    started_at,
    ended_at,
    share_capital,
    share_decimal,
    ...other
  }: PartnerFormType) => {
    const share = Number(`${share_capital}.${share_decimal}`);

    const payload = {
      ...other,
      share,
      started_at: formatGregorianDate(started_at),
      ended_at: ended_at ? formatGregorianDate(ended_at) : "",
    };

    if (formState === "EDIT" && partner) {
      editPartner(
        { ...payload, partner_id: partner.id },
        {
          onSuccess: handleMutationSuccess,
          onError: handleMutationError,
        },
      );
      return;
    }

    addPartner(
      { ...payload, karboom_id },
      {
        onSuccess: handleMutationSuccess,
        onError: handleMutationError,
      },
    );
  };

  const handlePreventContextMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
        <div className="border-secondary-light flex w-full items-center justify-between rounded-2xl border p-4">
          <span className="text-body">مقدار سهم</span>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              className="bg-secondary text-body flex h-5 w-8 items-center justify-center rounded select-none"
              onClick={handleIncrementDecimal}
              onTouchStart={handleRapidIncrementDecimal}
              onTouchEnd={handleStopRapidIncrementDecimal}
              onMouseDown={handleRapidIncrementDecimal}
              onMouseUp={handleStopRapidIncrementDecimal}
              onContextMenu={handlePreventContextMenu}
            >
              +
            </button>
            <button
              type="button"
              className="bg-secondary text-body flex h-5 w-8 items-center justify-center rounded select-none"
              onClick={handleDecrementDecimal}
              onTouchStart={handleRapidDecrementDecimal}
              onTouchEnd={handleStopRapidDecrementDecimal}
              onMouseDown={handleRapidDecrementDecimal}
              onMouseUp={handleStopRapidDecrementDecimal}
              onContextMenu={handlePreventContextMenu}
            >
              -
            </button>
          </div>
          <div className="relative">
            <p
              id="share-decimal"
              className="text-body absolute -right-4 bottom-0 w-8 text-center"
            >
              {share_decimal}
            </p>
            <span className="text-body text-5xl font-extralight">/</span>
            <p
              id="share-capital"
              className="text-primary absolute -top-2 -left-4 w-8 text-center text-2xl"
            >
              {share_capital}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              className="bg-primary flex h-5 w-8 items-center justify-center rounded text-white"
              onClick={handleIncrementCapital}
              onContextMenu={handlePreventContextMenu}
            >
              +
            </button>
            <button
              type="button"
              className="bg-primary flex h-5 w-8 items-center justify-center rounded text-white"
              onClick={handleDecrementCapital}
              onContextMenu={handlePreventContextMenu}
            >
              -
            </button>
          </div>
          <span className="text-body-light text-sm">دانگ</span>
        </div>
        <div className="flex items-center gap-2">
          <InfoCircle variant="Broken" size={20} className="text-body-light" />
          <p className="text-body-light text-xs">
            مقدار سهم همان دانگ است که می‌تواند عددی اعشار باشد
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
              disablePast
            />
          )}
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
          <Button variant="contained" type="submit" fullWidth>
            ثبت
          </Button>
        </div>
      </form>
    </>
  );
}
