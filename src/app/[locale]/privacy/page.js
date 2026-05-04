import PrivacyPolicy from "../../ui/PrivacyPolicy";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PrivacyPage" });
  const localePath = locale === "en" ? "" : `/${locale}`; // 👈 same helper logic

  return {
    title: t("meta_title"),
    description: t("meta_desc"),
    alternates: {
      canonical: `https://noteocr.com${localePath}/privacy`,
      languages: {
        "x-default": "https://noteocr.com/privacy",
        en: "https://noteocr.com/privacy",
        es: "https://noteocr.com/es/privacy",
        tr: "https://noteocr.com/tr/privacy",
        zh: "https://noteocr.com/zh/privacy",
        hi: "https://noteocr.com/hi/privacy",
        de: "https://noteocr.com/de/privacy",
        ja: "https://noteocr.com/ja/privacy",
        fr: "https://noteocr.com/fr/privacy",
        "pt-br": "https://noteocr.com/pt-br/privacy",
        da: "https://noteocr.com/da/privacy",
        fi: "https://noteocr.com/fi/privacy",
        it: "https://noteocr.com/it/privacy",
        nl: "https://noteocr.com/nl/privacy",
        no: "https://noteocr.com/no/privacy",
        sv: "https://noteocr.com/sv/privacy",
      },
    },
    openGraph: {
      title: t("og_title"),
      description: t("og_desc"),
      url: `https://noteocr.com${localePath}/privacy`,
      type: "website",
    },
  };
}

export default function Privacy() {
  return <PrivacyPolicy />;
}
