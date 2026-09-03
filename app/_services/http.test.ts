import { beforeEach, describe, expect, it, vi } from "vitest";

const fetchWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@/app/proxy", () => ({ fetchWithAuth: fetchWithAuthMock }));

import { http } from "./http";

beforeEach(() => {
  fetchWithAuthMock.mockReset();
  fetchWithAuthMock.mockResolvedValue({ data: undefined, message: "" });
});

describe("http", () => {
  it.each([
    ["get", "GET"],
    ["post", "POST"],
    ["put", "PUT"],
    ["delete", "DELETE"],
  ] as const)("builds %s requests", async (method, requestMethod) => {
    await http[method]("resource/1");

    expect(fetchWithAuthMock).toHaveBeenCalledWith("resource/1", {
      method: requestMethod,
      headers: { "Content-Type": "application/json" },
      body: undefined,
      signal: undefined,
      redirectOnUnauthorized: undefined,
    });
  });

  it("serializes JSON bodies exactly once", async () => {
    const body = { name: "Fleet", nested: { enabled: true } };

    await http.post("resource", { body });

    expect(fetchWithAuthMock).toHaveBeenCalledWith(
      "resource",
      expect.objectContaining({ body: JSON.stringify(body) }),
    );
  });

  it("forwards abort signals and authorization redirect behavior", async () => {
    const signal = new AbortController().signal;

    await http.get("resource", {
      signal,
      redirectOnUnauthorized: false,
    });

    expect(fetchWithAuthMock).toHaveBeenCalledWith(
      "resource",
      expect.objectContaining({ signal, redirectOnUnauthorized: false }),
    );
  });
});
