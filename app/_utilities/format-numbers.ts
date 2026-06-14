export default function formatNumber(number: number) {
  return Intl.NumberFormat("fa-IR").format(number);
}
