"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";
import {
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  FormControl,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { ArrowDown2 } from "iconsax-reactjs";
import { Controller } from "react-hook-form";

import useProfileForm from "../_hooks/use-profile-form";
import useCompleteProfileEndpoint from "../_hooks/use-complete-profile-endpoint";

import { useUserInfoStore } from "@/app/_providers/user-info-provider";

import { ProfileFormType } from "../_schemas/profile-schema";
import DatePickerComponent from "@/app/_components/date-picker-component";
import { useShallow } from "zustand/react/shallow";
import ApiError from "@/app/_errors/api-error";

export default function ProfileFormComponent() {
  const [isOptionalFieldsVisible, setOptionalFieldsVisibility] =
    useState(false);

  const router = useRouter();

  const user = useUserInfoStore(
    useShallow(
      ({ phone, first_name, last_name, father_name, gender, email }) => ({
        phone,
        first_name,
        last_name,
        father_name,
        gender,
        email,
      }),
    ),
  );
  const setUser = useUserInfoStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useProfileForm({
    phone: user.phone,
    first_name: user.first_name,
    last_name: user.last_name,
    father_name: user.father_name,
    gender: user.gender,
    email: user.email,
    birthday: null,
  });

  const { mutate } = useCompleteProfileEndpoint();

  const handleMutationError = (error: Error) => {
    if (error instanceof ApiError && error.errors)
      Object.entries(error.errors).forEach(([field, errors]) =>
        setError(field as keyof ProfileFormType, {
          message: errors[0],
          type: "validate",
        }),
      );
  };

  const submit = (data: ProfileFormType) => {
    mutate(data, {
      onSuccess: (response) => {
        setUser(response.data);
        router.push("/dashboard");
      },
      onError: handleMutationError,
    });
  };

  const HandleToggleOptionalFieldsVisibility = () => {
    setOptionalFieldsVisibility((curValue) => !curValue);
  };

  return (
    <form
      className="mt-8 flex w-full flex-col gap-4 px-0.5"
      onSubmit={handleSubmit(submit)}
    >
      <TextField
        {...register("phone")}
        label="شماره همراه"
        slotProps={{
          inputLabel: { shrink: true },
        }}
        disabled
        error={!!errors.phone}
        helperText={errors.phone?.message ?? ""}
        required
        fullWidth
      />
      <div className="flex items-center gap-2">
        <TextField
          {...register("first_name")}
          label="نام"
          slotProps={{
            inputLabel: { shrink: true },
          }}
          required
          error={!!errors.first_name}
          helperText={errors.first_name?.message ?? ""}
          fullWidth
        />
        <TextField
          {...register("last_name")}
          label="نام خانوادگی"
          slotProps={{
            inputLabel: { shrink: true },
          }}
          required
          error={!!errors.last_name}
          helperText={errors.last_name?.message ?? ""}
          fullWidth
        />
      </div>
      <Controller
        name="gender"
        control={control}
        render={({ field }) => (
          <FormControl error={!!errors.gender} required>
            <RadioGroup
              {...field}
              onChange={(event) => field.onChange(event.target.value)}
            >
              <div className="grid w-full grid-cols-2">
                <FormControlLabel
                  value={"male"}
                  label="آقا"
                  control={<Radio />}
                />
                <FormControlLabel
                  value={"female"}
                  label="خانم"
                  control={<Radio />}
                />
              </div>
            </RadioGroup>
            <FormHelperText>{errors.gender?.message ?? ""}</FormHelperText>
          </FormControl>
        )}
      />
      <Accordion
        expanded={isOptionalFieldsVisible}
        onChange={HandleToggleOptionalFieldsVisibility}
      >
        <AccordionSummary expandIcon={<ArrowDown2 />}>
          <h2>اطلاعات اختیاری</h2>
        </AccordionSummary>
        <AccordionDetails>
          <div className="flex w-full flex-col gap-4">
            <Controller
              control={control}
              name="birthday"
              render={({ field }) => (
                <DatePickerComponent
                  {...field}
                  onChange={(value) => field.onChange(value)}
                  label="تاریخ تولد"
                  error={!!errors.birthday}
                  helperText={errors.birthday?.message ?? ""}
                  disableFuture
                />
              )}
            />
            <TextField
              {...register("father_name")}
              label="نام پدر"
              error={!!errors.father_name}
              helperText={errors.father_name?.message ?? ""}
            />
            <TextField
              {...register("email")}
              label="ایمیل"
              type="email"
              error={!!errors.email}
              helperText={errors.email?.message ?? ""}
            />
          </div>
        </AccordionDetails>
      </Accordion>
      <Button variant="contained" size="large" type="submit">
        ثبت
      </Button>
    </form>
  );
}
