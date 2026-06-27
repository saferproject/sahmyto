export function transformNumber(num: number): string {
  // اگر عدد 0 باشد، رشته‌ی "صفر" بازگردانده می‌شود
  if (+num === 0) return "صفر";

  // بررسی می‌شود که آیا عدد صحیح، مثبت و در بازه‌ی مجاز است یا خیر
  if (!Number.isInteger(+num) || +num < 0 || +num > 999999999999999) {
    throw new Error("عدد باید صحیح و بین 0 تا 999,999,999,999,999 باشد");
  }

  // تعریف آرایه‌هایی برای اعداد یکان، دهگان، نوجوان (11 تا 19)، صدگان و مقیاس‌ها
  const units: string[] = [
    "",
    "یک",
    "دو",
    "سه",
    "چهار",
    "پنج",
    "شش",
    "هفت",
    "هشت",
    "نه",
  ];

  const teens: string[] = [
    "ده",
    "یازده",
    "دوازده",
    "سیزده",
    "چهارده",
    "پانزده",
    "شانزده",
    "هفده",
    "هجده",
    "نوزده",
  ];

  const tens: string[] = [
    "",
    "",
    "بیست",
    "سی",
    "چهل",
    "پنجاه",
    "شصت",
    "هفتاد",
    "هشتاد",
    "نود",
  ];

  const hundreds: string[] = [
    "",
    "صد",
    "دویست",
    "سیصد",
    "چهارصد",
    "پانصد",
    "ششصد",
    "هفتصد",
    "هشتصد",
    "نهصد",
  ];
  const scales: string[] = [
    "",
    "هزار",
    "میلیون",
    "میلیارد",
    "تریلیون",
    "کوادریلیون",
    "کوئینتیلیون",
  ];

  // تابع کمکی برای تبدیل اعداد سه‌رقمی به حروف فارسی
  function convertThreeDigits(n: number): string {
    let result: string[] = [];

    // بررسی و افزودن مقدار صدگان
    if (n >= 100) {
      result.push(hundreds[Math.floor(n / 100)]);
      n %= 100;
    }

    // بررسی و افزودن مقدار دهگان (اگر عدد بین 20 تا 99 باشد)
    if (n >= 20) {
      result.push(tens[Math.floor(n / 10)]);
      n %= 10;
    } else if (n >= 10) {
      // بررسی و افزودن مقدار نوجوان (اگر عدد بین 10 تا 19 باشد)
      result.push(teens[n - 10]);
      return result.join(" و ");
    }

    // افزودن مقدار یکان (اگر باقی‌مانده بزرگتر از 0 باشد)
    if (n > 0) {
      result.push(units[n]);
    }

    // بازگرداندن رشته‌ی نهایی به صورت جدا شده با " و "
    return result.join(" و ");
  }

  let result: string[] = [];
  let scale: number = 0;

  // پردازش عدد اصلی به بخش‌های سه‌رقمی و تبدیل هر بخش به حروف
  while (+num > 0) {
    const threeDigits: number = +num % 1000; // گرفتن آخرین سه رقم از عدد
    if (threeDigits > 0) {
      const converted: string = convertThreeDigits(threeDigits);
      // افزودن بخش تبدیل شده به نتیجه‌ی نهایی
      result.unshift(`${converted} ${scales[scale]}`.trim());
    }
    num = Math.floor(+num / 1000); // حذف سه رقم پردازش شده
    scale++; // افزایش مقیاس (هزار، میلیون، میلیارد و غیره)
  }

  // بازگرداندن نتیجه‌ی نهایی به صورت یک رشته‌ی واحد با " و " به عنوان جداکننده
  return result.join(" و ");
}
