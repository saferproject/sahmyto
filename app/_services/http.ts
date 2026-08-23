import { fetchWithAuth } from "@/app/proxy";

interface RequestOptions {
  body?: unknown;
  signal?: AbortSignal;
  redirectOnUnauthorized?: boolean;
}

function request<ResponseType>(
  method: string,
  path: string,
  { body, signal, redirectOnUnauthorized }: RequestOptions = {},
) {
  return fetchWithAuth<ResponseType>(path, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
    signal,
    redirectOnUnauthorized,
  });
}

export const http = {
  get: <ResponseType>(path: string, options?: RequestOptions) =>
    request<ResponseType>("GET", path, options),
  post: <ResponseType>(path: string, options?: RequestOptions) =>
    request<ResponseType>("POST", path, options),
  put: <ResponseType>(path: string, options?: RequestOptions) =>
    request<ResponseType>("PUT", path, options),
  delete: <ResponseType>(path: string, options?: RequestOptions) =>
    request<ResponseType>("DELETE", path, options),
};
