import { beforeEach, describe, expect, it, vi } from "vitest";

const redirectMock = vi.hoisted(() =>
  vi.fn((url) => ({ type: "redirect", url })),
);
const nextMock = vi.hoisted(() => vi.fn(() => ({ type: "next" })));

vi.mock("next/server", () => ({
  NextResponse: { redirect: redirectMock, next: nextMock },
}));

import { config, middleware } from "./middleware";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("dashboard middleware", () => {
  it("redirects visitors without the session flag", () => {
    const request = {
      url: "https://app.example.test/dashboard/karbooms",
      cookies: { get: vi.fn(() => undefined) },
    };

    const response = middleware(request as never);

    expect(redirectMock).toHaveBeenCalledOnce();
    expect(String(redirectMock.mock.calls[0][0])).toBe(
      "https://app.example.test/login",
    );
    expect(response).toEqual(expect.objectContaining({ type: "redirect" }));
  });

  it("allows requests with the session flag", () => {
    const request = {
      url: "https://app.example.test/dashboard",
      cookies: { get: vi.fn(() => ({ value: "1" })) },
    };

    expect(middleware(request as never)).toEqual({ type: "next" });
    expect(nextMock).toHaveBeenCalledOnce();
    expect(redirectMock).not.toHaveBeenCalled();
  });

  it("protects every dashboard route", () => {
    expect(config.matcher).toEqual(["/dashboard/:path*"]);
  });
});
