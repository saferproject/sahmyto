"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useUserInfoStore } from "@/app/_providers/user-info-provider";

import VerifyPhone from "./_components/verify-phone";
import VerifyForm from "./_components/verify-form";
import VerifyRetry from "./_components/verify-retry";
import { PENDING_OTP_STORAGE_KEY } from "./_constants/pending-otp";
import PendingOtp from "./_interfaces/pending-otp";
import { readPendingOtp } from "./_utilities/pending-otp-storage";

export default function VerifyPage() {
  const router = useRouter();
  const setPhone = useUserInfoStore((state) => state.setPhone);
  const [pendingOtp, setPendingOtp] = useState<PendingOtp | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const hydratePendingOtp = () => {
      const storedPendingOtp = readPendingOtp();

      if (!storedPendingOtp) {
        setPendingOtp(null);
        setIsHydrated(true);
        router.replace("/login");
        return;
      }

      setPhone(storedPendingOtp.phone);
      setPendingOtp(storedPendingOtp);
      setIsHydrated(true);
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key === PENDING_OTP_STORAGE_KEY) hydratePendingOtp();
    };

    hydratePendingOtp();
    window.addEventListener("storage", handleStorage);

    return () => window.removeEventListener("storage", handleStorage);
  }, [router, setPhone]);

  if (!isHydrated || !pendingOtp) return null;

  return (
    <div>
      <VerifyPhone />
      <VerifyForm />
      <VerifyRetry pendingOtp={pendingOtp} onPendingOtpChange={setPendingOtp} />
    </div>
  );
}
