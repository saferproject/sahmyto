"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import OtpInput from "react-otp-input";

import { useUserInfoStore } from "../../../_providers/user-info-provider";

import useVerify from "../_hooks/use-verify-endpoint";
import { clearPendingOtp } from "../_utilities/pending-otp-storage";

export default function VerifyForm() {
  const router = useRouter();

  const phone = useUserInfoStore((state) => state.phone);
  const setUser = useUserInfoStore((state) => state.setUser);

  const { mutate } = useVerify();
  const [otp, setOtp] = useState("");

  const autoSubmit = useCallback(() => {
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
            clearPendingOtp();

            if (response.data.user.is_complete_profile)
              router.push("/dashboard/karbooms");
            else router.push("/dashboard/profile");
          },
          onError: () => setOtp(""),
        },
      );
  }, [mutate, otp, phone, router, setUser]);

  useEffect(() => {
    if (otp.length === 4) autoSubmit();
  }, [autoSubmit, otp]);

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
            className="min-h-16 min-w-16 rounded-lg border border-dashed text-center text-4xl"
          />
        )}
        shouldAutoFocus
      />
    </div>
  );
}
