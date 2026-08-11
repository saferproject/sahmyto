"use client";

import { useRouter } from "next/navigation";

import { Button } from "@mui/material";
import { useUserInfoStore } from "../../../_providers/user-info-provider";

export default function VerifyPhone() {
  const router = useRouter();

  const phone = useUserInfoStore((state) => state.phone);

  const handleEditPhone = () => {
    router.push("/login");
  };

  return (
    <div className="text-body mb-8 flex items-end">
      <p className="w-full text-xs">رمز یک بار مصرف به شماره ارسال شده است</p>
      <div className="flex flex-col items-center">
        <Button onClick={handleEditPhone} sx={{ width: "fit-content" }}>
          ویرایش
        </Button>
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
