import DocsPage from "../../ui/DocsPage";
import { getTranslations } from "next-intl/server";

// Dynamic metadata generation for SEO
export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: "DocsPage.meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      // Helps Google understand localized versions of the same content
      canonical: `https://noteocr.com/${locale}/docs`,
      languages: {
        "en-US": "https://noteocr.com/en/docs",
        "fr-FR": "https://noteocr.com/fr/docs",
        "ja-JP": "https://noteocr.com/ja/docs",
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `https://noteocr.com/${locale}/docs`,
      siteName: "NoteOcr",
      images: [
        {
          url: "https://noteocr.com/og-docs.png", // Create a dedicated OG image for docs
          width: 1200,
          height: 630,
        },
      ],
      locale: locale,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default function Docs() {
  return <DocsPage />;
}
