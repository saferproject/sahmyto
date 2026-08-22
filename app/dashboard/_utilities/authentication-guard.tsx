"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import useGetProfileInfo from "../_hooks/use-get-profile-info-endpoint";
import { useUserInfoStore } from "@/app/_providers/user-info-provider";
import {
  clearAuthSession,
  markAuthSession,
} from "@/app/_utilities/auth-session";

export function AuthenticationGuard({
  children,
}: {
  children: React.ReactNode;
  roles?: string[];
}) {
  const router = useRouter();
  const { data, isSuccess } = useGetProfileInfo();
  const setUser = useUserInfoStore((state) => state.setUser);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      clearAuthSession();
      router.replace("/login");
    } else {
      markAuthSession();
    }
  }, [router]);

  // Log out this tab when the session is cleared in another tab.
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "token" && !event.newValue) router.replace("/login");
    };

    window.addEventListener("storage", handleStorage);

    return () => window.removeEventListener("storage", handleStorage);
  }, [router]);

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("user", JSON.stringify(data.data));
      setUser(data.data);
    }
  }, [data, isSuccess, setUser]);

  // Don't flash protected content until the profile (and thus the session) is confirmed.
  if (!isSuccess)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <CircularProgress color="primary" />
      </div>
    );

  return children;
}
