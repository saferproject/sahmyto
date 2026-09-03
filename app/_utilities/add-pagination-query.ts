export default function addPaginationQuery(path: string, page: number) {
  const separator = path.includes("?") ? "&" : "?";

  return `${path}${separator}paginate=1&page=${page}`;
}
