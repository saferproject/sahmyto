import type { NextWebVitalsMetric } from "next/app";

type ErrorContext = Record<string, boolean | number | string | undefined>;

type TelemetryPayload =
  | {
      type: "application-error";
      timestamp: string;
      environment: string;
      release?: string;
      url?: string;
      error: {
        name: string;
        message: string;
        stack?: string;
        digest?: string;
      };
      context: ErrorContext;
    }
  | {
      type: "web-vital";
      timestamp: string;
      environment: string;
      release?: string;
      url?: string;
      metric: {
        id: string;
        name: string;
        value: number;
        rating?: string;
        navigationType?: string;
      };
    };

const telemetryEndpoint = process.env.NEXT_PUBLIC_TELEMETRY_ENDPOINT;

function sendTelemetry(payload: TelemetryPayload) {
  const serializedPayload = JSON.stringify(payload);

  if (process.env.NODE_ENV !== "production" || !telemetryEndpoint) {
    const log =
      payload.type === "application-error" ? console.error : console.info;
    log(serializedPayload);
    return;
  }

  void fetch(telemetryEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: serializedPayload,
    keepalive: true,
  }).catch((reportingError: unknown) => {
    console.error(
      JSON.stringify({
        type: "telemetry-delivery-error",
        timestamp: new Date().toISOString(),
        message:
          reportingError instanceof Error
            ? reportingError.message
            : "Unknown telemetry delivery error",
      }),
    );
  });
}

export function reportApplicationError(
  error: Error & { digest?: string },
  context: ErrorContext = {},
) {
  sendTelemetry({
    type: "application-error",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    release: process.env.NEXT_PUBLIC_APP_VERSION,
    url: typeof window === "undefined" ? undefined : window.location.href,
    error: {
      name: error.name,
      message: error.message,
      stack: error.stack,
      digest: error.digest,
    },
    context,
  });
}

export function reportWebVital(metric: NextWebVitalsMetric) {
  sendTelemetry({
    type: "web-vital",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    release: process.env.NEXT_PUBLIC_APP_VERSION,
    url: typeof window === "undefined" ? undefined : window.location.href,
    metric: {
      id: metric.id,
      name: metric.name,
      value: metric.value,
      rating:
        "rating" in metric && typeof metric.rating === "string"
          ? metric.rating
          : undefined,
      navigationType:
        "navigationType" in metric && typeof metric.navigationType === "string"
          ? metric.navigationType
          : undefined,
    },
  });
}
