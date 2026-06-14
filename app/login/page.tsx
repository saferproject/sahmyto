"use client";

import { useRouter } from "next/navigation";

import { Button, TextField } from "@mui/material";

import useLoginForm from "./_hooks/use-login-form";
import { LoginFormType } from "./_schemas/login-schema";
import useLoginUser from "./_hooks/login-user-endpoint";
import { useUserInfoStore } from "../_providers/user-info-provider";

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit } = useLoginForm();
  const { mutate, isPending } = useLoginUser();
  const { setPhone } = useUserInfoStore((state) => state);

  const submit = (data: LoginFormType) => {
    setPhone(data.phone);
    mutate(data, {
      onSuccess: (response) => {
        if (response.data.type === "code") router.push("/login/verify");
        else if (response.data.type === "password") {
        }
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
        />
        <Button
          variant="contained"
          size="large"
          type="submit"
          loading={isPending}
        >
          ورود به سهمیتو
        </Button>
      </form>
      <div className="flex items-center gap-1">
        {/* <KeyMinimalistic2 weight="Broken" size={24} className="text-body" />
        <Button variant="text">فراموشی رمز عبور</Button> */}
      </div>
    </>
  );
}
