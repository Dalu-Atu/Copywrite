import ContactPage from "../../ui/ContactPage";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

// 1. DYNAMIC METADATA
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  const localePath = locale === "en" ? "" : `/${locale}`; // 👈 same helper logic

  return {
    title: t("meta_title"),
    description: t("meta_desc"),
    keywords: t("meta_keywords"),
    alternates: {
      canonical: `https://noteocr.com${localePath}/contact`,
      languages: {
        "x-default": "https://noteocr.com/contact", 
        en: "https://noteocr.com/contact", 
        es: "https://noteocr.com/es/contact",
        tr: "https://noteocr.com/tr/contact",
        zh: "https://noteocr.com/zh/contact",
        hi: "https://noteocr.com/hi/contact",
        de: "https://noteocr.com/de/contact",
        ja: "https://noteocr.com/ja/contact",
        fr: "https://noteocr.com/fr/contact",
        "pt-br": "https://noteocr.com/pt-br/contact",
        da: "https://noteocr.com/da/contact",
        fi: "https://noteocr.com/fi/contact",
        it: "https://noteocr.com/it/contact",
        nl: "https://noteocr.com/nl/contact",
        no: "https://noteocr.com/no/contact",
        sv: "https://noteocr.com/sv/contact",
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
      url: `https://noteocr.com/${localePath}/contact`,
    },
    // Schema Org Contact Page
    other: {
      "application/ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: t("meta_title"),
        url: `https://noteocr.com/${localePath}/contact`,
        mainEntity: {
          "@type": "Organization",
          name: t("org_name"),
          logo: "https://noteocr.com/noteocr-full-logo.png",
          contactPoint: {
            "@type": "ContactPoint",
            email: "support@noteocr.com",
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
              "da",
              "fi",
              "it",
              "nl",
              "no",
              "sv",
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
