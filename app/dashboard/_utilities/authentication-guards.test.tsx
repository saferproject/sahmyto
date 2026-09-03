// @vitest-environment jsdom

import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const routerReplaceMock = vi.hoisted(() => vi.fn());
const setUserMock = vi.hoisted(() => vi.fn());
const clearAuthSessionMock = vi.hoisted(() => vi.fn());
const markAuthSessionMock = vi.hoisted(() => vi.fn());
const profileState = vi.hoisted(() => ({
  data: { data: { id: 7 }, message: "ok" },
  isSuccess: false,
  isError: false,
}));
const profileHookMock = vi.hoisted(() => vi.fn(() => profileState));

vi.mock("@mui/material", () => ({ CircularProgress: "span" }));
vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: routerReplaceMock }),
}));
vi.mock("../_hooks/use-get-profile-info-endpoint", () => ({
  default: profileHookMock,
}));
vi.mock("@/app/_providers/user-info-provider", () => ({
  useUserInfoStore: (selector: (state: unknown) => unknown) =>
    selector({ setUser: setUserMock }),
}));
vi.mock("@/app/_utilities/auth-session", () => ({
  clearAuthSession: clearAuthSessionMock,
  markAuthSession: markAuthSessionMock,
}));

import { AuthenticationGuard } from "./authentication-guard";
import LoginSessionGuard from "@/app/login/_utilities/login-session-guard";

beforeEach(() => {
  vi.clearAllMocks();
  window.localStorage.clear();
  profileState.data = { data: { id: 7 }, message: "ok" };
  profileState.isSuccess = false;
  profileState.isError = false;
});

afterEach(cleanup);

describe("AuthenticationGuard", () => {
  it("redirects and clears the session flag when local credentials are missing", async () => {
    render(
      <AuthenticationGuard>
        <span>protected</span>
      </AuthenticationGuard>,
    );

    await waitFor(() =>
      expect(routerReplaceMock).toHaveBeenCalledWith("/login"),
    );
    expect(clearAuthSessionMock).toHaveBeenCalledOnce();
    expect(screen.queryByText("protected")).toBeNull();
  });

  it("hydrates the user and renders protected content after profile success", async () => {
    window.localStorage.setItem("token", "token-1");
    window.localStorage.setItem("user", "stored-user");
    profileState.data = {
      data: { id: 8 },
      message: "ok",
    };
    profileState.isSuccess = true;

    render(
      <AuthenticationGuard>
        <span>protected</span>
      </AuthenticationGuard>,
    );

    expect(screen.getByText("protected")).toBeTruthy();
    await waitFor(() => expect(markAuthSessionMock).toHaveBeenCalledOnce());
    expect(setUserMock).toHaveBeenCalledWith({ id: 8 });
    expect(window.localStorage.getItem("user")).toBe(JSON.stringify({ id: 8 }));
  });

  it("reacts when another tab clears the token", async () => {
    window.localStorage.setItem("token", "token-1");
    window.localStorage.setItem("user", "stored-user");
    profileState.isSuccess = true;
    render(
      <AuthenticationGuard>
        <span>protected</span>
      </AuthenticationGuard>,
    );

    window.dispatchEvent(
      new StorageEvent("storage", { key: "token", newValue: null }),
    );

    await waitFor(() =>
      expect(routerReplaceMock).toHaveBeenCalledWith("/login"),
    );
  });
});

describe("LoginSessionGuard", () => {
  it("renders login content and disables profile lookup without a token", () => {
    render(
      <LoginSessionGuard>
        <span>login</span>
      </LoginSessionGuard>,
    );

    expect(screen.getByText("login")).toBeTruthy();
    expect(profileHookMock).toHaveBeenCalledWith({
      enabled: false,
      redirectOnUnauthorized: false,
    });
  });

  it("validates an existing token and redirects authenticated users", async () => {
    window.localStorage.setItem("token", "token-1");
    profileState.data = { data: { id: 9 }, message: "ok" };
    profileState.isSuccess = true;

    render(
      <LoginSessionGuard>
        <span>login</span>
      </LoginSessionGuard>,
    );

    expect(screen.queryByText("login")).toBeNull();
    expect(profileHookMock).toHaveBeenCalledWith({
      enabled: true,
      redirectOnUnauthorized: false,
    });
    await waitFor(() => expect(setUserMock).toHaveBeenCalledWith({ id: 9 }));
    expect(routerReplaceMock).toHaveBeenCalledWith("/dashboard");
  });

  it("clears invalid local authentication after a profile error", async () => {
    window.localStorage.setItem("token", "invalid");
    window.localStorage.setItem("user", "stored-user");
    profileState.isError = true;

    render(
      <LoginSessionGuard>
        <span>login</span>
      </LoginSessionGuard>,
    );

    await waitFor(() =>
      expect(window.localStorage.getItem("token")).toBeNull(),
    );
    expect(window.localStorage.getItem("user")).toBeNull();
  });
});
