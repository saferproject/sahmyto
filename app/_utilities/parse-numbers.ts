export default function parseNumber(value: string | number | null | undefined) {
  if (value === null || value === undefined) return 0;

  const digits = String(value)
    .replace(/[۰-۹]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹".indexOf(digit).toString())
    .replace(/\D/g, "");

  return digits === "" ? 0 : Number(digits);
}
