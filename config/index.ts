import type { Metadata } from "next";

export const siteConfig = {
  name: "Klean",
  shortName: "klean",
  description: "Beautifully designed template.",
  emoji: "🧙",
  backgroundColor: "#fff",
  themeColor: "#000",
  siteUrl: "https://Klean.com",
  category: "Klean",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
  links: {
    twitter: "https://twitter.com/Klean",
    telegram: "https://t.me/Klean",
    github: "https://github.com/Klean",
    docs: "https://docs.Klean.com",
  },
};

export const rootMetadata: Metadata = {
  title: {
    default: "Klean",
    template: "%s | Klean",
  },
  description: "A comprehensive Next.js boilerplate with modern tooling",
  keywords: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  authors: [{ name: "Your Name" }],
  creator: "Klean",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://Klean.com",
    title: "Klean",
    description: "A comprehensive Next.js boilerplate with modern tooling",
    siteName: "Klean",
  },
  twitter: {
    card: "summary_large_image",
    title: "Klean",
    description: "A comprehensive Next.js boilerplate with modern tooling",
    creator: "@Klean",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
