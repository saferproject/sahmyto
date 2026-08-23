import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

function createStorage() {
  const values = new Map<string, string>();

  return {
    getItem: vi.fn((key: string) => values.get(key) ?? null),
    setItem: vi.fn((key: string, value: string) => values.set(key, value)),
    removeItem: vi.fn((key: string) => values.delete(key)),
    clear: vi.fn(() => values.clear()),
  };
}

const jsonResponse = (body: unknown, init: ResponseInit = { status: 200 }) =>
  new Response(JSON.stringify(body), {
    ...init,
    headers: { "Content-Type": "application/json", ...init.headers },
  });

async function loadProxy(baseUrl = "https://api.example.test/v1") {
  vi.resetModules();
  vi.stubEnv("NEXT_PUBLIC_API_URL", baseUrl);

  return import("./proxy");
}

beforeEach(() => {
  const localStorage = createStorage();
  vi.stubGlobal("window", {
    localStorage,
    location: { assign: vi.fn(), href: "https://app.example.test/dashboard" },
  });
  vi.stubGlobal("document", { cookie: "" });
  vi.stubGlobal("fetch", vi.fn());
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("fetchWithAuth", () => {
  it("builds a normalized API URL and attaches the bearer token", async () => {
    window.localStorage.setItem("token", "secret-token");
    vi.mocked(fetch).mockResolvedValue(
      jsonResponse({ data: { id: 1 }, message: "ok" }),
    );
    const { fetchWithAuth } = await loadProxy(
      "https://api.example.test/v1/api",
    );

    const result = await fetchWithAuth<{ id: number }>("/users/1", {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    expect(result).toEqual({ data: { id: 1 }, message: "ok" });
    const [url, options] = vi.mocked(fetch).mock.calls[0];
    expect(String(url)).toBe("https://api.example.test/v1/api/users/1");
    expect(options).toEqual(
      expect.objectContaining({
        method: "GET",
        cache: "no-cache",
        signal: expect.any(AbortSignal),
      }),
    );
    expect(new Headers(options?.headers).get("Authorization")).toBe(
      "Bearer secret-token",
    );
    expect(new Headers(options?.headers).get("Accept")).toBe(
      "application/json",
    );
  });

  it("normalizes unwrapped JSON, text, and empty success responses", async () => {
    const { fetchWithAuth } = await loadProxy();
    vi.mocked(fetch)
      .mockResolvedValueOnce(jsonResponse([1, 2, 3]))
      .mockResolvedValueOnce(
        new Response("saved", {
          status: 200,
          headers: { "Content-Type": "text/plain" },
        }),
      )
      .mockResolvedValueOnce(new Response(null, { status: 204 }));

    await expect(fetchWithAuth<number[]>("numbers")).resolves.toEqual({
      data: [1, 2, 3],
      message: "",
    });
    await expect(fetchWithAuth<string>("text")).resolves.toEqual({
      data: "saved",
      message: "",
    });
    await expect(fetchWithAuth<void>("empty")).resolves.toEqual({
      data: undefined,
      message: "",
    });
  });

  it("throws a structured API error with valid field errors", async () => {
    vi.mocked(fetch).mockResolvedValue(
      jsonResponse(
        {
          message: "Validation failed",
          errors: {
            phone: ["Phone is invalid"],
            ignored: ["valid", 2],
          },
        },
        { status: 422, statusText: "Unprocessable Entity" },
      ),
    );
    const { fetchWithAuth } = await loadProxy();

    await expect(fetchWithAuth("users")).rejects.toMatchObject({
      name: "ApiError",
      status: 422,
      message: "Validation failed",
      errors: { phone: ["Phone is invalid"] },
    });
  });

  it("reports malformed JSON as a server-response error", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response("{broken", {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    const { fetchWithAuth } = await loadProxy();

    await expect(fetchWithAuth("broken")).rejects.toMatchObject({
      status: 200,
      message: "The server returned an invalid JSON response",
    });
  });

  it("clears authentication and redirects after an unauthorized response", async () => {
    window.localStorage.setItem("token", "expired");
    window.localStorage.setItem("user", "stored-user");
    vi.mocked(fetch).mockResolvedValue(
      jsonResponse(
        { message: "Unauthorized" },
        { status: 401, statusText: "Unauthorized" },
      ),
    );
    const { fetchWithAuth } = await loadProxy();

    await expect(fetchWithAuth("profile")).rejects.toMatchObject({
      status: 401,
    });
    expect(window.localStorage.removeItem).toHaveBeenCalledWith("token");
    expect(window.localStorage.removeItem).toHaveBeenCalledWith("user");
    expect(window.location.assign).toHaveBeenCalledWith("/login");
    expect(document.cookie).toContain("sahmyto_auth=");
    expect(document.cookie).toContain("max-age=0");
  });

  it("can suppress the unauthorized redirect while still clearing storage", async () => {
    vi.mocked(fetch).mockResolvedValue(
      jsonResponse(
        { message: "Unauthorized" },
        { status: 401, statusText: "Unauthorized" },
      ),
    );
    const { fetchWithAuth } = await loadProxy();

    await expect(
      fetchWithAuth("profile", { redirectOnUnauthorized: false }),
    ).rejects.toMatchObject({ status: 401 });
    expect(window.localStorage.removeItem).toHaveBeenCalledTimes(2);
    expect(window.location.assign).not.toHaveBeenCalled();
  });

  it("converts network failures into connection errors", async () => {
    vi.mocked(fetch).mockRejectedValue(new TypeError("network down"));
    const { fetchWithAuth } = await loadProxy();

    await expect(fetchWithAuth("profile")).rejects.toMatchObject({
      status: 0,
      message: "Unable to connect to the server. Please check your connection.",
    });
  });

  it("preserves caller-triggered abort errors", async () => {
    const controller = new AbortController();
    controller.abort();
    const abortError = new DOMException("Aborted", "AbortError");
    vi.mocked(fetch).mockRejectedValue(abortError);
    const { fetchWithAuth } = await loadProxy();

    await expect(
      fetchWithAuth("profile", { signal: controller.signal }),
    ).rejects.toBe(abortError);
  });

  it("converts timeout aborts into request-timeout errors", async () => {
    vi.spyOn(AbortSignal, "timeout").mockReturnValue(AbortSignal.abort());
    vi.mocked(fetch).mockRejectedValue(
      new DOMException("Aborted", "AbortError"),
    );
    const { fetchWithAuth } = await loadProxy();

    await expect(fetchWithAuth("slow", { timeoutMs: 1 })).rejects.toMatchObject(
      {
        status: 408,
        message: "Request timed out. Please try again.",
      },
    );
  });
});

describe("API base URL configuration", () => {
  it.each(["", "not-an-absolute-url"])(
    "rejects invalid configuration %s",
    async (baseUrl) => {
      vi.resetModules();
      vi.stubEnv("NEXT_PUBLIC_API_URL", baseUrl);

      await expect(import("./proxy")).rejects.toThrow(
        baseUrl
          ? "NEXT_PUBLIC_API_URL must be a valid absolute URL"
          : "NEXT_PUBLIC_API_URL is required",
      );
    },
  );
});
