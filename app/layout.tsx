import type { Metadata, Viewport } from "next";

import "./globals.css";

import { YekanBakhFont } from "./_assets/fonts/fonts";

export const metadata: Metadata = {
  title: "سهمیتو",
  description:
    "Web application for income and expance managment for transportations with all types of vehicles",
  authors: { name: "Amir Allahdadian", url: "https://github.com/amir141592" },
};

// viewport-fit=cover exposes env(safe-area-inset-*) so bottom UI (the dashboard
// footer nav) can clear the mobile browser/system navigation bar.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
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
