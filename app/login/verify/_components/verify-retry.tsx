"use client";

import { Button } from "@mui/material";
import { useEffect, useState } from "react";

import useLoginUser from "../../_hooks/login-user-endpoint";

import { useUserInfoStore } from "../../../_providers/user-info-provider";
import PendingOtp from "../_interfaces/pending-otp";
import { savePendingOtp } from "../_utilities/pending-otp-storage";

interface VerifyRetryProps {
  pendingOtp: PendingOtp;
  onPendingOtpChange: (pendingOtp: PendingOtp) => void;
}

const getRemainingSeconds = (expiresAt: number) =>
  Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000));

export default function VerifyRetry({
  pendingOtp,
  onPendingOtpChange,
}: VerifyRetryProps) {
  const { phone } = useUserInfoStore((state) => state);

  const [time, setTime] = useState(() =>
    getRemainingSeconds(pendingOtp.expiresAt),
  );

  useEffect(() => {
    const updateTime = () => {
      setTime(getRemainingSeconds(pendingOtp.expiresAt));
    };

    updateTime();

    const id = window.setInterval(updateTime, 1000);
    document.addEventListener("visibilitychange", updateTime);

    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", updateTime);
    };
  }, [pendingOtp.expiresAt]);

  const { mutate, isPending } = useLoginUser();

  const handleRetry = () => {
    mutate(
      { phone },
      {
        onSuccess: () => {
          const nextPendingOtp = savePendingOtp(phone);
          onPendingOtpChange(nextPendingOtp);
        },
      },
    );
  };

  return (
    <div className="mt-8 flex flex-col items-center gap-4">
      {time !== 0 && (
        <div className="flex items-center gap-2">
          <p className="text-body text-lg font-semibold">{time}</p>
          <p className="text-primary">ثانیه دیگر...</p>
        </div>
      )}
      <div className="flex flex-col items-center">
        <p className="text-body text-xs">
          هنوز رمز فعال سازی را دریافت نکرده اید؟
        </p>
        <Button
          variant="text"
          onClick={handleRetry}
          loading={isPending}
          disabled={time !== 0 || isPending}
        >
          ارسال مجدد رمز فعال سازی سهمیتو
        </Button>
      </div>
    </div>
  );
}
