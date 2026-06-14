"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useGetProfileInfo from "../_hooks/use-get-profile-info-endpoint";
import { useUserInfoStore } from "@/app/_providers/user-info-provider";

export function AuthenticationGuard({
  children,
}: {
  children: React.ReactNode;
  roles?: string[];
}) {
  const router = useRouter();
  const { data, isSuccess } = useGetProfileInfo();
  const { setUser } = useUserInfoStore((state) => state);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      router.replace("/login");
      return;
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("user", JSON.stringify(data.data));
      setUser(data.data);
    }
  }, [data, isSuccess]);

  return children;
}
