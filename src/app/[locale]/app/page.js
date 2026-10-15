import { Fraunces, Inter } from "next/font/google";
import { getTranslations } from "next-intl/server";

import AppPage from "../../ui/AppPage";
import { APP_FAQ_KEYS } from "../../ui/app-faq-keys";

const BASE_URL = "https://noteocr.com";
const APPLE_URL =
  "https://apps.apple.com/ng/app/noteocr-handwriting-to-text/id6803424702";

const SCREENSHOT_PATHS = [
  "/Screenshot1.png",
  "/Screenshot4.png",
  "/Screenshot2.png",
  "/Screenshot3.png",
  "/Screenshot5.png",
];

const SUPPORTED_LOCALES = [
  "en",
  "es",
  "tr",
  "zh",
  "hi",
  "de",
  "ja",
  "fr",
  "pt-br",
  "da",
  "fi",
  "it",
  "nl",
  "no",
  "sv",
];

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

function localePath(locale) {
  return locale === "en" ? "" : `/${locale}`;
}

function appUrl(locale) {
  return `${BASE_URL}${localePath(locale)}/app`;
}

/* ---------------- Metadata ---------------- */

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AppPage" });

  const canonicalUrl = appUrl(locale);

  const languages = Object.fromEntries(
    SUPPORTED_LOCALES.map((l) => [l, appUrl(l)]),
  );
  languages["x-default"] = `${BASE_URL}/app`;

  return {
    title: t("meta_title"),
    description: t("meta_desc"),

    alternates: { canonical: canonicalUrl, languages },

    openGraph: {
      title: t("meta_title"),
      description: t("meta_desc"),
      url: canonicalUrl,
      siteName: "NoteOCR",
      type: "website",
      locale,
      images: [
        {
          url: `${BASE_URL}/logo.png`,
          alt: t("hero_image_alt"),
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: t("meta_title"),
      description: t("meta_desc"),
      images: [`${BASE_URL}/logo.png`],
    },

    other: {
      "apple-itunes-app": "app-id=6803424702",
    },
  };
}

/* ---------------- FAQ JSON-LD ---------------- */

function faqJsonLd(t) {
  return {
    "@type": "FAQPage",
    mainEntity: APP_FAQ_KEYS.map((key) => ({
      "@type": "Question",
      name: t(`FAQ.items.${key}.q`),
      acceptedAnswer: {
        "@type": "Answer",
        text: t(`FAQ.items.${key}.a`),
      },
    })),
  };
}

/* ---------------- Mobile App JSON-LD ---------------- */

function softwareAppJsonLd(t, locale) {
  return {
    "@type": "MobileApplication",
    name: "NoteOCR",
    url: appUrl(locale),
    description: t("meta_desc"),
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "iOS, Android",
    image: `${BASE_URL}/images/hero-phone.png`,
    screenshot: SCREENSHOT_PATHS.map((p) => `${BASE_URL}${p}`),
    installUrl: APPLE_URL,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

/* ---------------- WebPage JSON-LD ---------------- */

function webPageJsonLd(t, locale) {
  const canonicalUrl = appUrl(locale);
  return {
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: t("meta_title"),
    description: t("meta_desc"),
    isPartOf: { "@type": "WebSite", name: "NoteOCR", url: BASE_URL },
  };
}

/* ---------------- Page ---------------- */

export default async function Page({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AppPage" });

  const schemas = [
    webPageJsonLd(t, locale),
    faqJsonLd(t),
    softwareAppJsonLd(t, locale),
  ].map((s) => ({ "@context": "https://schema.org", ...s }));

  return (
    <div className={`${fraunces.variable} ${inter.variable} font-sans`}>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <AppPage locale={locale} />
    </div>
  );
}
