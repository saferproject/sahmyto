"use client";

import { useEffect, type ReactNode } from "react";
import Link from "next/link";

import useGetKarboomEndpoint from "../_hooks/use-get-karboom-endpoint";
import { useKarboomsStore } from "../_providers/karbooms-store-provider";
import { KARBOOMS_STORE_DEFAULTS } from "../_constants/karbooms-store-defaults";
import KarboomsLoading from "../loading";

export default function ActiveKarboomBoundary({
  karboomId,
  children,
}: {
  karboomId: number;
  children: ReactNode;
}) {
  const activeId = useKarboomsStore((state) => state.id);
  const setActiveKarboom = useKarboomsStore((state) => state.setActiveKarboom);
  const { data, isPending, isError, refetch } =
    useGetKarboomEndpoint(karboomId);
  const karboom = data?.data;

  useEffect(() => {
    if (karboom?.id === karboomId) {
      // The detail response omits list totals and may omit the karboom type.
      // Reset those fields so values from a previous selection cannot leak in.
      setActiveKarboom({ ...KARBOOMS_STORE_DEFAULTS, ...karboom });
    }
  }, [karboom, karboomId, setActiveKarboom]);

  if (isPending) return <KarboomsLoading />;

  if (isError || karboom?.id !== karboomId) {
    return (
      <section role="alert" className="flex flex-col items-center gap-4 py-8">
        <p className="text-body">خطا در دریافت اطلاعات کاربوم</p>
        <button
          type="button"
          className="bg-primary rounded-xl px-6 py-3 text-white"
          onClick={() => void refetch()}
        >
          تلاش دوباره
        </button>
        <Link href="/dashboard/karbooms">بازگشت به کاربوم‌ها</Link>
      </section>
    );
  }

  // Children must read the matching store, including when the URL changes.
  if (activeId !== karboomId) return <KarboomsLoading />;

  return children;
}
