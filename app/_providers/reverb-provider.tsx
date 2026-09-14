"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useUserInfoStore } from "./user-info-provider";
import { startReverbSession } from "@/app/_services/reverb-session";
import type { RealtimeNotification } from "@/app/_types/realtime";

const ReverbContext = createContext({
  notifications: [] as RealtimeNotification[],
  isLoading: false,
  isError: false,
});

function subscribeToToken(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener("auth-session-changed", onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener("auth-session-changed", onChange);
  };
}
const getToken = () => localStorage.getItem("token");
const getServerToken = () => null;

export function ReverbProvider({ children }: { children: React.ReactNode }) {
  const userId = useUserInfoStore((state) => state.id);
  const token = useSyncExternalStore(
    subscribeToToken,
    getToken,
    getServerToken,
  );
  const queryClient = useQueryClient();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [snapshot, setSnapshot] = useState({
    token: null as string | null,
    userId: 0,
    notifications: [] as RealtimeNotification[],
  });
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    if (!token || !userId) return;
    const snackbars = new Set<string | number>();
    const stop = startReverbSession({
      token,
      userId,
      queryClient,
      onNotifications: (notifications) =>
        setSnapshot({ token, userId, notifications }),
      onLoading: setLoading,
      onSyncError: setError,
      onNotification: (notification) => {
        snackbars.add(
          enqueueSnackbar(notification.content, {
            variant: "info",
            onExited: (_node, key) => {
              snackbars.delete(key);
            },
          }),
        );
      },
      onAnnouncement: ({ title, message }) => {
        snackbars.add(
          enqueueSnackbar(`${title}: ${message}`, {
            variant: "info",
            onExited: (_node, key) => {
              snackbars.delete(key);
            },
          }),
        );
      },
    });
    return () => {
      stop();
      snackbars.forEach((key) => closeSnackbar(key));
    };
  }, [token, userId, queryClient, enqueueSnackbar, closeSnackbar]);

  return (
    <ReverbContext.Provider
      value={{
        notifications:
          token && token === snapshot.token && userId === snapshot.userId
            ? snapshot.notifications
            : [],
        isLoading,
        isError,
      }}
    >
      {children}
    </ReverbContext.Provider>
  );
}

export const useReverbNotifications = () => useContext(ReverbContext);
