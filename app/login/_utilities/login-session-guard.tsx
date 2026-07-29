"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";

import { useUserInfoStore } from "@/app/_providers/user-info-provider";
import useGetProfileInfo from "@/app/dashboard/_hooks/use-get-profile-info-endpoint";

export default function LoginSessionGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const setUser = useUserInfoStore((state) => state.setUser);
  const [hasToken, setHasToken] = useState<boolean | null>(null);

  const { data, isError, isSuccess } = useGetProfileInfo({
    enabled: hasToken === true,
    redirectOnUnauthorized: false,
  });

  useEffect(() => {
    setHasToken(Boolean(localStorage.getItem("token")));
  }, []);

  useEffect(() => {
    if (!isSuccess) return;

    setUser(data.data);
    router.replace("/dashboard");
  }, [data, isSuccess, router, setUser]);

  useEffect(() => {
    if (!isError) return;

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setHasToken(false);
  }, [isError]);

  if (hasToken === false) return children;

  return (
    <div className="flex min-h-dvh w-full items-center justify-center">
      <CircularProgress color="primary" />
    </div>
  );
}
