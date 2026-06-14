export default function createQueryParams<QueryParamsType>(
  queryParams: QueryParamsType | null,
) {
  if (!queryParams) return "";

  const query = Object.entries(queryParams)
    .filter(([, value]) => value !== null && value !== undefined)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
    )
    .join("&");

  return query ? `?${query}` : "";
}
