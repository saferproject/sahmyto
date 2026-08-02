"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";

import { useUserInfoStore } from "@/app/_providers/user-info-provider";
import useGetProfileInfo from "@/app/dashboard/_hooks/use-get-profile-info-endpoint";

const TOKEN_STORAGE_KEY = "token";
const TOKEN_CHANGE_EVENT = "auth-token-change";

const subscribeToToken = (onStoreChange: () => void) => {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(TOKEN_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(TOKEN_CHANGE_EVENT, onStoreChange);
  };
};

const getTokenSnapshot = () => Boolean(localStorage.getItem(TOKEN_STORAGE_KEY));
const getServerTokenSnapshot = () => null;

export default function LoginSessionGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const setUser = useUserInfoStore((state) => state.setUser);
  const hasToken = useSyncExternalStore(
    subscribeToToken,
    getTokenSnapshot,
    getServerTokenSnapshot,
  );

  const { data, isError, isSuccess } = useGetProfileInfo({
    enabled: hasToken === true,
    redirectOnUnauthorized: false,
  });

  useEffect(() => {
    if (!isSuccess) return;

    setUser(data.data);
    router.replace("/dashboard");
  }, [data, isSuccess, router, setUser]);

  useEffect(() => {
    if (!isError) return;

    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem("user");
    window.dispatchEvent(new Event(TOKEN_CHANGE_EVENT));
  }, [isError]);

  if (hasToken === false) return children;

  return (
    <div className="flex min-h-dvh w-full items-center justify-center">
      <CircularProgress color="primary" />
    </div>
  );
}
