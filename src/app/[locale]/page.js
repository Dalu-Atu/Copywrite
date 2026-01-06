

import HomePage from "../ui/HomePage";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage" });

  return {
    // 1. Core Metadata
    title: t("meta_title"),
    description: t("meta_desc"),

    // 2. FIX: Favicon & Icons (Adding these back specifically for this route)
    icons: {
      icon: "/favicon.png",
      shortcut: "/logo.png",
      apple: "/logo.png",
    },

    // 3. Hreflang Tags (CRITICAL for SEO)
    // Tells Google about all versions of this page
    alternates: {
      canonical: `https://copywritee.com/${locale}`,
      languages: {
        en: "https://copywritee.com/en",
        tr: "https://copywritee.com/tr",
        es: "https://copywritee.com/es",
        zh: "https://copywritee.com/zh",
        hi: "https://copywritee.com/hi",
        de: "https://copywritee.com/de",
        ja: "https://copywritee.com/ja",
        "pt-br": "https://copywritee.com/pt-br",
        "x-default": "https://copywritee.com/en",
      },
    },

    // 4. Social SEO
    openGraph: {
      title: t("meta_title"),
      description: t("meta_desc"),
      url: `https://copywritee.com/${locale}`,
      siteName: "Copywritee",
      images: [
        {
          url: "/images/copywrite-image002.png",
          width: 1200,
          height: 630,
          alt: "Copywritee Handwriting OCR",
        },
      ],
      locale: locale === "en" ? "en_US" : "es_ES",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: t("meta_title"),
      description: t("meta_desc"),
      images: ["/images/copywrite-image002.png"],
    },
  };
}

export default async function Page() {
  return <HomePage />;
}