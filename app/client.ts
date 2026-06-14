"use client";

import createQueryParams from "./_utilities/create-query-params";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function Get<ResBodyType, QueryParamsType = null>(
  path: string,
  queryParams: QueryParamsType,
  headers?: Record<string, string> | null,
): Promise<ResBodyType> {
  const res = await fetch(
    `${baseUrl}${path}${createQueryParams(queryParams)}`,
    {
      method: "GET",
      headers: {
        token: "VMfevxtX0gh1glTKkYNOdqqsroZ2L0H2kO36ombVaZM=",
        ...headers,
      },
      cache: "no-cache",
    },
  );

  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

export async function Post<ReqBodyType, ResBodyType>(
  path: string,
  body: ReqBodyType,
  headers?: Record<string, string> | null,
): Promise<ResBodyType> {
  const res = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: {
      token: "VMfevxtX0gh1glTKkYNOdqqsroZ2L0H2kO36ombVaZM=",
      ...headers,
    },
    body: JSON.stringify(body),
    cache: "no-cache",
  });

  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

export async function Put<ReqBodyType, ResBodyType>(
  path: string,
  body: ReqBodyType,
  headers?: Record<string, string> | null,
): Promise<ResBodyType> {
  const res = await fetch(`${baseUrl}${path}`, {
    method: "PUT",
    headers: {
      token: "VMfevxtX0gh1glTKkYNOdqqsroZ2L0H2kO36ombVaZM=",
      ...headers,
    },
    body: JSON.stringify(body),
    cache: "no-cache",
  });

  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}

export async function Delete<QueryParamsType = null>(
  path: string,
  queryParams: QueryParamsType,
  headers?: Record<string, string> | null,
) {
  const res = await fetch(
    `${baseUrl}${path}${createQueryParams(queryParams)}`,
    {
      method: "DELETE",
      headers: {
        token: "VMfevxtX0gh1glTKkYNOdqqsroZ2L0H2kO36ombVaZM=",
        ...headers,
      },
      cache: "no-cache",
    },
  );

  return res;
}
