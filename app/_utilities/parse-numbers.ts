export default function parseNumber(value: string) {
  const digits = value
    .replace(/[۰-۹]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹".indexOf(digit).toString())
    .replace(/\D/g, "");

  return digits === "" ? NaN : Number(digits);
};