import "./globals.css";

import type { Metadata, Viewport } from "next";
import NextTopLoader from "nextjs-toploader";
import ScrollToTop from "@/components/ScrollToTop";
import { rootMetadata, siteConfig } from "@/config";
import { geistMono, geistSans } from "@/lib/fonts";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

export const metadata: Metadata = { ...rootMetadata };

export const viewport: Viewport = {
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: siteConfig.themeColor,
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: siteConfig.themeColor,
    },
  ],
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 5,
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} min-h-dvh antialiased`}>
        <NextTopLoader color="var(--primary)" showSpinner={false} />
        <Header />
        <main className="flex-grow relative z-10">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
