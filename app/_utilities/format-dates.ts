import dayjs, { type Dayjs } from "dayjs";

export default function formatDate(
  value: Dayjs | string | number | Date,
  format = "YYYY/MM/DD",
) {
  return dayjs(value).format(format);
}
