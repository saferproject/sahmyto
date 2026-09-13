import { beforeEach, describe, expect, it, vi } from "vitest";

const fetchWithAuthMock = vi.hoisted(() => vi.fn());

vi.mock("@/app/proxy", () => ({ fetchWithAuth: fetchWithAuthMock }));

import { http } from "./http";

beforeEach(() => {
  fetchWithAuthMock.mockReset();
  fetchWithAuthMock.mockResolvedValue({ data: undefined, message: "" });
});

describe("http", () => {
  it("encodes query parameters alongside pagination and preserves falsy values", async () => {
    await http.get("resource?paginate=1&page=2#section", {
      queryParams: {
        "notEq-full_name": "رضا & علی",
        owner__phone: "09934142558",
        price: 0,
        enabled: false,
        missing: null,
      },
    });
    const [path] = fetchWithAuthMock.mock.calls[0];
    const url = new URL(path, "https://example.test/");
    expect(Object.fromEntries(url.searchParams)).toEqual({
      paginate: "1",
      page: "2",
      "notEq-full_name": "رضا & علی",
      owner__phone: "09934142558",
      price: "0",
      enabled: "false",
    });
    expect(url.hash).toBe("#section");
  });

  it("adds a query to a bare path and leaves empty queries unchanged", async () => {
    await http.get("resource", { queryParams: { price: 100 } });
    expect(fetchWithAuthMock.mock.calls[0][0]).toBe("resource?price=100");
    await http.get("resource?paginate=1", {
      queryParams: { price: undefined },
    });
    expect(fetchWithAuthMock.mock.calls[1][0]).toBe("resource?paginate=1");
  });
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
