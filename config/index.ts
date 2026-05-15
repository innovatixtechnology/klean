import type { Metadata } from "next";

export const siteConfig = {
  name: "Klean Company",
  logo: {
    src: "/klean-logo-transparent.png",
    src2: "/klean-logo-light.png",
    alt: "Klean Company Logo",
  },
  shortName: "Klean Company",
  description: "Klean Company is your trusted partner for premium home services - from cleaning and repairs to grooming and everyday essentials. We are commited to delivering quality, conveninance, and a seamless experiance to modern homes.",
  contact: {
    phone: "+91 9036529150",
    phoneHref: "tel:+919036529150",
    whatsappHref: "https://wa.me/919036529150?text=Hi%20Klean%2C%20I%20want%20to%20book%20a%20service",
    email: "kleancompany19@gmail.com",
    emailHref: "mailto:kleancompany19@gmail.com",
  },
  emoji: "🧙",
  backgroundColor: "#fff",
  themeColor: "#013984",
  siteUrl: "https://kleancompany.com",
  category: "Home Services",
  links: {
    twitter: "https://twitter.com",
    telegram: "https://t.me/klean",
    github: "https://github.com/klean",
    docs: "https://docs.klean.com",
    facebook: "https://www.facebook.com",
    instagram: "https://www.instagram.com",
  },
};

export const rootMetadata: Metadata = {
  title: {
    default: "Klean Company",
    template: "%s | Klean Company",
  },
  description: "A comprehensive Next.js boilerplate with modern tooling",
  keywords: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  authors: [{ name: "Your Name" }],
  creator: "Klean Company",
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
    title: "Klean Company",
    description: "A comprehensive Next.js boilerplate with modern tooling",
    creator: "@Klean Company",
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
