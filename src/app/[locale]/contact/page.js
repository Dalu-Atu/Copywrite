import ContactPage from "../../ui/ContactPage";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

// 1. DYNAMIC METADATA
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });

  return {
    title: t("meta_title"),
    description: t("meta_desc"),
    keywords: t("meta_keywords"),
    alternates: {
      canonical: `https://noteocr.com/${locale}/contact`,
      languages: {
        en: "https://noteocr.com/en/contact",
        es: "https://noteocr.com/es/contact",
        tr: "https://noteocr.com/tr/contact",
        zh: "https://noteocr.com/zh/contact",
        hi: "https://noteocr.com/hi/contact",
        de: "https://noteocr.com/de/contact",
        ja: "https://noteocr.com/ja/contact",
        "pt-br": "https://noteocr.com/pt-br/contact",
      },
    },
    openGraph: {
      title: t("og_title"),
      description: t("og_desc"),
      images: [
        {
          url: "/images/contact-og.png",
          width: 1200,
          height: 630,
          alt: t("og_title"),
        },
      ],
      locale: locale,
      type: "website",
      url: `https://noteocr.com/${locale}/contact`,
    },
    // Schema Org Contact Page
    other: {
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: t("meta_title"),
        url: `https://noteocr.com/${locale}/contact`,
        mainEntity: {
          "@type": "Organization",
          name: t("org_name"),
          logo: "https://noteocr.com/noteocr-full-logo.png",
          contactPoint: {
            "@type": "ContactPoint",
            email: "care.copywrite@gmail.com",
            contactType: "customer service",
            availableLanguage: [
              "en",
              "tr",
              "es",
              "zh",
              "hi",
              "de",
              "ja",
              "pt-br",
            ],
          },
        },
      }),
    },
  };
}

function Contact() {
  const t = useTranslations("Contact");

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
                name: t("breadcrumb_contact"),
                item: "https://noteocr.com/contact",
              },
            ],
          }),
        }}
      />
      <ContactPage />
    </>
  );
}

export default Contact;
