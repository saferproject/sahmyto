"use client";

import { useRouter } from "next/navigation";

import { Button, IconButton } from "@mui/material";
import { Edit2 } from "iconsax-reactjs";
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
    <div className="mb-8 flex items-end text-body">
      <p className="w-full text-xs">رمز یک بار مصرف به شماره ارسال شده است</p>
      <div className="flex flex-col items-center">
        <Button sx={{ width: "fit-content" }}>ویرایش</Button>
        <span
          className="mx-1 inline-flex flex-col items-center gap-1 rounded px-1 text-sm font-bold"
          onClick={handleEditPhone}
        >
          {phone}
        </span>
      </div>
    </div>
  );
}
