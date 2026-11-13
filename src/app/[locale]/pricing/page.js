import PricingPage from "../../ui/PricingPage";
import { getTranslations } from "next-intl/server";

const SITE_URL = "https://noteocr.com";
const PRICING_REVALIDATE_SECONDS = 300; // re-fetch backend prices at most every 5 minutes

// Locales that have a translated pricing page (URL prefix equals the locale code)
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

const getLocalePath = (locale) => (locale === "en" ? "" : `/${locale}`);

const buildPricingUrl = (locale) =>
  `${SITE_URL}${getLocalePath(locale)}/pricing`;

// hreflang map: one entry per locale, plus x-default pointing to English
const buildLanguageAlternates = () => ({
  "x-default": buildPricingUrl("en"),
  ...Object.fromEntries(
    SUPPORTED_LOCALES.map((supportedLocale) => [
      supportedLocale,
      buildPricingUrl(supportedLocale),
    ]),
  ),
});

/**
 * Fetches plan prices from the backend on the server, so the correct prices are
 * in the first HTML sent to users and search engines.
 * Returns null on any failure; the page then falls back to the translation prices.
 */
async function fetchBackendPricing() {
  const backendApiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!backendApiBaseUrl) return null;

  try {
    const pricingResponse = await fetch(`${backendApiBaseUrl}/users/pricing`, {
      next: { revalidate: PRICING_REVALIDATE_SECONDS },
    });
    return pricingResponse.ok ? await pricingResponse.json() : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Pricing" });
  const pricingUrl = buildPricingUrl(locale);

  return {
    title: t("meta_title"),
    description: t("meta_desc"),
    keywords: t("meta_keywords"),
    alternates: {
      canonical: pricingUrl,
      languages: buildLanguageAlternates(),
    },
    openGraph: {
      title: t("og_title"),
      description: t("og_desc"),
      url: pricingUrl,
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
    // The Product JSON-LD was removed from here: `other` renders a <meta> tag,
    // which search engines ignore for structured data. PricingPage now outputs it
    // as a real <script type="application/ld+json"> using the live backend prices.
  };
}

export default async function PricingRoutePage() {
  const initialPricing = await fetchBackendPricing();

  return <PricingPage initialPricing={initialPricing} />;
}
