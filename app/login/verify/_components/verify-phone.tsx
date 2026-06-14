"use client";

import { useRouter } from "next/navigation";

import { IconButton } from "@mui/material";
import { Pen2 } from "@solar-icons/react";
import { useUserInfoStore } from "../../../_providers/user-info-provider";
import { useEffect } from "react";

export default function VerifyPhone() {
  const router = useRouter();

  const { phone } = useUserInfoStore((state) => state);

  const handleEditPhone = () => {
    router.back();
  };

  useEffect(() => {
    if (!phone) router.back();
  }, [phone, router]);

  return (
    <p className="text-xs">
      رمز یک بار مصرف به شماره
      <span
        className="bg-primary-light mx-1 inline-flex items-center gap-1 rounded px-1 text-base"
        onClick={handleEditPhone}
      >
        {phone}
        <IconButton>
          <Pen2 weight="Broken" size={16} className="text-primary" />
        </IconButton>
      </span>{" "}
      ارسال شده است
    </p>
  );
}
