"use client";

import KarboomItemSkeleton from "./karboom-item-skeleton";

export default function KarboomListSkeleton() {
  return (
    <div className="flex w-full flex-col gap-8 pb-4">
      <KarboomItemSkeleton />
      <KarboomItemSkeleton />
    </div>
  );
}
