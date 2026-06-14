import BaseResponse from "./_interfaces/base-response";

export async function fetchWithAuth<ResponseType>(
  path: string,
  options: RequestInit = {},
): Promise<BaseResponse<ResponseType>> {
  const token = localStorage.getItem("token");

  const headers = new Headers(options.headers);

  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    ...options,
    headers,
    cache: "no-cache",
  });

  // NOTE if status 401, it clears all local storage
  if (response.status === 401) {
    localStorage.clear();

    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  const data: BaseResponse<ResponseType> = await response
    .json()
    .catch(() => null);

  // NOTE Check for other errors (e.g., 500, 400) and handle accordingly here
  if (!response.ok) throw data;

  return data;
}
