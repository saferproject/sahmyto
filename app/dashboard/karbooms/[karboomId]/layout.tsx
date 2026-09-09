import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import ActiveKarboomBoundary from "../_components/active-karboom-boundary";

export default async function ActiveKarboomLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ karboomId: string }>;
}) {
  const { karboomId: slug } = await params;
  const karboomId = Number(slug);

  if (!/^[1-9]\d*$/.test(slug) || !Number.isSafeInteger(karboomId)) {
    notFound();
  }

  return (
    <ActiveKarboomBoundary key={karboomId} karboomId={karboomId}>
      {children}
    </ActiveKarboomBoundary>
  );
}
