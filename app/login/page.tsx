"use client";

import { useRouter } from "next/navigation";

import { Button, TextField } from "@mui/material";

import useLoginForm from "./_hooks/use-login-form";
import { LoginFormType } from "./_schemas/login-schema";
import useLoginUser from "./_hooks/login-user-endpoint";
import { useUserInfoStore } from "../_providers/user-info-provider";
import { useWatch } from "react-hook-form";

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useLoginForm();

  const {phone} = useWatch({control})

  const { mutate, isPending } = useLoginUser();

  const { setPhone } = useUserInfoStore((state) => state);

  const submit = (data: LoginFormType) => {
    setPhone(data.phone);
    mutate(data, {
      onSuccess: (response) => {
        if (response.data.type === "code") router.push("/login/verify");
      },
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(submit)}
        className="flex w-full flex-col gap-4"
      >
        <h2 className="text-body font-yekan-bakh text-lg font-semibold">
          ورود یا ثبت نام
        </h2>
        <TextField
          {...register("phone")}
          dir="rtl"
          label="شماره همراه"
          type="tel"
          error={!!errors.phone}
          helperText={errors.phone?.message}
          placeholder="شماره همراه را وارد کنید"
          slotProps={{
            htmlInput: {
              style: {
                textAlign: "right",
              },
            },
            inputLabel: {
              shrink: !!phone,
            },
          }}
        />
        <Button
          variant="contained"
          type="submit"
          loading={isPending}
          sx={{
            height: "64px",
          }}
        >
          ورود به سهمیتو
        </Button>
      </form>
    </>
  );
}
