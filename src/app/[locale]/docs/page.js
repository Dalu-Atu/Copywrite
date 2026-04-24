import DocsPage from "../../ui/DocsPage";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "DocsPage" });

  return {
    title: t("meta_title"),
    description: t("meta_desc"),
    alternates: {
      canonical: `https://noteocr.com/${locale}/docs`,
      languages: {
        en: "https://noteocr.com/en/docs",
        es: "https://noteocr.com/es/docs",
        tr: "https://noteocr.com/tr/docs",
        zh: "https://noteocr.com/zh/docs",
        hi: "https://noteocr.com/hi/docs",
        de: "https://noteocr.com/de/docs",
        ja: "https://noteocr.com/ja/docs",
        fr: "https://noteocr.com/fr/docs",
        "pt-br": "https://noteocr.com/pt-br/docs",
        da: "https://noteocr.com/da/docs",
        fi: "https://noteocr.com/fi/docs",
        it: "https://noteocr.com/it/docs",
        nl: "https://noteocr.com/nl/docs",
        no: "https://noteocr.com/no/docs",
        sv: "https://noteocr.com/sv/docs",
      },
    },
    openGraph: {
      title: t("og_title"),
      description: t("og_desc"),
      url: `https://noteocr.com/${locale}/docs`,
      type: "article",
    },
  };
}

export default function Docs() {
  const t = useTranslations("DocsPage");
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            headline: t("meta_title"),
            description: t("meta_desc"),
            url: `https://noteocr.com/${t("locale")}/docs`,
          }),
        }}
      />
      <DocsPage />
    </>
  );
}
