import { afterEach, describe, expect, it, vi } from "vitest";
import { reverbRequest } from "./reverb-api";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("Reverb API", () => {
  it("sends captured credentials only in headers and uses the API broadcasting auth route", async () => {
    vi.stubEnv("NEXT_PUBLIC_API_URL", "http://localhost:8000/api");
    const fetch = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify({ auth: "signed" })));
    vi.stubGlobal("fetch", fetch);
    const body = { socket_id: "1.2", channel_name: "private-users.3" };
    expect(
      await reverbRequest(
        "broadcasting/auth",
        "token",
        new AbortController().signal,
        body,
      ),
    ).toEqual({ auth: "signed" });
    expect(String(fetch.mock.calls[0][0])).toBe(
      "http://localhost:8000/api/broadcasting/auth",
    );
    expect(fetch.mock.calls[0][1]).toMatchObject({
      method: "POST",
      headers: {
        Authorization: "Bearer token",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "omit",
    });
  });

  it("rejects forbidden channel authorization", async () => {
    vi.stubEnv("NEXT_PUBLIC_API_URL", "http://localhost:8000/api/");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("", { status: 403 })),
    );
    await expect(
      reverbRequest(
        "broadcasting/auth",
        "token",
        new AbortController().signal,
        {},
      ),
    ).rejects.toThrow("403");
  });
});
