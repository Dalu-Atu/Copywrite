import TermsOfService from "../../ui/TermsOfService";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "TermsPage" });
  const localePath = locale === "en" ? "" : `/${locale}`; // 👈 same helper logic

  return {
    title: t("meta_title"),
    description: t("meta_desc"),
    alternates: {
      canonical: `https://noteocr.com${localePath}/terms`,
      languages: {
        en: "https://noteocr.com/en/terms",
        es: "https://noteocr.com/es/terms",
        tr: "https://noteocr.com/tr/terms",
        zh: "https://noteocr.com/zh/terms",
        hi: "https://noteocr.com/hi/terms",
        de: "https://noteocr.com/de/terms",
        ja: "https://noteocr.com/ja/terms",
        fr: "https://noteocr.com/fr/terms",
        "pt-br": "https://noteocr.com/pt-br/terms",
        da: "https://noteocr.com/da/terms",
        fi: "https://noteocr.com/fi/terms",
        it: "https://noteocr.com/it/terms",
        nl: "https://noteocr.com/nl/terms",
        no: "https://noteocr.com/no/terms",
        sv: "https://noteocr.com/sv/terms",
      },
    },
    openGraph: {
      title: t("og_title"),
      description: t("og_desc"),
      url: `https://noteocr.com${localePath}/terms`,
      type: "website",
    },
  };
}

export default function Terms() {
  return <TermsOfService />;
}
