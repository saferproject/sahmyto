"use client";

import { Button } from "@mui/material";
import { useEffect, useState } from "react";

import useLoginUser from "../../_hooks/login-user-endpoint";

import { useUserInfoStore } from "../../../_providers/user-info-provider";

export default function VerifyRetry() {
  const { phone } = useUserInfoStore((state) => state);

  const [time, setTime] = useState(60);

  useEffect(() => {
    const id = setInterval(() => {
      setTime((t) => (t > 0 ? t - 1 : 0));
    }, 1000);

    return () => clearInterval(id);
  }, []);

  const { mutate, isPending } = useLoginUser();

  const handleRetry = () => {
    mutate({ phone }, { onSuccess: () => setTime(60) });
  };

  return (
    <div className="mt-8 flex flex-col items-center gap-4">
      {time !== 0 && (
        <div className="flex items-center gap-2">
          <p className="text-body text-xl font-semibold">{time}</p>
          <p className="text-primary">ثانیه دیگر...</p>
        </div>
      )}
      <div className="flex flex-col items-center">
        <p className="text-xs">هنوز رمز فعال سازی را دریافت نکرده اید؟</p>
        <Button
          variant="text"
          onClick={handleRetry}
          loading={isPending}
          disabled={time !== 0}
        >
          ارسال مجدد رمز فعال سازی سهمیتو
        </Button>
      </div>
    </div>
  );
}
