"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";
import { useLocale, useTranslations } from "next-intl";

import {
  Check,
  Shield,
  Minus,
  Plus,
  CheckCircle2,
  Cpu,
  Lock,
  ScanLine,
  CreditCard,
} from "lucide-react";
import { ConciergeSection } from "./ConciergeSection";

/* -------------------------------------------------------------------------- */
/* Constants                                                                  */
/* -------------------------------------------------------------------------- */

const PLAN_KEYS = ["free", "starter", "plus", "pro"];
const PAID_PLAN_KEYS = ["starter", "plus", "pro"];

// NEXT_PUBLIC_API_URL already ends with /api/v1 (see .env.local)
const BACKEND_API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const PRICING_ENDPOINT_PATH = "/users/pricing";
const DEFAULT_CURRENCY = "USD";

/* -------------------------------------------------------------------------- */
/* Pricing hook                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Loads plan prices from the backend, the same source the in-app Billings page uses.
 * Expected response shape: { currency: "USD", plans: { starter: { amount }, plus: { amount }, pro: { amount } } }
 *
 * - `initialPricing` (optional): pricing already fetched on the server, so the
 *   correct prices are in the first HTML that search engines and users receive.
 * - While loading, or if the request fails, the page keeps showing the
 *   fallback prices from the translation files (no blank prices, no layout jump).
 */
function useBackendPricing(initialPricing) {
  const [backendPricing, setBackendPricing] = useState(initialPricing ?? null);

  useEffect(() => {
    if (initialPricing || !BACKEND_API_BASE_URL) return;

    const abortController = new AbortController();

    fetch(`${BACKEND_API_BASE_URL}${PRICING_ENDPOINT_PATH}`, {
      signal: abortController.signal,
    })
      .then((response) =>
        response.ok ? response.json() : Promise.reject(response.status),
      )
      .then((pricingResponse) => setBackendPricing(pricingResponse))
      .catch(() => {
        // Keep the fallback prices from the translation files.
      });

    return () => abortController.abort();
  }, [initialPricing]);

  return backendPricing;
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function PricingPage({ initialPricing = null }) {
  const translate = useTranslations("PricingUI");
  const locale = useLocale();
  const backendPricing = useBackendPricing(initialPricing);

  const comparisonRows = translate.raw("comparison.rows");
  const deepDiveCards = translate.raw("deep_dive.cards");
  const faqItems = translate.raw("faqs.items");

  /* ------------------------------ URL helper ------------------------------- */

  const buildAppUrl = (path) => {
    const baseUrl = `https://app.noteocr.com${path}`;
    if (!locale || locale === "en") return baseUrl;
    const querySeparator = path.includes("?") ? "&" : "?";
    return `${baseUrl}${querySeparator}lng=${locale}`;
  };

  /* ----------------------------- Price helpers ----------------------------- */

  const currencyCode = backendPricing?.currency || DEFAULT_CURRENCY;

  const formatPrice = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);

  // Backend price first, translation file price as the fallback.
  const getPlanPriceAmount = (planKey) => {
    const backendAmount = backendPricing?.plans?.[planKey]?.amount;
    if (typeof backendAmount === "number") return backendAmount;

    const fallbackAmount = Number(translate(`plans.${planKey}.price`));
    return Number.isFinite(fallbackAmount) ? fallbackAmount : 0;
  };

  /* ------------------------------ Structured data -------------------------- */

  const paidPlanAmounts = PAID_PLAN_KEYS.map(getPlanPriceAmount);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "NoteOCR Credits",
    description:
      "Handwriting recognition credits for converting notes to Excel/Word.",
    offers: {
      "@type": "AggregateOffer",
      lowPrice: Math.min(...paidPlanAmounts).toFixed(2),
      highPrice: Math.max(...paidPlanAmounts).toFixed(2),
      priceCurrency: currencyCode,
      offerCount: String(PAID_PLAN_KEYS.length),
    },
  };

  /* --------------------------------- Render -------------------------------- */

  return (
    <div className="min-h-screen bg-[#000] text-white selection:bg-emerald-500/30 font-sans">
      <Script
        id="pricing-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none [background-image:linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] [background-size:40px_40px]" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-bold uppercase tracking-widest mb-8">
            <CreditCard className="w-3 h-3" /> {translate("hero.badge")}
          </div>

          <h1 className="text-2xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            {translate("hero.title_start")}{" "}
            <span className="text-white">
              {translate("hero.title_highlight")}
            </span>
          </h1>

          <p className=" md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {translate("hero.subtitle")}
          </p>
        </div>
      </section>

      {/* --- PRICING CARDS --- */}
      <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLAN_KEYS.map((planKey) => {
            const isPlusPlan = planKey === "plus";
            const isFreePlan = planKey === "free";

            return (
              <div
                key={planKey}
                className={`relative flex flex-col p-6 rounded-xl transition-all duration-300 ${
                  isPlusPlan
                    ? "bg-[#0A0A0A] border border-emerald-500/50 shadow-2xl shadow-emerald-500/10 scale-105 z-10"
                    : "bg-[#050505] border border-white/10 hover:border-white/20"
                }`}
              >
                {isPlusPlan && (
                  <div className="absolute -top-3 left-0 right-0 flex justify-center">
                    <span className="bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-lg shadow-emerald-900/50 border border-emerald-400/50">
                      {translate("plans.plus.badge")}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3
                    className={`text-lg font-bold ${
                      isPlusPlan ? "text-emerald-400" : "text-white"
                    }`}
                  >
                    {translate(`plans.${planKey}.name`)}
                  </h3>
                  <p className="text-sm text-gray-400 mt-2 h-10 leading-snug">
                    {translate(`plans.${planKey}.desc`)}
                  </p>
                </div>

                <div className="mb-6 flex items-baseline">
                  <span className="text-4xl font-extrabold text-white">
                    {formatPrice(getPlanPriceAmount(planKey))}
                  </span>
                  {!isFreePlan && (
                    <span className="text-gray-500 text-xs ml-2 uppercase font-medium">
                      / one-time
                    </span>
                  )}
                </div>

                <div
                  className={`rounded-lg p-3 text-center mb-6 border ${
                    isPlusPlan
                      ? "bg-emerald-950/20 border-emerald-500/20"
                      : "bg-white/5 border-white/5"
                  }`}
                >
                  <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">
                    {translate("labels.capacity")}
                  </span>
                  <span className="text-xl font-bold text-white">
                    {translate(`plans.${planKey}.credits`)}
                  </span>
                </div>

                <a
                  href={buildAppUrl("/signup")}
                  className={`w-full py-3 px-4 rounded-md font-bold text-sm text-center transition-all ${
                    isPlusPlan
                      ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/20"
                      : isFreePlan
                        ? "bg-white/10 border border-white/10 text-white hover:bg-white/20"
                        : "bg-white text-black hover:bg-gray-200"
                  }`}
                >
                  {translate(`plans.${planKey}.btn`)}
                </a>

                <div className="mt-8 space-y-4 flex-1">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-white/5 pb-2">
                    {translate("labels.features")}
                  </p>
                  {translate
                    .raw(`plans.${planKey}.features`)
                    .map((featureText, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-start gap-3"
                      >
                        <Check
                          className={`w-4 h-4 mt-0.5 shrink-0 ${
                            isPlusPlan ? "text-emerald-500" : "text-gray-600"
                          }`}
                        />
                        <span className="text-sm text-gray-400 leading-tight">
                          {featureText}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <ConciergeSection />

      {/* --- DEEP DIVE (SEO CONTENT) --- */}
      <section className="py-24 max-w-7xl mx-auto px-6 border-b border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {translate("deep_dive.title")}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            OCR is not just "scanning." It is complex computer vision. Here is
            why premium processing matters.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {deepDiveCards.map((card, cardIndex) => (
            <div
              key={cardIndex}
              className="p-8 border border-white/10 bg-white/[0.02] rounded-xl hover:border-emerald-500/30 transition-colors group"
            >
              <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-6 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                {cardIndex === 0 && (
                  <Cpu className="w-6 h-6 text-emerald-500" />
                )}
                {cardIndex === 1 && (
                  <ScanLine className="w-6 h-6 text-emerald-500" />
                )}
                {cardIndex === 2 && (
                  <Lock className="w-6 h-6 text-emerald-500" />
                )}
              </div>
              <h3 className="text-lg font-bold mb-3 text-white">
                {card.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* --- FEATURE COMPARISON TABLE --- */}
      <section className="py-24 max-w-7xl mx-auto px-6 border-b border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            {translate("comparison.title")}
          </h2>
          <p className="text-gray-400">{translate("comparison.subtitle")}</p>
        </div>

        <div className="overflow-x-auto border border-white/10 rounded-xl bg-white/[0.01]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/10">
                <th className="p-6 min-w-[200px] text-sm font-bold text-gray-300 uppercase tracking-wider">
                  {translate("comparison.headers.0")}
                </th>
                {PLAN_KEYS.map((planKey, planIndex) => (
                  <th
                    key={planKey}
                    className={`p-6 text-center text-sm font-bold uppercase tracking-wider ${
                      planKey === "plus" ? "text-emerald-400" : "text-gray-500"
                    }`}
                  >
                    {translate(`comparison.headers.${planIndex + 1}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {comparisonRows.map((row, rowIndex) => {
                const isNewGroup =
                  rowIndex === 0 ||
                  row.group !== comparisonRows[rowIndex - 1].group;

                return (
                  <React.Fragment key={row.name}>
                    {isNewGroup && (
                      <tr className="bg-white/[0.05]">
                        <td
                          colSpan={5}
                          className="py-3 px-6 text-[10px] font-bold text-emerald-500 uppercase tracking-[0.2em]"
                        >
                          {translate(`comparison.groups.${row.group}`)}
                        </td>
                      </tr>
                    )}
                    <tr className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 px-6 text-sm font-medium text-gray-300 border-r border-white/5">
                        {row.name}
                      </td>
                      {row.values.map((cellValue, columnIndex) => (
                        <td
                          key={columnIndex}
                          className={`p-4 text-center text-sm ${
                            columnIndex === 2
                              ? "bg-emerald-900/10 font-medium text-emerald-400"
                              : "text-gray-500"
                          }`}
                        >
                          {cellValue === true ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto" />
                          ) : cellValue === false ? (
                            <Minus className="w-4 h-4 text-gray-700 mx-auto" />
                          ) : (
                            cellValue
                          )}
                        </td>
                      ))}
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="max-w-3xl mx-auto px-6 py-24">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          {translate("faq_title")}
        </h2>
        <div className="space-y-4">
          {faqItems.map((faqItem, faqIndex) => (
            <FaqItem key={faqIndex} question={faqItem.q} answer={faqItem.a} />
          ))}
        </div>
      </section>

      {/* --- FOOTER TRUST --- */}
      <footer className="border-t border-white/10 py-12 text-center bg-black">
        <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mb-4">
          <Shield className="w-4 h-4" />
          {translate("footer_secure")}
        </div>
        <div className="flex justify-center gap-6 opacity-30">
          <div className="font-bold text-lg text-white">VISA</div>
          <div className="font-bold text-lg text-white">Mastercard</div>
          <div className="font-bold text-lg text-white">Amex</div>
        </div>
      </footer>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* FAQ item                                                                   */
/* -------------------------------------------------------------------------- */

function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/10 rounded-lg bg-white/[0.02] overflow-hidden transition-all duration-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left font-medium text-gray-200 hover:bg-white/[0.05]"
      >
        {question}
        {isOpen ? (
          <Minus className="w-4 h-4 text-emerald-500" />
        ) : (
          <Plus className="w-4 h-4 text-gray-500" />
        )}
      </button>
      <div
        className={`px-5 text-gray-400 text-sm leading-relaxed transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-48 pb-5 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {answer}
      </div>
    </div>
  );
}
