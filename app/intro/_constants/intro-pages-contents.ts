import IntroPageContent from "../_interfaces/intro-page-content";

const IMAGES_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_ASSETS_URL;

export const INTRO_PAGES_CONTENTS: IntroPageContent[] = [
  {
    id: 1,
    title: "حساب رسی دقیق شرکا",
    description:
      "سهم هر شریک خودرو در پایان ماه به صورت اتوماتیک محاسبه می گردد",
    imageLink: IMAGES_BASE_URL + "intro-1.webp",
    imageWidth: 774,
    imageHeight: 562,
  },
  {
    id: 2,
    title: "افزودن شرکا به ناوگان",
    description:
      "شرکا را با سهم های مشخص و مجزا به هر خودرو اضافه کنید تا نظارت و حساب رسی دقیق تری داشته باشید",
    imageLink: IMAGES_BASE_URL + "intro-2.webp",
    imageWidth: 610,
    imageHeight: 747,
  },
  {
    id: 3,
    title: "تخصیص راننده به هر ناوگان",
    description:
      "می توانید برای هر ناوگان راننده تخصیص دهید. قرارداد او را مشخص کنید تا محاسبات حقوق و مزایا او به صورت اتوماتیک انجام شود",
    imageLink: IMAGES_BASE_URL + "intro-3.webp",
    imageWidth: 529,
    imageHeight: 540,
  },
  {
    id: 4,
    title: "ثبت هزینه ها",
    description:
      "با امکان ثبت هزینه ها در اپلیکیشن سهمیتو بلافاصله بعد از پرداخت هزینه ان را ثبت کنید و به راحتی در پایان ماه گزارش بگیرید",
    imageLink: IMAGES_BASE_URL + "intro-4.webp",
    imageWidth: 498,
    imageHeight: 338,
  },
  {
    id: 5,
    title: "ثبت و اطلاع رسانی تعمیرات دوره ای",
    description: "ثبت تعمیرات دوره ای مانند تعویض روغن، تعویض لنت ترمز و ...",
    imageLink: IMAGES_BASE_URL + "intro-5.webp",
    imageWidth: 341,
    imageHeight: 475,
  },
];
