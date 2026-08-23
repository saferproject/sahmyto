import dayjs, { type Dayjs } from "dayjs";
import jalaliday from "jalaliday";

dayjs.extend(jalaliday);

export default function formatDate(
  value: Dayjs | string | number | Date,
  format = "YYYY/MM/DD",
) {
  return dayjs(value).format(format);
}

export function formatGregorianDate(value: Dayjs) {
  return dayjs(value).calendar("gregory").format("YYYY-MM-DD");
}
