// @vitest-environment jsdom

import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const formMocks = vi.hoisted(() => ({
  values: {} as Record<string, unknown>,
  register: vi.fn(() => ({})),
  control: {},
  handleSubmit: vi.fn(
    (submit: (values: Record<string, unknown>) => void) =>
      (event?: { preventDefault?: () => void }) => {
        event?.preventDefault?.();
        submit(formMocks.values);
      },
  ),
  setError: vi.fn(),
  formState: { errors: {} },
}));
const loginMutationMock = vi.hoisted(() => vi.fn());
const profileMutationMock = vi.hoisted(() => vi.fn());
const setPhoneMock = vi.hoisted(() => vi.fn());
const setUserMock = vi.hoisted(() => vi.fn());
const routerPushMock = vi.hoisted(() => vi.fn());
const hasActivePendingOtpMock = vi.hoisted(() => vi.fn());
const savePendingOtpMock = vi.hoisted(() => vi.fn());

vi.mock("@mui/material", () => ({
  Accordion: "div",
  AccordionDetails: "div",
  AccordionSummary: "div",
  Button: "button",
  FormControl: "div",
  FormHelperText: "span",
  FormControlLabel: "label",
  Radio: "input",
  RadioGroup: "div",
  TextField: "input",
}));
vi.mock("iconsax-reactjs", () => ({ ArrowDown2: "span" }));
vi.mock("react-hook-form", () => ({
  Controller: ({ render }: { render: (props: unknown) => unknown }) =>
    render({ field: { value: "", onChange: vi.fn() } }),
  useWatch: vi.fn(() => ({ phone: "09123456789" })),
}));
vi.mock("zustand/react/shallow", () => ({
  useShallow: (selector: unknown) => selector,
}));
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: routerPushMock }),
}));
vi.mock("@/app/_components/date-picker-component", () => ({
  default: "input",
}));
vi.mock("@/app/login/_hooks/use-login-form", () => ({
  default: () => formMocks,
}));
vi.mock("@/app/login/_hooks/use-login-user-endpoint", () => ({
  default: () => ({ mutate: loginMutationMock, isPending: false }),
}));
vi.mock("@/app/dashboard/profile/_hooks/use-profile-form", () => ({
  default: () => formMocks,
}));
vi.mock("@/app/dashboard/profile/_hooks/use-complete-profile-endpoint", () => ({
  default: () => ({ mutate: profileMutationMock }),
}));
vi.mock("@/app/login/verify/_utilities/pending-otp-storage", () => ({
  hasActivePendingOtp: hasActivePendingOtpMock,
  savePendingOtp: savePendingOtpMock,
}));
vi.mock("@/app/_providers/user-info-provider", () => ({
  useUserInfoStore: (selector: (state: unknown) => unknown) =>
    selector({
      id: 7,
      phone: "09123456789",
      first_name: "Ali",
      last_name: "Ahmadi",
      father_name: null,
      gender: "male",
      email: null,
      setPhone: setPhoneMock,
      setUser: setUserMock,
    }),
}));

import LoginPage from "./page";
import ApiError from "@/app/_errors/api-error";
import ProfileFormComponent from "@/app/dashboard/profile/_components/profile-form-component";

function submitForm(container: HTMLElement) {
  const form = container.querySelector("form");
  if (!form) throw new Error("Expected component to render a form");
  fireEvent.submit(form);
}

beforeEach(() => {
  vi.clearAllMocks();
  formMocks.values = {};
  hasActivePendingOtpMock.mockReturnValue(false);
});

afterEach(cleanup);

describe("login form submission", () => {
  it("reuses an active OTP challenge without requesting another code", () => {
    formMocks.values = { phone: "09123456789" };
    hasActivePendingOtpMock.mockReturnValue(true);
    const { container } = render(<LoginPage />);

    submitForm(container);

    expect(setPhoneMock).toHaveBeenCalledWith("09123456789");
    expect(loginMutationMock).not.toHaveBeenCalled();
    expect(routerPushMock).toHaveBeenCalledWith("/login/verify");
  });

  it("requests a code, saves pending state, and navigates to verification", () => {
    formMocks.values = { phone: "09123456789" };
    const { container } = render(<LoginPage />);

    submitForm(container);

    expect(loginMutationMock).toHaveBeenCalledWith(
      { phone: "09123456789" },
      expect.any(Object),
    );
    loginMutationMock.mock.calls[0][1].onSuccess({ data: { type: "code" } });
    expect(savePendingOtpMock).toHaveBeenCalledWith("09123456789");
    expect(routerPushMock).toHaveBeenCalledWith("/login/verify");
  });

  it("does not navigate when the login response does not issue a code", () => {
    formMocks.values = { phone: "09123456789" };
    const { container } = render(<LoginPage />);
    submitForm(container);

    loginMutationMock.mock.calls[0][1].onSuccess({ data: { type: "other" } });

    expect(savePendingOtpMock).not.toHaveBeenCalled();
    expect(routerPushMock).not.toHaveBeenCalled();
  });
});

describe("profile form submission", () => {
  it("updates the user store and returns to the dashboard after success", () => {
    formMocks.values = {
      phone: "09123456789",
      first_name: "Ali",
      last_name: "Ahmadi",
      father_name: null,
      gender: "male",
      email: null,
      birthday: null,
    };
    const { container } = render(<ProfileFormComponent />);

    submitForm(container);

    expect(profileMutationMock).toHaveBeenCalledWith(
      formMocks.values,
      expect.any(Object),
    );
    const user = { id: 7, full_name: "Ali Ahmadi" };
    profileMutationMock.mock.calls[0][1].onSuccess({ data: user });
    expect(setUserMock).toHaveBeenCalledWith(user);
    expect(routerPushMock).toHaveBeenCalledWith("/dashboard");
  });

  it("shows API validation messages on matching profile controls", () => {
    formMocks.values = {
      phone: "09123456789",
      first_name: "Ali",
      last_name: "Ahmadi",
      father_name: null,
      gender: "male",
      email: null,
      birthday: null,
    };
    const { container } = render(<ProfileFormComponent />);

    submitForm(container);
    profileMutationMock.mock.calls[0][1].onError(
      new ApiError({
        status: 422,
        message: "Invalid input",
        errors: { first_name: ["First name is invalid"] },
      }),
    );

    expect(formMocks.setError).toHaveBeenCalledWith("first_name", {
      message: "First name is invalid",
      type: "validate",
    });
  });
});
