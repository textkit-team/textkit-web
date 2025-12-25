// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "TextKit – Emoji Search & Copy",
    template: "%s | TextKit",
  },
  description:
    "TextKit is a simple toolkit for text utilities. Search and copy emojis with Korean and English keywords.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "TextKit – Emoji Search & Copy",
    description: "Search and copy emojis easily.",
    url: "https://www.textkit.kr",
    siteName: "TextKit",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "TextKit Emoji Search & Copy",
      },
    ],
    type: "website",
  },
  metadataBase: new URL("https://www.textkit.kr"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-DHL15KLXNN`}
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DHL15KLXNN', {
              anonymize_ip: true,
            });
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
