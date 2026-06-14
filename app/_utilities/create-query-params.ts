export default function createQueryParams<QueryParamsType>(queryParams: QueryParamsType | null) {
  if (queryParams)
    return (
      "?" +
      Object.entries(queryParams)
        .map((param) => param.join("="))
        .join("&")
    );
  else return "";
}
