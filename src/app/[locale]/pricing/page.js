import PricingPage from "../../ui/PricingPage";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Pricing" });

  return {
    title: t("meta_title"),
    description: t("meta_desc"),
    keywords: t("meta_keywords"),
    alternates: {
      canonical: `https://noteocr.com/${locale}/pricing`,
      languages: {
        en: "https://noteocr.com/en/pricing",
        es: "https://noteocr.com/es/pricing",
        tr: "https://noteocr.com/tr/pricing",
        zh: "https://noteocr.com/zh/pricing",
        hi: "https://noteocr.com/hi/pricing",
        de: "https://noteocr.com/de/pricing",
        ja: "https://noteocr.com/ja/pricing",
        "pt-br": "https://noteocr.com/pt-br/pricing",
      },
    },
    openGraph: {
      title: t("og_title"),
      description: t("og_desc"),
      url: `https://noteocr.com/${locale}/pricing`,
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
