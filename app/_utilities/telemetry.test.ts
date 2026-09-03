import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  vi.resetModules();
});

describe("telemetry", () => {
  it("logs application errors outside production", async () => {
    vi.stubEnv("NODE_ENV", "development");
    vi.stubEnv("NEXT_PUBLIC_APP_VERSION", "1.2.3");
    const errorLog = vi.spyOn(console, "error").mockImplementation(() => {});
    const { reportApplicationError } = await import("./telemetry");
    const error = Object.assign(new Error("Something failed"), {
      digest: "digest-1",
    });

    reportApplicationError(error, { route: "dashboard", retryable: false });

    const payload = JSON.parse(errorLog.mock.calls[0][0]);
    expect(payload).toEqual(
      expect.objectContaining({
        type: "application-error",
        timestamp: "2026-01-01T00:00:00.000Z",
        environment: "development",
        release: "1.2.3",
        error: expect.objectContaining({
          name: "Error",
          message: "Something failed",
          digest: "digest-1",
        }),
        context: { route: "dashboard", retryable: false },
      }),
    );
  });

  it("logs web vitals with optional browser fields", async () => {
    vi.stubEnv("NODE_ENV", "test");
    const infoLog = vi.spyOn(console, "info").mockImplementation(() => {});
    vi.stubGlobal("window", {
      location: { href: "https://app.example.test/dashboard" },
    });
    const { reportWebVital } = await import("./telemetry");

    reportWebVital({
      id: "metric-1",
      name: "LCP",
      value: 123.4,
      rating: "good",
      navigationType: "navigate",
    } as never);

    const payload = JSON.parse(infoLog.mock.calls[0][0]);
    expect(payload).toEqual(
      expect.objectContaining({
        type: "web-vital",
        url: "https://app.example.test/dashboard",
        metric: {
          id: "metric-1",
          name: "LCP",
          value: 123.4,
          rating: "good",
          navigationType: "navigate",
        },
      }),
    );
  });

  it("posts telemetry in production", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv(
      "NEXT_PUBLIC_TELEMETRY_ENDPOINT",
      "https://telemetry.example.test/events",
    );
    const fetchMock = vi.fn().mockResolvedValue(new Response(null));
    vi.stubGlobal("fetch", fetchMock);
    const { reportApplicationError } = await import("./telemetry");

    reportApplicationError(new Error("Production failure"));

    expect(fetchMock).toHaveBeenCalledWith(
      "https://telemetry.example.test/events",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        body: expect.stringContaining("Production failure"),
      }),
    );
  });

  it("reports delivery failures without throwing into the app", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv(
      "NEXT_PUBLIC_TELEMETRY_ENDPOINT",
      "https://telemetry.example.test/events",
    );
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    const errorLog = vi.spyOn(console, "error").mockImplementation(() => {});
    const { reportWebVital } = await import("./telemetry");

    reportWebVital({ id: "metric-1", name: "CLS", value: 0.1 } as never);
    await vi.waitFor(() => expect(errorLog).toHaveBeenCalledOnce());

    expect(errorLog.mock.calls[0][0]).toContain("telemetry-delivery-error");
    expect(errorLog.mock.calls[0][0]).toContain("offline");
  });
});
