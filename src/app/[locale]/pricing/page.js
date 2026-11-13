import { headers } from "next/headers";
import PricingPage from "../../ui/PricingPage";
import { getTranslations } from "next-intl/server";

const SITE_URL = "https://noteocr.com";
const PRICING_REVALIDATE_SECONDS = 300; // cached per country (the country is part of the URL)

// Headers that hosting providers add with the visitor's country
const VISITOR_COUNTRY_HEADER_NAMES = ["x-vercel-ip-country", "cf-ipcountry"];

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

const isTwoLetterCountryCode = (value) =>
  /^[A-Za-z]{2}$/.test(String(value || ""));

/**
 * Finds the visitor's country on the server.
 * - In development only, `/pricing?country=NG` lets you test any country.
 * - Otherwise it reads the country header added by your host (Vercel or Cloudflare).
 * Returns "" when unknown (the backend then uses standard tier1 pricing).
 */
async function detectVisitorCountry(countryOverrideFromUrl) {
  if (
    process.env.NODE_ENV !== "production" &&
    isTwoLetterCountryCode(countryOverrideFromUrl)
  ) {
    return countryOverrideFromUrl.toUpperCase();
  }

  const incomingRequestHeaders = await headers();
  for (const headerName of VISITOR_COUNTRY_HEADER_NAMES) {
    const headerValue = incomingRequestHeaders.get(headerName);
    if (isTwoLetterCountryCode(headerValue)) return headerValue.toUpperCase();
  }
  return "";
}

/**
 * Fetches plan prices from the backend on the server, so the correct prices are
 * in the first HTML. The visitor's country is sent explicitly, because the
 * backend only sees this server's IP, not the visitor's.
 * Returns null on any failure; the page then falls back to the translation prices.
 */
async function fetchBackendPricing(visitorCountry) {
  const backendApiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!backendApiBaseUrl) return null;

  // The backend's getCountry() already reads the x-vercel-ip-country header,
  // so we forward the visitor's country in that header (no backend change needed).
  // The ?country= query is ignored by the backend; it only keeps the cache
  // entries separate per country.
  const countryQuery = visitorCountry ? `?country=${visitorCountry}` : "";
  const forwardedHeaders = visitorCountry
    ? { "x-vercel-ip-country": visitorCountry }
    : {};

  try {
    const pricingResponse = await fetch(
      `${backendApiBaseUrl}/users/pricing${countryQuery}`,
      {
        headers: forwardedHeaders,
        next: { revalidate: PRICING_REVALIDATE_SECONDS },
      },
    );
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
    // Product JSON-LD lives in PricingPage as a real <script type="application/ld+json">.
  };
}

export default async function PricingRoutePage({ searchParams }) {
  const { country: countryOverrideFromUrl } = await searchParams;
  const visitorCountry = await detectVisitorCountry(countryOverrideFromUrl);
  const initialPricing = await fetchBackendPricing(visitorCountry);

  return <PricingPage initialPricing={initialPricing} />;
}
