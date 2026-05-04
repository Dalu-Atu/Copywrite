import AboutPage from "../../ui/AboutPage";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutPage" });

  const localePath = locale === "en" ? "" : `/${locale}`;

  return {
    title: t("meta_title"),
    description: t("meta_desc"),
    alternates: {
      canonical: `https://noteocr.com${localePath}/about`,
      languages: {
        "x-default": "https://noteocr.com/about",
        en: "https://noteocr.com/about",
        tr: "https://noteocr.com/tr/about",
        es: "https://noteocr.com/es/about",
        zh: "https://noteocr.com/zh/about",
        hi: "https://noteocr.com/hi/about",
        de: "https://noteocr.com/de/about",
        ja: "https://noteocr.com/ja/about",
        fr: "https://noteocr.com/fr/about",
        "pt-br": "https://noteocr.com/pt-br/about",
        da: "https://noteocr.com/da/about",
        fi: "https://noteocr.com/fi/about",
        it: "https://noteocr.com/it/about",
        nl: "https://noteocr.com/nl/about",
        no: "https://noteocr.com/no/about",
        sv: "https://noteocr.com/sv/about",
      },
    },
    openGraph: {
      title: t("meta_title"),
      description: t("meta_desc"),
      url: `https://noteocr.com${localePath}/about`,
      siteName: "NoteOCR",
      images: [{ url: "/icon.png", width: 1200, height: 630, alt: "NoteOCR" }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta_title"),
      description: t("meta_desc"),
      images: ["/icon.png"],
    },
  };
}

export default function About() {
  return <AboutPage />;
}
