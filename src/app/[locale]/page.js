import HomePage from "../ui/HomePage";
import { getTranslations } from "next-intl/server";

import { STORE_LINKS } from "../ui/AppShared";
import { routing } from "@/i18n/routing";

// =============================================
// SITE CONFIGURATION
// =============================================

const SITE = "https://noteocr.com";
const DEFAULT_LOCALE = routing.defaultLocale || "en";

const LOCALES = {
  en: "en_US",
  tr: "tr_TR",
  es: "es_ES",
  zh: "zh_CN",
  hi: "hi_IN",
  de: "de_DE",
  ja: "ja_JP",
  fr: "fr_FR",
  "pt-br": "pt_BR",
  da: "da_DK",
  fi: "fi_FI",
  it: "it_IT",
  nl: "nl_NL",
  no: "nb_NO",
  sv: "sv_SE",
};

// hreflang wants region subtags in the canonical casing.
const HREFLANG = { "pt-br": "pt-BR" };

// ---------------------------------------------
// REAL DATA SWITCHES
// Everything below stays OUT of the structured data until you fill it in
// with true values. Never publish invented prices or ratings.
// ---------------------------------------------

// Real, public brand profiles only (LinkedIn, X, Product Hunt, Crunchbase...).
const SAME_AS = [];

// Lowest real paid price. Example: { currency: "USD", low: "9.99" }
const PRICING = { currency: "USD", low: null };

// Real store rating shown to users. Example: { value: "4.8", count: "120" }
// Google requires the rating to be visible on the page too.
const APP_RATING = null;

// ISO date the demo video was published. Example: "2026-01-15"
const VIDEO_UPLOAD_DATE = null;

const LOGO_URL = `${SITE}/logo.png`;

// TODO: replace with a dedicated 1200x630 NoteOCR image,
// e.g. "/images/og-noteocr-home.png", and update this path.
const OG_IMAGE = "/images/copywrite-image002.png";
const VIDEO_THUMB = `${SITE}/images/noteocr-image002-bg.png`;
const VIDEO_URL = `${SITE}/videos/noteocr-note-to-document.mp4`;

export const viewport = {
  themeColor: "#00415a",
};

// =============================================
// URL HELPERS
// =============================================

function getLocalePath(locale) {
  return locale === DEFAULT_LOCALE ? "" : `/${locale}`;
}

function getCanonicalUrl(locale) {
  return `${SITE}${getLocalePath(locale)}`;
}

function getLanguageAlternates() {
  const languages = {};

  for (const locale of routing.locales) {
    languages[HREFLANG[locale] || locale] = getCanonicalUrl(locale);
  }

  languages["x-default"] = getCanonicalUrl(DEFAULT_LOCALE);

  return languages;
}

// Safe translation read: returns fallback if a locale has no such key yet.
function tx(t, key, fallback = "") {
  return t.has(key) ? t(key) : fallback;
}

// =============================================
// METADATA
// =============================================

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage" });

  const canonical = getCanonicalUrl(locale);
  const title = t("meta_title");
  const description = t("meta_desc");

  const imageAlt = tx(
    t,
    "og_image_alt",
    "NoteOCR handwriting conversion software showing handwritten notes converted into editable documents",
  );

  return {
    metadataBase: new URL(SITE),
    title: { absolute: title },
    description,
    alternates: {
      canonical,
      languages: getLanguageAlternates(),
    },
    openGraph: {
      type: "website",
      locale: LOCALES[locale] || "en_US",
      url: canonical,
      siteName: "NoteOCR",
      title,
      description,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: OG_IMAGE, alt: imageAlt }],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

// =============================================
// STRUCTURED DATA
// =============================================

function buildStructuredData({ locale, t, canonical }) {
  const description = t("meta_desc");
  const orgRef = { "@id": `${SITE}/#organization` };
  const siteRef = { "@id": `${SITE}/#website` };

  const organization = {
    "@type": "Organization",
    "@id": `${SITE}/#organization`,
    name: "NoteOCR",
    url: SITE,
    logo: { "@type": "ImageObject", url: LOGO_URL },
    ...(SAME_AS.length > 0 ? { sameAs: SAME_AS } : {}),
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE}/#website`,
    url: SITE,
    name: "NoteOCR",
    description,
    inLanguage: locale,
    publisher: orgRef,
  };

  const webPage = {
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: t("meta_title"),
    description,
    inLanguage: locale,
    isPartOf: siteRef,
    about: { "@id": `${SITE}/#web-application` },
    primaryImageOfPage: { "@type": "ImageObject", url: `${SITE}${OG_IMAGE}` },
  };

  // Offers and rating only appear when you have real values above.
  const offers = PRICING.low
    ? {
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: PRICING.currency,
          lowPrice: PRICING.low,
          offerCount: 1,
        },
      }
    : {};

  const rating = APP_RATING
    ? {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: APP_RATING.value,
          ratingCount: APP_RATING.count,
          bestRating: "5",
          worstRating: "1",
        },
      }
    : {};

  const webApplication = {
    "@type": "SoftwareApplication",
    "@id": `${SITE}/#web-application`,
    name: "NoteOCR",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description,
    url: SITE,
    featureList: [t("fact_1"), t("fact_2"), t("fact_3"), t("fact_4")],
    publisher: orgRef,
    isPartOf: siteRef,
    ...offers,
    ...rating,
  };

  const mobileApp = (id, os, installUrl) => ({
    "@type": "MobileApplication",
    "@id": `${SITE}/#${id}`,
    name: "NoteOCR: Handwriting to Text",
    applicationCategory: "BusinessApplication",
    operatingSystem: os,
    url: `${SITE}/get-app`,
    installUrl,
    publisher: orgRef,
    isPartOf: siteRef,
    ...offers,
  });

  const faqItems = t.raw("faq_items");
  const faqPage =
    Array.isArray(faqItems) && faqItems.length > 0
      ? {
          "@type": "FAQPage",
          "@id": `${canonical}#faq`,
          inLanguage: locale,
          mainEntity: faqItems.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }
      : null;

  const video = VIDEO_UPLOAD_DATE
    ? {
        "@type": "VideoObject",
        "@id": `${canonical}#video`,
        name: t("watch_title"),
        description: t("watch_desc"),
        thumbnailUrl: VIDEO_THUMB,
        contentUrl: VIDEO_URL,
        uploadDate: VIDEO_UPLOAD_DATE,
        publisher: orgRef,
      }
    : null;

  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      website,
      webPage,
      webApplication,
      mobileApp("ios-application", "iOS", STORE_LINKS.apple),
      mobileApp("android-application", "Android", STORE_LINKS.google),
      ...(faqPage ? [faqPage] : []),
      ...(video ? [video] : []),
    ],
  };
}

// =============================================
// HOMEPAGE
// =============================================

export default async function Page({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage" });

  const jsonLd = buildStructuredData({
    locale,
    t,
    canonical: getCanonicalUrl(locale),
  });

  // Escape HTML-sensitive characters before embedding JSON-LD.
  const safeJsonLd = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd }}
      />
      <HomePage />
    </>
  );
}
