import HomePage from "../ui/HomePage";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage" });

  return {
    // 1. Core Metadata
    title: t("meta_title"),
    description: t("meta_desc"),

    // 3. Hreflang Tags (CRITICAL for SEO)
    // Tells Google about all versions of this page
    alternates: {
      canonical: `https://noteocr.com/${locale}`,
      languages: {
        en: "https://noteocr.com/en",
        tr: "https://noteocr.com/tr",
        es: "https://noteocr.com/es",
        zh: "https://noteocr.com/zh",
        hi: "https://noteocr.com/hi",
        de: "https://noteocr.com/de",
        ja: "https://noteocr.com/ja",
        "pt-br": "https://noteocr.com/pt-br",
        "x-default": "https://noteocr.com/en",
      },
    },

    // 4. Social SEO
    openGraph: {
      title: t("meta_title"),
      description: t("meta_desc"),
      url: `https://noteocr.com/${locale}`,
      siteName: "NoteOCR",
      images: [
        {
          url: "/images/copywrite-image002.png",
          width: 1200,
          height: 630,
          alt: "NoteOCR Handwriting OCR",
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
