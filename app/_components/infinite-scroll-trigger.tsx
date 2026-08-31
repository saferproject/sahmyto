"use client";

import { CircularProgress } from "@mui/material";
import { useEffect, useRef } from "react";

interface InfiniteScrollTriggerProps {
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  fetchNextPage: () => unknown;
}

export default function InfiniteScrollTrigger({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: InfiniteScrollTriggerProps) {
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trigger = triggerRef.current;

    if (!trigger || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetchingNextPage) fetchNextPage();
      },
      { rootMargin: "200px 0px" },
    );

    observer.observe(trigger);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (!hasNextPage && !isFetchingNextPage) return null;

  return (
    <div
      ref={triggerRef}
      className="flex min-h-8 w-full items-center justify-center"
      aria-hidden={!isFetchingNextPage}
    >
      {isFetchingNextPage && <CircularProgress size={24} />}
    </div>
  );
}
