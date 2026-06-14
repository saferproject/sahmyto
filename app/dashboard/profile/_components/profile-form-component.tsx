"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import {
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { AltArrowDown } from "@solar-icons/react";
import { Controller } from "react-hook-form";

import useProfileForm from "../_hooks/profile-form";
import useCompleteProfile from "../_hooks/complete-profile-endpoint";

import { useUserInfoStore } from "@/app/_providers/user-info-provider";

import { ProfileFormType } from "../_schemas/profile-schema";
import { DatePicker } from "@mui/x-date-pickers";

export default function ProfileFormComponent() {
  const [isOptionalFieldsVisible, setOptionalFieldsVisibility] =
    useState(false);

  const router = useRouter();

  const userInfoStore = useUserInfoStore((state) => state);

  const { setUser, ...user } = userInfoStore;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useProfileForm();

  const { mutate, isSuccess, data } = useCompleteProfile();

  const submit = (data: ProfileFormType) => {
    mutate(data);
  };

  const HandleToggleOptionalFieldsVisibility = () => {
    setOptionalFieldsVisibility((curValue) => !curValue);
  };

  useEffect(() => {
    if (isSuccess) {
      setUser(data.data);
      router.push("/dashboard");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (user) reset(user);
  }, [user]);

  return (
    <form
      className="mt-8 flex w-full flex-col gap-4"
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
      />
      <div className="flex items-center gap-2">
        <TextField
          {...register("first_name")}
          label="نام"
          slotProps={{
            inputLabel: { shrink: true },
          }}
          required
        />
        <TextField
          {...register("last_name")}
          label="نام خانوادگی"
          slotProps={{
            inputLabel: { shrink: true },
          }}
          required
        />
      </div>
      <Accordion
        expanded={isOptionalFieldsVisible}
        onChange={HandleToggleOptionalFieldsVisibility}
      >
        <AccordionSummary expandIcon={<AltArrowDown />}>
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
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <InputLabel id="gender-label">جنسیت</InputLabel>
                  <Select {...field} labelId="gender-label" label="جنسیت">
                    <MenuItem value={undefined}></MenuItem>
                    <MenuItem value="male">مرد</MenuItem>
                    <MenuItem value="female">زن</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
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
