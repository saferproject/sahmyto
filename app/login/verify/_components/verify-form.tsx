"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";

import { useUserInfoStore } from "../../../_providers/user-info-provider";

import useVerify from "../_hooks/use-verify-endpoint";

export default function VerifyForm() {
  const router = useRouter();

  const { phone, setUser } = useUserInfoStore((state) => state);

  const { mutate } = useVerify();

  const autoSubmit = async () => {
    if (otp.length === 4)
      mutate(
        { code: otp, phone },
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
          onError: () => setOtp(""),
        },
      );
  };

  const [otp, setOtp] = useState("");

  useEffect(() => {
    if (otp.length === 4) autoSubmit();
  }, [otp]);

  return (
    <div dir="ltr">
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={4}
        containerStyle="mt-4 flex w-full items-center justify-between gap-4"
        inputType="tel"
        renderInput={(props) => (
          <input
            {...props}
            className="min-h-12 min-w-12 rounded-lg border-2 border-dashed text-center text-4xl"
          />
        )}
        shouldAutoFocus
      />
    </div>
  );
}
