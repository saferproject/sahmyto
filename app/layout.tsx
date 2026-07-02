import type { Metadata, Viewport } from "next";

import "./globals.css";

import { YekanBakhFont } from "./_assets/fonts/fonts";

export const metadata: Metadata = {
  title: "سهمیتو",
  description:
    "Web application for income and expance managment for transportations with all types of vehicles",
  authors: { name: "Amir Allahdadian", url: "https://github.com/amir141592" },
  keywords: ["nextjs", "abacus"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" className={YekanBakhFont.variable} dir="rtl">
      <body className="antialiased">{children}</body>
    </html>
  );
}
