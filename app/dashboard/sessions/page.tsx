"use client";

import { Button, IconButton } from "@mui/material";
import { Android, Apple, Monitor, Trash } from "iconsax-reactjs";
import useGetSessions from "./_hooks/use-get-sessions";
import useInvalidateSessions from "./_hooks/use-invalidate-session";
import useInvalidateAllSessions from "./_hooks/use-invalidate-all-sessions";
import formatDate from "@/app/_utilities/format-dates";
import { useState } from "react";
import InfiniteScrollTrigger from "@/app/_components/infinite-scroll-trigger";
import { AnimatePresence } from "motion/react";
import AnimatedListItem from "@/app/_components/animated-list-item-component";

export default function SessionsPage() {
  const [invalidatingSessionId, setInvalidatingSessionId] = useState<
    number | null
  >(null);

  const {
    data: sessions,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetSessions();

  const { mutate: invalidateSession, isPending: isInvalidatingSession } =
    useInvalidateSessions();

  const {
    mutate: invalidateAllSessions,
    isPending: isInvalidatingAllSessions,
  } = useInvalidateAllSessions();

  const handleInvalidateSession = (sessionId: number) => {
    setInvalidatingSessionId(sessionId);
    invalidateSession(sessionId);
  };

  const handleInvalidateAllSessions = () => {
    invalidateAllSessions();
  };

  const currentSession = sessions?.data?.find((session) => session.is_current);

  return (
    <>
      {/* NOTE Current Session */}
      <h3 className="text-body font-bold">نشست کنونی</h3>
      <div
        dir="ltr"
        className="text-body bg-secondary-lightest border-secondary-lighter flex items-center justify-between rounded-2xl border p-2"
      >
        <div className="flex h-full flex-col justify-between">
          <p>{currentSession?.device.name}</p>
          <p>{currentSession?.device.platform}</p>
          <p className="text-secondary-dark">
            {formatDate(
              currentSession?.logged_in_at ?? "",
              "YYYY/MM/DD - HH:mm",
            )}
          </p>
        </div>
        <div className="bg-primary rounded-2xl p-4">
          {currentSession?.device.type === "mobile" ? (
            currentSession.device.platform === "android" ? (
              <Android size="48" className="text-white" />
            ) : (
              <Apple size="48" className="text-white" />
            )
          ) : (
            <Monitor size="48" className="text-white" />
          )}
        </div>
      </div>
      {/* NOTE Instructions */}
      <p className="text-body my-4 text-sm">
        اگر دستگاه های پایین را نمی شناسید دسترسی آن ها را قطع کنید
      </p>
      <Button
        variant="outlined"
        color="error"
        onClick={handleInvalidateAllSessions}
        fullWidth
      >
        قطع دسترسی همه دستگاه ها
      </Button>
      {/* NOTE Active Sessions List */}
      <h3 className="text-body mt-4 font-bold">نشست های فعال</h3>
      <ul className="flex flex-col gap-4">
        <AnimatePresence>
          {sessions?.data.map((session, index) => (
            <AnimatedListItem
              key={session.id}
              index={index}
              dir="ltr"
              className="border-secondary-lighter bg-secondary-lightest flex items-center justify-between rounded-2xl border p-2"
            >
              <div className="flex items-center gap-4">
                <div className="bg-secondary-light border-primary flex size-16 items-center justify-center rounded-full border p-1">
                  {session.device.type === "mobile" ? (
                    session.device.platform === "android" ? (
                      <Android size="32" className="text-primary" />
                    ) : (
                      <Apple size="32" className="text-primary" />
                    )
                  ) : (
                    <Monitor size="32" className="text-primary" />
                  )}
                </div>
                <div className="flex h-full flex-col justify-between">
                  <p>{session.device.name}</p>
                  <p>{session.device.platform}</p>
                  <p className="text-secondary-dark">
                    {formatDate(
                      session?.logged_in_at ?? "",
                      "YYYY/MM/DD - HH:mm",
                    )}
                  </p>
                </div>
              </div>
              <div className="rounded-2xl bg-red-500">
                <IconButton
                  loading={
                    isInvalidatingSession &&
                    invalidatingSessionId === session.id
                  }
                  disabled={
                    (isInvalidatingSession &&
                      invalidatingSessionId !== session.id) ||
                    isInvalidatingAllSessions
                  }
                  size="large"
                  onClick={() => handleInvalidateSession(session.id)}
                >
                  <Trash size="32" className="text-white" variant="Bold" />
                </IconButton>
              </div>
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </ul>
      <InfiniteScrollTrigger
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </>
  );
}
