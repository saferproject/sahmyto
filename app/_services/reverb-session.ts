import type { QueryClient } from "@tanstack/react-query";
import type {
  Announcement,
  KarboomActivity,
  RealtimeNotification,
} from "@/app/_types/realtime";
import { createReverbConnection } from "./reverb";
import { reverbRequest } from "./reverb-api";

interface SessionOptions {
  token: string;
  userId: number;
  queryClient: QueryClient;
  onNotifications: (notifications: RealtimeNotification[]) => void;
  onNotification: (notification: RealtimeNotification) => void;
  onAnnouncement: (announcement: Announcement) => void;
  onLoading: (loading: boolean) => void;
  onSyncError: (failed: boolean) => void;
}

export function startReverbSession({
  token,
  userId,
  queryClient,
  onNotifications,
  onNotification,
  onAnnouncement,
  onLoading,
  onSyncError,
}: SessionOptions) {
  const controller = new AbortController();
  const { signal } = controller;
  const echo = createReverbConnection(token, signal);
  const joined = new Set<number>();
  let notifications: RealtimeNotification[] = [];
  let pendingSync: Promise<void> | undefined;
  let syncAgain = false;
  let receivedDuringSync: RealtimeNotification[] = [];

  const invalidate = (queryKey: readonly unknown[]) => {
    void queryClient.invalidateQueries({ queryKey });
  };
  const refreshKarboom = (id: number) => {
    for (const name of ["karboom", "members", "drivers"])
      invalidate([name, id]);
    // Partner lists include karboom_id inside a filter object, or span all karbooms.
    invalidate(["partners"]);
    invalidate(["karbooms"]);
  };
  const joinKarboom = (id: number) => {
    if (!echo || !id || joined.has(id) || signal.aborted) return;
    joined.add(id);
    echo
      .private(`karbooms.${id}`)
      .listen(".karboom.activity", (event: KarboomActivity) => {
        if (signal.aborted || !joined.has(id)) return;
        refreshKarboom(id);
        // Membership changes may also remove access to this channel.
        if (event.type.startsWith("membership.")) resync();
      })
      .error(() => {
        joined.delete(id);
        echo.leave(`karbooms.${id}`);
      });
  };

  async function sync() {
    receivedDuringSync = [];
    const results = await Promise.allSettled([
      reverbRequest<{ data: RealtimeNotification[] }>(
        "user/notifications?per_page=20",
        token,
        signal,
      ),
      reverbRequest<{ data: { id: number }[] }>("karboom/", token, signal),
    ]);
    if (signal.aborted) return;
    const [notificationResult, karboomResult] = results;
    if (notificationResult.status === "fulfilled") {
      const merged = new Map<string, RealtimeNotification>();
      for (const item of [
        ...receivedDuringSync,
        ...notificationResult.value.data,
      ]) {
        if (!merged.has(String(item.id))) merged.set(String(item.id), item);
      }
      notifications = [...merged.values()].slice(0, 20);
      onNotifications(notifications);
    }
    if (karboomResult.status === "fulfilled") {
      const allowed = new Set(
        karboomResult.value.data.map(({ id }) => Number(id)),
      );
      for (const id of joined) {
        if (!allowed.has(id)) {
          echo?.leave(`karbooms.${id}`);
          joined.delete(id);
        }
      }
      allowed.forEach(joinKarboom);
    }
    onSyncError(results.some((result) => result.status === "rejected"));
    onLoading(false);
  }

  function resync() {
    if (signal.aborted) return;
    if (pendingSync) {
      syncAgain = true;
      return;
    }
    pendingSync = sync()
      .catch(() => {
        if (!signal.aborted) {
          onSyncError(true);
          onLoading(false);
        }
      })
      .finally(() => {
        pendingSync = undefined;
        if (syncAgain) {
          syncAgain = false;
          resync();
        }
      });
  }

  const onConnected = () => {
    if (signal.aborted) return;
    if (process.env.NODE_ENV !== "production")
      console.info("[Reverb] Connected", { socketId: echo?.socketId() });
    // Recover API-backed state after events missed while offline.
    void queryClient.invalidateQueries();
    resync();
  };
  const onError = () => {
    if (!signal.aborted && process.env.NODE_ENV !== "production")
      console.error("[Reverb] Connection or subscription failed");
  };
  echo
    ?.channel("announcements")
    .listen(".announcement.published", (event: Announcement) => {
      if (!signal.aborted) onAnnouncement(event);
    });
  echo
    ?.private(`users.${userId}`)
    .listen(
      ".notification.created",
      ({ notification }: { notification: RealtimeNotification }) => {
        if (signal.aborted) return;
        const duplicate = notifications.some(
          (item) => String(item.id) === String(notification.id),
        );
        notifications = [
          notification,
          ...notifications.filter(
            (item) => String(item.id) !== String(notification.id),
          ),
        ].slice(0, 20);
        if (pendingSync) receivedDuringSync.unshift(notification);
        onNotifications(notifications);
        if (!duplicate) onNotification(notification);
        const id = Number(notification.karboom_id);
        if (notification.type.startsWith("membership.")) {
          invalidate(["requests"]);
          invalidate(["karbooms"]);
          if (notification.type === "membership.approved") joinKarboom(id);
          resync();
        }
        const financialQuery = {
          "income.created": "incomes",
          "expense.created": "expenses",
          "payment.created": "payments",
        }[notification.type];
        if (financialQuery && id) {
          invalidate([financialQuery, id]);
          invalidate(["karboom", id]);
          invalidate(["financial-months", id]);
          for (const name of [
            "financial-month-data",
            "settlement-data",
            "drivers-salary",
          ])
            invalidate([name]);
        }
      },
    )
    .error(onError);
  const connection = echo?.connector.pusher.connection;
  connection?.bind("connected", onConnected);
  connection?.bind("error", onError);
  onNotifications([]);
  onLoading(true);
  onSyncError(false);
  resync();

  return () => {
    controller.abort();
    connection?.unbind("connected", onConnected);
    connection?.unbind("error", onError);
    echo?.disconnect();
  };
}
