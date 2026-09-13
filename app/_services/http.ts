import { fetchWithAuth } from "@/app/proxy";
import type { QueryParams } from "@/app/_types/query-params";
import createQueryParams from "@/app/_utilities/create-query-params";

interface RequestOptions {
  body?: unknown;
  signal?: AbortSignal;
  redirectOnUnauthorized?: boolean;
  queryParams?: QueryParams;
}

function request<ResponseType>(
  method: string,
  path: string,
  { body, signal, redirectOnUnauthorized, queryParams }: RequestOptions = {},
) {
  const query = createQueryParams(queryParams ?? null);
  if (query) {
    const hashIndex = path.indexOf("#");
    const hash = hashIndex === -1 ? "" : path.slice(hashIndex);
    const base = hashIndex === -1 ? path : path.slice(0, hashIndex);
    path = `${base}${base.includes("?") ? `&${query.slice(1)}` : query}${hash}`;
  }
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
