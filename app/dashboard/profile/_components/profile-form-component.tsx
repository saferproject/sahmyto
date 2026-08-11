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
import { DatePicker } from "@mui/x-date-pickers";
import { useShallow } from "zustand/react/shallow";

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

  const submit = (data: ProfileFormType) => {
    mutate(data, {
      onSuccess: (response) => {
        setUser(response.data);
        router.push("/dashboard");
      },
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
          fullWidth
        />
        <TextField
          {...register("last_name")}
          label="نام خانوادگی"
          slotProps={{
            inputLabel: { shrink: true },
          }}
          required
          fullWidth
        />
      </div>
      <Controller
        name="gender"
        control={control}
        render={({ field }) => (
          <FormControl required>
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
                <DatePicker
                  {...field}
                  onChange={(value) => field.onChange(value)}
                  label="تاریخ تولد"
                  format="YYYY/MM/DD"
                  views={["year", "month", "day"]}
                  slotProps={{
                    textField: {
                      error: !!errors.birthday,
                      helperText: errors.birthday?.message ?? "",
                      fullWidth: true,
                    },
                  }}
                  disableFuture
                />
              )}
            />
            <TextField {...register("father_name")} label="نام پدر" />
            <TextField {...register("email")} label="ایمیل" type="email" />
          </div>
        </AccordionDetails>
      </Accordion>
      <Button variant="contained" size="large" type="submit">
        ثبت
      </Button>
    </form>
  );
}
