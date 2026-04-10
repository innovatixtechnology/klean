import "./globals.css";

import type { Metadata, Viewport } from "next";
import NextTopLoader from "nextjs-toploader";
import ScrollToTop from "@/components/ScrollToTop";
import { rootMetadata, siteConfig } from "@/config";
import { geistMono, geistSans } from "@/lib/fonts";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { PostHogProvider } from "@/components/Analytics/PostHogProvider";
import { Toaster } from "sonner";
import { Suspense } from "react";
import AppShell from "@/components/AppShell";

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
  modal: React.ReactNode;

}

export default async function RootLayout({ children, modal }: Readonly<Props>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} min-h-dvh antialiased`}>
        <NextTopLoader color="var(--primary)" showSpinner={false} />
        <Suspense fallback={null}>
          <AppShell>
            <PostHogProvider>
              <Header />
              <main className="grow relative z-10">{children}</main>
              {modal}
              <Footer />
              <ScrollToTop />
            </PostHogProvider>
          </AppShell>
        </Suspense>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
