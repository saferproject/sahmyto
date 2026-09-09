"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

import CompatibilityError from "@/app/_errors/compatibility-error";
import { reportApplicationError } from "@/app/_utilities/telemetry";

import ErrorContainer from "./error-container";

type ProductionErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  error: Error | null;
};

class ErrorBoundary extends Component<
  ProductionErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    reportApplicationError(error, {
      boundary: "production-root",
      compatibility: error instanceof CompatibilityError,
      componentStack: info.componentStack ?? undefined,
    });
  }

  private reload = () => {
    window.location.reload();
  };

  render() {
    const { error } = this.state;

    if (!error) return this.props.children;

    if (error instanceof CompatibilityError) {
      return (
        <ErrorContainer
          title={error.title}
          message={error.message}
          onAction={this.reload}
        />
      );
    }

    return (
      <ErrorContainer
        message="خطای غیرمنتظره‌ای رخ داده است. لطفاً صفحه را دوباره بارگذاری کنید."
        onAction={this.reload}
      />
    );
  }
}

/**
 * Keeps the framework's development error overlay intact while providing a
 * resilient last-resort UI for errors thrown while rendering in production.
 */
export default function ProductionErrorBoundary({
  children,
}: ProductionErrorBoundaryProps) {
  if (process.env.NODE_ENV !== "production") return children;

  return <ErrorBoundary>{children}</ErrorBoundary>;
}
