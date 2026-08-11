export default function isValidQueryId(
  id: number | null | undefined,
): id is number {
  return typeof id === "number" && Number.isInteger(id) && id > 0;
}
