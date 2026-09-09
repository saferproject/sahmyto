// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import CompatibilityError from "@/app/_errors/compatibility-error";

import ErrorContainer from "./error-container";
import ProductionErrorBoundary from "./production-error-boundary";

const reportApplicationError = vi.hoisted(() => vi.fn());

vi.mock("@/app/_utilities/telemetry", () => ({ reportApplicationError }));

function ThrowError({ error }: { error: Error }): never {
  throw error;
}

afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
  reportApplicationError.mockReset();
});

describe("ErrorContainer", () => {
  it("renders an accessible message and optional action", () => {
    const onAction = vi.fn();

    render(
      <ErrorContainer
        title="Unsupported browser"
        message="Please update Safari."
        actionLabel="Retry"
        onAction={onAction}
      />,
    );

    expect(screen.getByRole("alert").textContent).toContain(
      "Please update Safari.",
    );
    fireEvent.click(screen.getByRole("button", { name: "Retry" }));
    expect(onAction).toHaveBeenCalledOnce();
  });
});

describe("ProductionErrorBoundary", () => {
  it("does not intercept children outside production", () => {
    vi.stubEnv("NODE_ENV", "development");

    render(
      <ProductionErrorBoundary>
        <p>Application content</p>
      </ProductionErrorBoundary>,
    );

    expect(screen.getByText("Application content")).toBeTruthy();
  });

  it("shows the safe message from a compatibility error in production", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.spyOn(console, "error").mockImplementation(() => {});
    const error = new CompatibilityError(
      "برای استفاده از سهمیتو، مرورگر خود را به‌روزرسانی کنید.",
    );

    render(
      <ProductionErrorBoundary>
        <ThrowError error={error} />
      </ProductionErrorBoundary>,
    );

    expect(screen.getByRole("alert").textContent).toContain(error.message);
    expect(reportApplicationError).toHaveBeenCalledWith(
      error,
      expect.objectContaining({
        boundary: "production-root",
        compatibility: true,
      }),
    );
  });

  it("does not expose unexpected error details in production", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ProductionErrorBoundary>
        <ThrowError error={new Error("Sensitive implementation detail")} />
      </ProductionErrorBoundary>,
    );

    expect(screen.queryByText("Sensitive implementation detail")).toBeNull();
    expect(screen.getByRole("alert").textContent).toContain(
      "خطای غیرمنتظره‌ای رخ داده است.",
    );
  });
});
