// Realtime requests capture the session token so an old connection cannot
// authorize its channels with a newly signed-in account's credentials.
export async function reverbRequest<T>(
  path: string,
  token: string,
  signal: AbortSignal,
  body?: unknown,
): Promise<T> {
  const base = process.env.NEXT_PUBLIC_API_URL;
  if (!base) throw new Error("NEXT_PUBLIC_API_URL is required");

  const response = await fetch(
    new URL(path, base.endsWith("/") ? base : `${base}/`),
    {
      method: body === undefined ? "GET" : "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        ...(body === undefined ? {} : { "Content-Type": "application/json" }),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: AbortSignal.any([signal, AbortSignal.timeout(15_000)]),
      cache: "no-store",
      credentials: "omit",
    },
  );
  if (!response.ok) {
    throw new Error(`Realtime request failed: ${response.status}`);
  }
  return response.json() as Promise<T>;
}
