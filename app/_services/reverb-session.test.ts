import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { QueryClient } from "@tanstack/react-query";
import { createReverbConnection } from "./reverb";
import { reverbRequest } from "./reverb-api";
import { startReverbSession } from "./reverb-session";
import type { RealtimeNotification } from "@/app/_types/realtime";

vi.mock("./reverb", () => ({ createReverbConnection: vi.fn() }));
vi.mock("./reverb-api", () => ({ reverbRequest: vi.fn() }));

type Handler = (event: never) => void;
const handlers = new Map<string, Handler>();
const connectionHandlers = new Map<string, () => void>();
const channel = (name: string) => {
  const result = {
    listen: vi.fn((event: string, handler: Handler) => {
      handlers.set(`${name}:${event}`, handler);
      return result;
    }),
    error: vi.fn((handler: Handler) => {
      handlers.set(`${name}:error`, handler);
      return result;
    }),
  };
  return result;
};
const echo = {
  channel: vi.fn(channel),
  private: vi.fn(channel),
  leave: vi.fn(),
  disconnect: vi.fn(),
  socketId: () => "1.2",
  connector: {
    pusher: {
      connection: {
        bind: vi.fn((event: string, handler: () => void) =>
          connectionHandlers.set(event, handler),
        ),
        unbind: vi.fn(),
      },
    },
  },
};
const notification = (
  id: number,
  type = "expense.created",
): RealtimeNotification => ({
  id,
  type,
  karboom_id: 7,
  content: "New expense",
  seen: false,
  created_at: "2026-09-14T10:00:00Z",
});
const emit = (channelName: string, event: string, payload: unknown) =>
  handlers.get(`${channelName}:${event}`)?.(payload as never);
let stop: (() => void) | undefined;
let allowed = [{ id: 7 }];
let client: QueryClient;
const callbacks = {
  onNotifications: vi.fn(),
  onNotification: vi.fn(),
  onAnnouncement: vi.fn(),
  onLoading: vi.fn(),
  onSyncError: vi.fn(),
};
const start = () => {
  stop = startReverbSession({
    token: "test-token",
    userId: 3,
    queryClient: client,
    ...callbacks,
  });
};

beforeEach(() => {
  vi.clearAllMocks();
  handlers.clear();
  connectionHandlers.clear();
  allowed = [{ id: 7 }];
  client = new QueryClient();
  vi.spyOn(client, "invalidateQueries");
  vi.mocked(createReverbConnection).mockReturnValue(
    echo as unknown as ReturnType<typeof createReverbConnection>,
  );
  vi.mocked(reverbRequest).mockImplementation(async (path) => ({
    data: path.startsWith("user/") ? [] : allowed,
  }));
});
afterEach(() => {
  stop?.();
  client.clear();
});

describe("authenticated realtime session", () => {
  it("joins only API-authorized karbooms and subscribes to aliased events", async () => {
    start();
    await vi.waitFor(() =>
      expect(echo.private).toHaveBeenCalledWith("karbooms.7"),
    );
    expect(echo.private).toHaveBeenCalledWith("users.3");
    expect(echo.channel).toHaveBeenCalledWith("announcements");
    expect(reverbRequest).toHaveBeenCalledWith(
      "karboom/",
      "test-token",
      expect.any(AbortSignal),
    );
    emit("announcements", ".announcement.published", {
      title: "News",
      message: "Hello",
    });
    expect(callbacks.onAnnouncement).toHaveBeenCalledWith({
      title: "News",
      message: "Hello",
    });
  });

  it("deduplicates personal events and refreshes the affected financial queries", async () => {
    start();
    await vi.waitFor(() =>
      expect(callbacks.onLoading).toHaveBeenCalledWith(false),
    );
    const item = notification(10);
    emit("users.3", ".notification.created", { notification: item });
    emit("users.3", ".notification.created", { notification: item });
    expect(callbacks.onNotifications).toHaveBeenLastCalledWith([item]);
    expect(callbacks.onNotification).toHaveBeenCalledTimes(1);
    expect(client.invalidateQueries).toHaveBeenCalledWith({
      queryKey: ["expenses", 7],
    });
    expect(client.invalidateQueries).not.toHaveBeenCalledWith({
      queryKey: ["incomes", 7],
    });
  });

  it("refreshes invitations without joining the invited karboom, then joins on approval", async () => {
    allowed = [];
    start();
    await vi.waitFor(() =>
      expect(callbacks.onLoading).toHaveBeenCalledWith(false),
    );
    emit("users.3", ".notification.created", {
      notification: notification(1, "membership.invited"),
    });
    expect(client.invalidateQueries).toHaveBeenCalledWith({
      queryKey: ["requests"],
    });
    expect(echo.private).not.toHaveBeenCalledWith("karbooms.7");
    allowed = [{ id: 7 }];
    emit("users.3", ".notification.created", {
      notification: notification(2, "membership.approved"),
    });
    expect(echo.private).toHaveBeenCalledWith("karbooms.7");
  });

  it("resyncs on reconnect, leaves revoked memberships, and avoids duplicate subscriptions", async () => {
    start();
    await vi.waitFor(() =>
      expect(echo.private).toHaveBeenCalledWith("karbooms.7"),
    );
    connectionHandlers.get("connected")?.();
    await vi.waitFor(() => expect(reverbRequest).toHaveBeenCalledTimes(4));
    expect(
      echo.private.mock.calls.filter(([name]) => name === "karbooms.7"),
    ).toHaveLength(1);
    allowed = [{ id: 8 }];
    connectionHandlers.get("connected")?.();
    await vi.waitFor(() =>
      expect(echo.leave).toHaveBeenCalledWith("karbooms.7"),
    );
    expect(echo.private).toHaveBeenCalledWith("karbooms.8");
    expect(client.invalidateQueries).toHaveBeenCalledWith();
  });

  it("keeps live notifications received while the initial snapshot is in flight", async () => {
    let finish!: (value: unknown) => void;
    vi.mocked(reverbRequest).mockImplementation((path) =>
      path.startsWith("user/")
        ? new Promise((resolve) => {
            finish = resolve;
          })
        : Promise.resolve({ data: allowed }),
    );
    start();
    emit("users.3", ".notification.created", { notification: notification(2) });
    finish({ data: [notification(1)] });
    await vi.waitFor(() =>
      expect(callbacks.onNotifications).toHaveBeenLastCalledWith([
        notification(2),
        notification(1),
      ]),
    );
  });

  it("aborts HTTP work and ignores late events after logout", async () => {
    start();
    await vi.waitFor(() =>
      expect(callbacks.onLoading).toHaveBeenCalledWith(false),
    );
    const signal = vi.mocked(createReverbConnection).mock.calls[0][1];
    stop?.();
    expect(signal.aborted).toBe(true);
    expect(echo.disconnect).toHaveBeenCalled();
    expect(echo.connector.pusher.connection.unbind).toHaveBeenCalledWith(
      "connected",
      expect.any(Function),
    );
    callbacks.onNotifications.mockClear();
    emit("users.3", ".notification.created", { notification: notification(1) });
    expect(callbacks.onNotifications).not.toHaveBeenCalled();
  });

  it("reports API failures and keeps existing channel membership on a failed snapshot", async () => {
    start();
    await vi.waitFor(() =>
      expect(echo.private).toHaveBeenCalledWith("karbooms.7"),
    );
    vi.mocked(reverbRequest).mockRejectedValue(new Error("Unavailable"));
    connectionHandlers.get("connected")?.();
    await vi.waitFor(() =>
      expect(callbacks.onSyncError).toHaveBeenLastCalledWith(true),
    );
    expect(echo.leave).not.toHaveBeenCalled();
  });
});
