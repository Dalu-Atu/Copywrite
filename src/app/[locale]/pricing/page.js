import PricingPage from "../../ui/PricingPage";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Pricing" });
  const localePath = locale === "en" ? "" : `/${locale}`; // 👈 same helper logic

  return {
    title: t("meta_title"),
    description: t("meta_desc"),
    keywords: t("meta_keywords"),
    alternates: {
      canonical: `https://noteocr.com${localePath}/pricing`,
      languages: {
        "x-default": "https://noteocr.com/pricing",
        en: "https://noteocr.com/pricing",
        es: "https://noteocr.com/es/pricing",
        tr: "https://noteocr.com/tr/pricing",
        zh: "https://noteocr.com/zh/pricing",
        hi: "https://noteocr.com/hi/pricing",
        de: "https://noteocr.com/de/pricing",
        ja: "https://noteocr.com/ja/pricing",
        fr: "https://noteocr.com/fr/pricing",
        "pt-br": "https://noteocr.com/pt-br/pricing",
        da: "https://noteocr.com/da/pricing",
        fi: "https://noteocr.com/fi/pricing",
        it: "https://noteocr.com/it/pricing",
        nl: "https://noteocr.com/nl/pricing",
        no: "https://noteocr.com/no/pricing",
        sv: "https://noteocr.com/sv/pricing",
      },
    },
    openGraph: {
      title: t("og_title"),
      description: t("og_desc"),
      url: `https://noteocr.com${localePath}/pricing`,
      type: "website",
      images: [
        {
          url: "/images/copywrite-image002.png",
          width: 1200,
          height: 630,
          alt: t("meta_title"),
        },
      ],
    },
    other: {
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Product",
        name: t("product_name"),
        description: t("product_desc"),
        brand: {
          "@type": "Brand",
          name: "NoteOCR",
        },
        offers: {
          "@type": "AggregateOffer",
          lowPrice: "0.00",
          highPrice: "25.00",
          priceCurrency: "USD",
          offerCount: "3",
          offers: [
            {
              "@type": "Offer",
              name: t("plan_free"),
              price: "0.00",
              priceCurrency: "USD",
            },
            {
              "@type": "Offer",
              name: t("plan_pro"),
              price: "8.00",
              priceCurrency: "USD",
            },
            {
              "@type": "Offer",
              name: t("plan_biz"),
              price: "25.00",
              priceCurrency: "USD",
            },
          ],
        },
      }),
    },
  };
}

const Pricing = () => {
  return <PricingPage />;
};

export default Pricing;
