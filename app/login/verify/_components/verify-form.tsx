"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useWatch } from "react-hook-form";

import { useUserInfoStore } from "../../../_providers/user-info-provider";

import useVerify from "../_hooks/use-verify-endpoint";
import useVerifyForm from "../_hooks/use-verify-form";

export default function VerifyForm() {
  const router = useRouter();

  const { phone, setUser } = useUserInfoStore((state) => state);

  const { mutate } = useVerify();

  const autoSubmit = async () => {
    if (await trigger())
      mutate(
        { code: Object.values(getValues()).join(""), phone },
        {
          onSuccess: (response) => {
            if (!response.data.token) return;

            window.localStorage.setItem("token", response.data.token);
            window.localStorage.setItem(
              "user",
              JSON.stringify(response.data.user),
            );
            setUser(response.data.user);

            if (response.data.user.is_complete_profile)
              router.push("/dashboard");
            else router.push("/dashboard/profile");
          },
        },
      );
  };

  const {
    register,
    setFocus,
    control,
    trigger,
    getValues,
    formState: {
      touchedFields: {
        firstDigit: firstDigitTouched,
        secondDigit: secondDigitTouched,
        thirdDigit: thirdDigitTouched,
        fourthDigit: fourthDigitTouched,
      },
    },
  } = useVerifyForm();

  const { firstDigit, secondDigit, thirdDigit, fourthDigit } = useWatch({
    control,
  });

  useEffect(() => {
    if (firstDigit) setFocus("secondDigit");
  }, [firstDigit]);

  useEffect(() => {
    if (secondDigit) setFocus("thirdDigit");
  }, [secondDigit]);

  useEffect(() => {
    if (thirdDigit) setFocus("fourthDigit");
  }, [thirdDigit]);

  useEffect(() => {
    if (fourthDigit) autoSubmit();
  }, [fourthDigit]);

  return (
    <form dir="ltr" className="mt-4 flex w-full flex-col gap-4">
      <div className="flex w-full items-center justify-evenly gap-4">
        <input
          {...register("firstDigit")}
          type="tel"
          className={
            "h-12 w-12 rounded border-2 border-dashed text-center text-4xl " +
            (firstDigitTouched ? "border-primary" : "border-secondary")
          }
          maxLength={1}
          autoFocus
        />
        <input
          {...register("secondDigit")}
          type="tel"
          className={
            "h-12 w-12 rounded border-2 border-dashed text-center text-4xl " +
            (secondDigitTouched ? "border-primary" : "border-secondary")
          }
          maxLength={1}
        />
        <input
          {...register("thirdDigit")}
          type="tel"
          className={
            "h-12 w-12 rounded border-2 border-dashed text-center text-4xl " +
            (thirdDigitTouched ? "border-primary" : "border-secondary")
          }
          maxLength={1}
        />
        <input
          {...register("fourthDigit")}
          type="tel"
          className={
            "h-12 w-12 rounded border-2 border-dashed text-center text-4xl " +
            (fourthDigitTouched ? "border-primary" : "border-secondary")
          }
          maxLength={1}
        />
      </div>
    </form>
  );
}
