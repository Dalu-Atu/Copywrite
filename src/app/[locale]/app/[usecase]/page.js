import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import UseCaseLandingPage from "../../../ui/UseCaseLandingPage";

import {
  USE_CASES,
  getUseCaseBySlug,
  SUPPORTED_LOCALES,
} from "../../../ui/app-usecases-config";

const BASE_URL = "https://noteocr.com";

function localePath(locale) {
  return locale === "en" ? "" : `/${locale}`;
}

/**
 * Pre-build every (locale × slug) combination in USE_CASES
 * so each localized use-case page is generated at build time.
 */
export async function generateStaticParams() {
  return SUPPORTED_LOCALES.flatMap((locale) =>
    USE_CASES.map((useCase) => ({
      locale,
      usecase: useCase.slug,
    })),
  );
}

/* ---------------- Metadata ---------------- */

export async function generateMetadata({ params }) {
  const { locale, usecase } = await params;

  const useCase = getUseCaseBySlug(usecase);

  if (!useCase) return {};

  const t = await getTranslations({
    locale,
    namespace: useCase.namespace,
  });

  const canonicalPath = `${localePath(locale)}/app/${useCase.slug}`;

  const canonicalUrl = `${BASE_URL}${canonicalPath}`;

  const languages = Object.fromEntries(
    SUPPORTED_LOCALES.map((l) => [
      l,
      `${BASE_URL}${localePath(l)}/app/${useCase.slug}`,
    ]),
  );

  languages["x-default"] = `${BASE_URL}/app/${useCase.slug}`;

  return {
    title: t("meta_title"),
    description: t("meta_desc"),

    alternates: {
      canonical: canonicalUrl,
      languages,
    },

    openGraph: {
      title: t("meta_title"),
      description: t("meta_desc"),
      url: canonicalUrl,
      siteName: "NoteOCR",
      locale,
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: t("meta_title"),
      description: t("meta_desc"),
    },
  };
}

/* ---------------- JSON-LD ---------------- */

async function buildJsonLd({ locale, useCase }) {
  const t = await getTranslations({
    locale,
    namespace: useCase.namespace,
  });

  const canonicalUrl = `${BASE_URL}${localePath(locale)}/app/${useCase.slug}`;

  const webPage = {
    "@type": "WebPage",
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: t("meta_title"),
    description: t("meta_desc"),

    isPartOf: {
      "@type": "WebSite",
      name: "NoteOCR",
      url: BASE_URL,
    },
  };

  const faqPage = {
    "@type": "FAQPage",

    mainEntity: useCase.faqKeys.map((key) => ({
      "@type": "Question",

      name: t(`FAQ.items.${key}.q`),

      acceptedAnswer: {
        "@type": "Answer",
        text: t(`FAQ.items.${key}.a`),
      },
    })),
  };

  const softwareApplication = {
    "@type": "SoftwareApplication",
    name: "NoteOCR",
    applicationCategory: "ProductivityApplication",
    operatingSystem: "iOS, Android",
    description: t("meta_desc"),
  };

  const breadcrumbList = {
    "@type": "BreadcrumbList",

    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${BASE_URL}${localePath(locale)}/`,
      },

      {
        "@type": "ListItem",
        position: 2,
        name: "App",
        item: `${BASE_URL}${localePath(locale)}/app`,
      },

      {
        "@type": "ListItem",
        position: 3,
        name: t("nav_label"),
        item: canonicalUrl,
      },
    ],
  };

  return {
    "@context": "https://schema.org",

    "@graph": [webPage, softwareApplication, faqPage, breadcrumbList],
  };
}

/* ---------------- Page ---------------- */

export default async function UseCasePage({ params }) {
  const { locale, usecase } = await params;

  const useCase = getUseCaseBySlug(usecase);

  // Unknown slug -> real 404.
  if (!useCase) {
    notFound();
  }

  const jsonLd = await buildJsonLd({
    locale,
    useCase,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <UseCaseLandingPage locale={locale} useCase={useCase} />
    </>
  );
}
