import CareerPage from "../../ui/CareersPage";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CareersPage" });

  return {
    title: t("meta_title"),
    description: t("meta_desc"),
    alternates: {
      canonical: `https://noteocr.com/${locale}/careers`,
      languages: {
        en: "https://noteocr.com/en/careers",
        es: "https://noteocr.com/es/careers",
        tr: "https://noteocr.com/tr/careers",
        zh: "https://noteocr.com/zh/careers",
        hi: "https://noteocr.com/hi/careers",
        de: "https://noteocr.com/de/careers",
        ja: "https://noteocr.com/ja/careers",
        fr: "https://noteocr.com/fr/careers",
        "pt-br": "https://noteocr.com/pt-br/careers",
        da: "https://noteocr.com/da/careers",
        fi: "https://noteocr.com/fi/careers",
        it: "https://noteocr.com/it/careers",
        nl: "https://noteocr.com/nl/careers",
        no: "https://noteocr.com/no/careers",
        sv: "https://noteocr.com/sv/careers",
      },
    },
    openGraph: {
      title: t("og_title"),
      description: t("og_desc"),
      url: `https://noteocr.com/${locale}/careers`,
      type: "website",
    },
  };
}

export default function Career() {
  const t = useTranslations("CareersPage");
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: t("breadcrumb_home"),
                item: "https://noteocr.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: t("breadcrumb_careers"),
                item: `https://noteocr.com/${t("locale")}/careers`,
              },
            ],
          }),
        }}
      />
      <CareerPage />
    </>
  );
}
