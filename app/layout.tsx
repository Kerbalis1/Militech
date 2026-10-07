import type { Metadata, Viewport } from "next";
import { asset } from "@/lib/assets";
import "@fontsource/manrope/cyrillic-400.css";
import "@fontsource/manrope/cyrillic-500.css";
import "@fontsource/manrope/cyrillic-600.css";
import "@fontsource/manrope/cyrillic-700.css";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-600.css";
import "@fontsource/manrope/latin-700.css";
import "./globals.css";
const origin =
  process.env.NEXT_PUBLIC_SITE_URL || "https://kerbalis1.github.io";
export const metadata: Metadata = {
  metadataBase: new URL(origin),
  alternates: { canonical: asset("/") },
  title: "MILITECH — строительство домов под ключ",
  description:
    "Дома с продуманной архитектурой. Проектирование, строительство и отделка под ключ. Посмотрите демонстрационные проекты и рассчитайте предварительную стоимость.",
  openGraph: {
    title: "MILITECH — дома, в которых хочется жить",
    description:
      "Архитектура для жизни. Демонстрационный проект строительной компании от ELEMENT DIGITAL.",
    type: "website",
    locale: "ru_RU",
    images: [
      {
        url: asset("/images/og.jpg"),
        width: 1200,
        height: 630,
        alt: "Современный дом MILITECH",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MILITECH — строительство домов",
    images: [asset("/images/og.jpg")],
  },
  robots: { index: false, follow: false },
  icons: { icon: asset("/icon.svg") },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#252923",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
