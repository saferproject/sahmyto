import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { reverbRequest } from "./reverb-api";

export function createReverbConnection(token: string, signal: AbortSignal) {
  const key = process.env.NEXT_PUBLIC_REVERB_APP_KEY;
  const host = process.env.NEXT_PUBLIC_REVERB_HOST;

  // Leave realtime disabled in environments without Reverb configuration.
  if (!key || !host) return null;

  const forceTLS = process.env.NEXT_PUBLIC_REVERB_SCHEME === "https";
  const port = Number(
    process.env.NEXT_PUBLIC_REVERB_PORT || (forceTLS ? 443 : 80),
  );

  return new Echo<"reverb">({
    broadcaster: "reverb",
    Pusher,
    key,
    wsHost: host,
    wsPort: port,
    wssPort: port,
    forceTLS,
    enabledTransports: ["ws", "wss"],
    channelAuthorization: {
      customHandler: ({ socketId, channelName }, callback) => {
        void reverbRequest<{ auth: string }>(
          "broadcasting/auth",
          token,
          signal,
          { socket_id: socketId, channel_name: channelName },
        ).then(
          (data) => {
            if (!signal.aborted) callback(null, data);
          },
          (error: unknown) => {
            if (!signal.aborted) {
              callback(
                error instanceof Error
                  ? error
                  : new Error("Channel authorization failed"),
                null,
              );
            }
          },
        );
      },
    },
  });
}
