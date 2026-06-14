"use client";

import KarboomItemSkeleton from "./karboom-item-skeleton";

export default function KarboomListSkeleton() {
  return (
    <div className="flex w-full flex-col gap-12 mt-8">
      <KarboomItemSkeleton />
      <KarboomItemSkeleton />
    </div>
  );
}
