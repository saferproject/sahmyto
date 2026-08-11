import ApiError from "./_errors/api-error";
import BaseResponse, { type ApiFieldErrors } from "./_interfaces/base-response";

const DEFAULT_REQUEST_TIMEOUT_MS = 15_000;
const AUTH_STORAGE_KEYS = ["token", "user"] as const;

interface FetchWithAuthOptions extends RequestInit {
  redirectOnUnauthorized?: boolean;
  timeoutMs?: number;
}

function getApiBaseUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!configuredUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is required");
  }

  try {
    const url = new URL(configuredUrl);

    if (!url.pathname.endsWith("/")) url.pathname += "/";

    return url;
  } catch {
    throw new Error("NEXT_PUBLIC_API_URL must be a valid absolute URL");
  }
}

const API_BASE_URL = getApiBaseUrl();

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function getFieldErrors(value: unknown): ApiFieldErrors | undefined {
  if (!isRecord(value)) return undefined;

  const entries = Object.entries(value).filter(
    (entry): entry is [string, string[]] =>
      Array.isArray(entry[1]) &&
      entry[1].every((item) => typeof item === "string"),
  );

  return entries.length ? Object.fromEntries(entries) : undefined;
}

async function parseResponseBody(response: Response): Promise<unknown> {
  if (response.status === 204 || response.status === 205) return undefined;

  const body = await response.text();

  if (!body.trim()) return undefined;

  if (!response.headers.get("content-type")?.includes("json")) return body;

  try {
    return JSON.parse(body) as unknown;
  } catch {
    throw new ApiError({
      status: response.status,
      message: "The server returned an invalid JSON response",
    });
  }
}

function getResponseMessage(body: unknown, fallback: string) {
  if (isRecord(body) && typeof body.message === "string") return body.message;
  if (typeof body === "string") return body;

  return fallback;
}

function normalizeSuccessResponse<ResponseType>(
  body: unknown,
): BaseResponse<ResponseType> {
  if (
    isRecord(body) &&
    ("data" in body || "message" in body || "errors" in body)
  ) {
    return {
      data: body.data as ResponseType,
      message: typeof body.message === "string" ? body.message : "",
      errors: getFieldErrors(body.errors),
    };
  }

  return {
    data: body as ResponseType,
    message: "",
  };
}

function clearAuthStorage() {
  AUTH_STORAGE_KEYS.forEach((key) => window.localStorage.removeItem(key));
}

export async function fetchWithAuth<ResponseType>(
  path: string,
  options: FetchWithAuthOptions = {},
): Promise<BaseResponse<ResponseType>> {
  const {
    redirectOnUnauthorized = true,
    timeoutMs = DEFAULT_REQUEST_TIMEOUT_MS,
    signal,
    ...requestOptions
  } = options;
  const token = window.localStorage.getItem("token");
  const headers = new Headers(requestOptions.headers);
  const timeoutSignal = AbortSignal.timeout(timeoutMs);
  const requestSignal = signal
    ? AbortSignal.any([signal, timeoutSignal])
    : timeoutSignal;

  if (token) headers.set("Authorization", `Bearer ${token}`);

  try {
    const response = await fetch(
      new URL(path.replace(/^\/+/, ""), API_BASE_URL),
      {
        ...requestOptions,
        headers,
        signal: requestSignal,
        cache: "no-cache",
      },
    );

    if (response.status === 401) {
      clearAuthStorage();

      if (redirectOnUnauthorized) window.location.assign("/login");
    }

    const body = await parseResponseBody(response);

    if (!response.ok) {
      const errors = isRecord(body) ? getFieldErrors(body.errors) : undefined;

      throw new ApiError({
        status: response.status,
        message: getResponseMessage(
          body,
          response.statusText ||
            `Request failed with status ${response.status}`,
        ),
        errors,
      });
    }

    return normalizeSuccessResponse<ResponseType>(body);
  } catch (error) {
    if (error instanceof ApiError || signal?.aborted) throw error;

    if (timeoutSignal.aborted) {
      throw new ApiError({
        status: 408,
        message: "Request timed out. Please try again.",
      });
    }

    throw new ApiError({
      status: 0,
      message: "Unable to connect to the server. Please check your connection.",
    });
  }
}
