// @vitest-environment jsdom

import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const mutateMock = vi.hoisted(() => vi.fn());
const setUserMock = vi.hoisted(() => vi.fn());
const routerPushMock = vi.hoisted(() => vi.fn());
const markAuthSessionMock = vi.hoisted(() => vi.fn());
const clearPendingOtpMock = vi.hoisted(() => vi.fn());

vi.mock("react-otp-input", async () => {
  const React = await import("react");

  return {
    default: ({
      value,
      onChange,
    }: {
      value: string;
      onChange: (value: string) => void;
    }) =>
      React.createElement("input", {
        "data-testid": "otp",
        value,
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
          onChange(event.target.value),
      }),
  };
});
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: routerPushMock }),
}));
vi.mock("../_hooks/use-verify-endpoint", () => ({
  default: () => ({ mutate: mutateMock }),
}));
vi.mock("@/app/_providers/user-info-provider", () => ({
  useUserInfoStore: (selector: (state: unknown) => unknown) =>
    selector({ phone: "09123456789", setUser: setUserMock }),
}));
vi.mock("@/app/_utilities/auth-session", () => ({
  markAuthSession: markAuthSessionMock,
}));
vi.mock("../_utilities/pending-otp-storage", () => ({
  clearPendingOtp: clearPendingOtpMock,
}));

import VerifyForm from "./verify-form";

beforeEach(() => {
  vi.clearAllMocks();
  window.localStorage.clear();
});

afterEach(cleanup);

describe("verification form", () => {
  it.each([
    [true, "/dashboard/karbooms"],
    [false, "/dashboard/profile"],
  ] as const)(
    "persists a verified session and routes complete=%s users",
    async (isCompleteProfile, destination) => {
      render(<VerifyForm />);

      fireEvent.change(screen.getByTestId("otp"), {
        target: { value: "1234" },
      });
      await waitFor(() => expect(mutateMock).toHaveBeenCalledOnce());
      expect(mutateMock).toHaveBeenCalledWith(
        { code: "1234", phone: "09123456789" },
        expect.any(Object),
      );

      const user = { id: 7, is_complete_profile: isCompleteProfile };
      mutateMock.mock.calls[0][1].onSuccess({
        data: { token: "token-1", user },
      });

      expect(window.localStorage.getItem("token")).toBe("token-1");
      expect(window.localStorage.getItem("user")).toBe(JSON.stringify(user));
      expect(markAuthSessionMock).toHaveBeenCalledOnce();
      expect(setUserMock).toHaveBeenCalledWith(user);
      expect(clearPendingOtpMock).toHaveBeenCalledOnce();
      expect(routerPushMock).toHaveBeenCalledWith(destination);
    },
  );

  it("does not create a session when verification has no token", async () => {
    render(<VerifyForm />);
    fireEvent.change(screen.getByTestId("otp"), {
      target: { value: "1234" },
    });
    await waitFor(() => expect(mutateMock).toHaveBeenCalledOnce());

    mutateMock.mock.calls[0][1].onSuccess({
      data: { token: "", user: { id: 7 } },
    });

    expect(window.localStorage.getItem("token")).toBeNull();
    expect(markAuthSessionMock).not.toHaveBeenCalled();
    expect(routerPushMock).not.toHaveBeenCalled();
  });

  it("clears the entered OTP after an API error", async () => {
    render(<VerifyForm />);
    const input = screen.getByTestId("otp") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "1234" } });
    await waitFor(() => expect(mutateMock).toHaveBeenCalledOnce());

    mutateMock.mock.calls[0][1].onError();

    await waitFor(() => expect(input.value).toBe(""));
  });
});
