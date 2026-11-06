import Link from "next/link";
import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";

import {
  Check,
  X,
  FileText,
  Table2,
  Receipt,
  Clock,
  Package,
  PenLine,
  Plus,
  Lock,
  Smartphone,
  Zap,
  FileOutput,
  ShieldCheck,
  ArrowRight,
  Upload,
  Languages,
  FileSpreadsheet,
} from "lucide-react";

import HeroDemo from "./Herodemo";
import HeroVideo from "./HeroVideo";
import BlogSection from "./BlogSection";
import { ConverterProvider } from "./ConverterProvider";
import UploadTrigger from "./UploadTrigger";

const STORE_LINKS = {
  apple:
    "https://apps.apple.com/ng/app/noteocr-handwriting-to-text/id6803424702",
  google: "https://play.google.com/store/apps/details?id=com.noteocr.app",
};

const wrap = "mx-auto max-w-6xl px-5 sm:px-8";

const ICONS = {
  "/handwriting-recognition": PenLine,
  "/handwriting-to-docx": FileText,
  "/handwriting-to-excel": Table2,
  "/handwritten-invoice-to-excel": Receipt,
  "/handwritten-timesheet-to-excel": Clock,
  "/handwritten-inventory-to-excel": Package,
};

// Content is only rendered when it is real (not empty, not a PLACEHOLDER).
const isReal = (value) =>
  typeof value === "string" &&
  value.trim().length > 0 &&
  !value.toUpperCase().includes("PLACEHOLDER");

// Safe readers: a locale that has not been translated yet renders nothing
// instead of throwing a missing-message error.
const getArray = (t, key) => {
  if (!t.has(key)) return [];
  const value = t.raw(key);
  return Array.isArray(value) ? value : [];
};

const getText = (t, key, fallback = "") => (t.has(key) ? t(key) : fallback);

function Head({ id, title, desc, light = false }) {
  return (
    <div className="max-w-2xl">
      <h2
        id={id}
        className={`text-2xl font-extrabold tracking-tight sm:text-3xl ${
          light ? "text-white" : "text-[#00415a]"
        }`}
      >
        {title}
      </h2>

      {desc && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            light ? "text-white/75" : "text-slate-600"
          }`}
        >
          {desc}
        </p>
      )}
    </div>
  );
}

// Grid that adapts to the number of testimonials so one card never looks lost.
const proofGrid = (count) =>
  count === 1
    ? "mx-auto max-w-2xl"
    : count === 2
      ? "grid gap-6 md:grid-cols-2"
      : "grid gap-6 md:grid-cols-2 lg:grid-cols-3";

export default async function HomePage() {
  const t = await getTranslations("HomePage");
  const locale = await getLocale();

  const href = (path) => (locale === "en" ? path : `/${locale}${path}`);

  const app = (path) =>
    `https://app.noteocr.com${path}${
      locale !== "en" ? `?lng=${encodeURIComponent(locale)}` : ""
    }`;

  const samples = getArray(t, "samples").filter(
    (s) => isReal(s.before) && isReal(s.after) && isReal(s.title),
  );

  const people = getArray(t, "testimonials").filter(
    (p) => isReal(p.name) && isReal(p.role) && isReal(p.quote),
  );

  const steps = getArray(t, "steps");
  const cases = getArray(t, "use_cases");
  const audiences = getArray(t, "audiences");
  const can = getArray(t, "scope_can");
  const cannot = getArray(t, "scope_cannot");
  const compare = getArray(t, "compare_rows");
  const faq = getArray(t, "faq_items");
  const appPoints = getArray(t, "app_points");
  const languages = getArray(t, "languages_list").filter(isReal);

  // Optional trust and pricing facts: appear only once you supply real values.
  const priceFrom = getText(t, "pricing_from");
  const retention = getText(t, "retention_note");
  const storeRating = getText(t, "store_rating");
  const showPrice = isReal(priceFrom);
  const showRetention = isReal(retention);
  const showRating = isReal(storeRating);

  const facts = [
    [Zap, t("fact_1")],
    [FileOutput, t("fact_2")],
    [Smartphone, t("fact_3")],
    [Lock, t("fact_4")],
  ];

  return (
    <ConverterProvider locale={locale} /* authToken={...} */>
      <main
        id="main-content"
        className="overflow-hidden bg-white text-slate-800 selection:bg-[#1b9e99] selection:text-white"
      >
        {/* HERO */}
        <section
          aria-labelledby="hero-title"
          className="relative overflow-hidden bg-gradient-to-b from-[#eaf6f5] via-white to-white pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-40"
        >
          <div
            className={`${wrap} grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16`}
          >
            <div>
              <h1
                id="hero-title"
                className="max-w-2xl text-2xl font-extrabold leading-[1.08] tracking-tight text-[#00415a] sm:text-4xl xl:text-5xl"
              >
                {t("h1")}
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-xl">
                {t("subtitle")}
              </p>

              <div className="mt-8 flex flex-nowrap gap-3">
                <UploadTrigger className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1b9e99] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-[#1b9e99]/20 transition hover:-translate-y-0.5 hover:bg-[#158782] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1b9e99] sm:flex-none sm:px-7 sm:py-3.5 sm:text-base">
                  <Upload
                    className="h-4 w-4 shrink-0 sm:h-5 sm:w-5"
                    aria-hidden
                  />
                  <span className="truncate">{t("cta_try")}</span>
                </UploadTrigger>
                <Link
                  href={href("/pricing")}
                  className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-[#00415a] transition hover:border-[#1b9e99] hover:text-[#158782] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1b9e99] sm:flex-none sm:px-7 sm:py-3.5 sm:text-base"
                >
                  <span className="truncate">{t("cta_pricing")}</span>
                </Link>
              </div>

              <p className="mt-5 max-w-lg text-sm leading-relaxed text-slate-600">
                {t("trust_line")}
              </p>

              {showRating && (
                <p className="mt-3 text-sm font-semibold text-[#00415a]">
                  {storeRating}
                </p>
              )}

              <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-slate-600">
                <span>{t("app_line")}</span>
                <a
                  href={STORE_LINKS.apple}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#00415a] underline decoration-slate-300 underline-offset-4 transition hover:text-[#1b9e99] hover:decoration-[#1b9e99]"
                >
                  {t("app_ios")}
                </a>

                <span className="text-slate-300" aria-hidden>
                  ·
                </span>

                <a
                  href={STORE_LINKS.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Download NoteOCR on Google Play"
                  className="font-semibold text-[#00415a] underline decoration-slate-300 underline-offset-4 transition hover:text-[#1b9e99] hover:decoration-[#1b9e99]"
                >
                  {t("app_android")}
                </a>
              </div>
            </div>

            <div
              id="demo"
              className="scroll-mt-24 rounded-3xl bg-white p-2 shadow-2xl shadow-[#00415a]/10 ring-1 ring-slate-200"
            >
              <HeroDemo />
            </div>
          </div>
        </section>

        {/* KEY FACTS */}

        <section
          aria-label={getText(t, "aria_features", "NoteOCR features")}
          className="border-y border-slate-200 bg-white"
        >
          <ul
            className={`${wrap} grid grid-cols-2 gap-x-4 gap-y-5 py-6 sm:gap-x-6 sm:gap-y-7 sm:py-8 lg:grid-cols-4`}
          >
            {facts.map(([Icon, text]) => (
              <li key={text} className="flex items-center gap-2.5 sm:gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#1b9e99]/10 text-[#1b9e99] sm:h-11 sm:w-11">
                  <Icon
                    className="h-[18px] w-[18px] sm:h-5 sm:w-5"
                    aria-hidden
                  />
                </span>

                <span className="text-[13px] font-semibold leading-snug text-[#00415a] sm:text-sm lg:text-base">
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* BEFORE / AFTER SAMPLES (moved up: this is the product) */}
        {samples.length > 0 && (
          <section className="py-20 lg:py-28" aria-labelledby="samples-h">
            <div className={wrap}>
              <Head
                id="samples-h"
                title={t("samples_title")}
                desc={t("samples_desc")}
              />

              <div className="mt-12 space-y-16">
                {samples.map((sample) => (
                  <figure key={sample.title}>
                    <div className="grid items-start gap-5 md:grid-cols-2">
                      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                        <p className="border-b border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600">
                          {t("before")}
                        </p>
                        <Image
                          src={sample.before}
                          alt={sample.before_alt}
                          width={1000}
                          height={750}
                          sizes="(min-width: 768px) 50vw, 100vw"
                          loading="lazy"
                          className="h-auto w-full object-contain"
                        />
                      </div>

                      <div className="overflow-hidden rounded-2xl border border-[#1b9e99]/40 bg-white shadow-lg shadow-[#1b9e99]/10">
                        <p className="border-b border-[#1b9e99]/20 bg-[#1b9e99]/5 px-4 py-3 text-sm font-semibold text-[#158782]">
                          {sample.after_label}
                        </p>
                        <Image
                          src={sample.after}
                          alt={sample.after_alt}
                          width={1000}
                          height={750}
                          sizes="(min-width: 768px) 50vw, 100vw"
                          loading="lazy"
                          className="h-auto w-full object-contain"
                        />
                      </div>
                    </div>

                    <figcaption className="mt-5 max-w-3xl leading-relaxed text-slate-600">
                      <strong className="text-[#00415a]">
                        {sample.title}.
                      </strong>{" "}
                      {sample.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* USE CASES */}
        <section
          className="bg-slate-50 py-20 lg:py-28"
          aria-labelledby="cases-h"
        >
          <div className={wrap}>
            <Head
              id="cases-h"
              title={t("cases_title")}
              desc={t("cases_desc")}
            />

            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {cases.map((item, index) => {
                const Icon = ICONS[item.href] || FileText;
                const featured = index < 2;

                return (
                  <li
                    key={item.href}
                    className={featured ? "lg:col-span-2" : ""}
                  >
                    <Link
                      href={href(item.href)}
                      className={`group flex h-full flex-col rounded-2xl border transition duration-200 hover:-translate-y-1 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b9e99] ${
                        featured
                          ? "border-[#1b9e99]/30 bg-white p-8"
                          : "border-slate-200 bg-white p-6"
                      }`}
                    >
                      <span
                        className={`flex items-center justify-center rounded-xl bg-[#1b9e99]/10 text-[#1b9e99] ${
                          featured ? "h-14 w-14" : "h-11 w-11"
                        }`}
                      >
                        <Icon
                          className={featured ? "h-7 w-7" : "h-5 w-5"}
                          aria-hidden
                        />
                      </span>

                      <h3
                        className={`mt-5 font-bold text-[#00415a] transition group-hover:text-[#1b9e99] ${
                          featured ? "text-2xl" : "text-lg"
                        }`}
                      >
                        {item.title}
                      </h3>

                      <p className="mt-2 leading-relaxed text-slate-600">
                        {item.desc}
                      </p>

                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#158782]">
                        {getText(t, "case_cta", "Learn more")}
                        <ArrowRight
                          className="h-4 w-4 transition group-hover:translate-x-1"
                          aria-hidden
                        />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* HOW IT WORKS (with crawlable explanatory prose) */}
        <section className="py-20 lg:py-28" aria-labelledby="how-h">
          <div className={wrap}>
            <Head id="how-h" title={t("how_title")} />

            <ol className="mt-12 grid gap-6 md:grid-cols-3">
              {steps.map((step, index) => (
                <li
                  key={step.title}
                  className="rounded-2xl border border-slate-200 bg-white p-7 transition hover:border-[#1b9e99]/40 hover:shadow-lg"
                >
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-[#00415a] text-lg font-bold text-white"
                    aria-hidden
                  >
                    {index + 1}
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-[#00415a]">
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-slate-600">
                    {step.desc}
                  </p>
                </li>
              ))}
            </ol>

            {t.has("how_detail") && (
              <p className="mt-10 max-w-3xl leading-relaxed text-slate-600">
                {t("how_detail")}
              </p>
            )}
          </div>
        </section>

        {/* VIDEO (after the value is understood) */}
        <section
          className="bg-slate-50 py-20 lg:py-28"
          aria-labelledby="watch-h"
        >
          <div className={wrap}>
            <Head
              id="watch-h"
              title={t("watch_title")}
              desc={t("watch_desc")}
            />

            <div className="mt-10 overflow-hidden rounded-2xl bg-[#0F172A] shadow-2xl shadow-[#00415a]/15 ring-1 ring-slate-900/10">
              <div
                className="flex items-center gap-2 border-b border-white/10 bg-slate-950/60 px-4 py-3"
                aria-hidden
              >
                <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
              </div>

              <HeroVideo
                poster="/images/noteocr-image002-bg.png"
                src="/videos/noteocr-note-to-document.mp4"
                label={t("video_label")}
                alt={t("video_alt")}
              />
            </div>
          </div>
        </section>

        {/* WHO IT IS FOR */}
        {audiences.length > 0 && (
          <section className="py-20 lg:py-28" aria-labelledby="aud-h">
            <div className={wrap}>
              <Head
                id="aud-h"
                title={getText(t, "audience_title")}
                desc={getText(t, "audience_desc")}
              />

              <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {audiences.map((item) => (
                  <li key={item.title}>
                    <Link
                      href={href(item.href)}
                      className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-[#1b9e99]/50 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1b9e99]"
                    >
                      <h3 className="text-lg font-bold text-[#00415a] group-hover:text-[#1b9e99]">
                        {item.title}
                      </h3>
                      <p className="mt-2 flex-1 leading-relaxed text-slate-600">
                        {item.desc}
                      </p>
                      <span className="mt-4 text-sm font-semibold text-[#158782]">
                        {item.cta}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* CAPABILITIES AND LIMITATIONS */}
        <section
          className="bg-slate-50 py-20 lg:py-28"
          aria-labelledby="scope-h"
        >
          <div className={wrap}>
            <Head
              id="scope-h"
              title={t("scope_title")}
              desc={t("scope_desc")}
            />

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-[#1b9e99]/30 bg-[#eaf6f5] p-7 sm:p-8">
                <h3 className="mb-6 text-lg font-bold text-[#00415a]">
                  {t("scope_can_title")}
                </h3>
                <ul className="space-y-4">
                  {can.map((item) => (
                    <li key={item} className="flex gap-3">
                      <Check
                        className="mt-1 h-5 w-5 shrink-0 text-[#1b9e99]"
                        aria-hidden
                      />
                      <span className="leading-relaxed text-slate-700">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-7 sm:p-8">
                <h3 className="mb-6 text-lg font-bold text-[#00415a]">
                  {t("scope_cannot_title")}
                </h3>
                <ul className="space-y-4 text-slate-600">
                  {cannot.map((item) => (
                    <li key={item} className="flex gap-3">
                      <X
                        className="mt-1 h-5 w-5 shrink-0 text-slate-400"
                        aria-hidden
                      />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-slate-600">
              {t("accuracy_note")}
            </p>

            {languages.length > 0 && (
              <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-7 sm:p-8">
                <h3 className="flex items-center gap-3 text-lg font-bold text-[#00415a]">
                  <Languages className="h-5 w-5 text-[#1b9e99]" aria-hidden />
                  {getText(t, "languages_title")}
                </h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {languages.map((lang) => (
                    <li
                      key={lang}
                      className="rounded-full bg-[#eaf6f5] px-4 py-1.5 text-sm font-medium text-[#00415a]"
                    >
                      {lang}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* COMPARISON */}
        <section className="py-20 lg:py-28" aria-labelledby="cmp-h">
          <div className={wrap}>
            <Head
              id="cmp-h"
              title={t("compare_title")}
              desc={t("compare_desc")}
            />

            <div className="mt-12 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full min-w-[620px] border-collapse text-left">
                <thead>
                  <tr className="bg-slate-100 text-sm">
                    <th scope="col" className="px-6 py-4">
                      {t("compare_feature")}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 font-semibold text-slate-600"
                    >
                      {t("compare_traditional")}
                    </th>
                    <th
                      scope="col"
                      className="bg-[#1b9e99]/10 px-6 py-4 font-bold text-[#158782]"
                    >
                      {getText(t, "compare_noteocr", "NoteOCR")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {compare.map((row) => (
                    <tr
                      key={row.feature}
                      className="border-t border-slate-200 align-top"
                    >
                      <th
                        scope="row"
                        className="px-6 py-5 font-semibold text-[#00415a]"
                      >
                        {row.feature}
                      </th>
                      <td className="px-6 py-5 leading-relaxed text-slate-600">
                        {row.traditional}
                      </td>
                      <td className="bg-[#1b9e99]/5 px-6 py-5 font-medium leading-relaxed text-[#00415a]">
                        {row.noteocr}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* PRIVACY AND PRICING */}
        <section
          className="bg-slate-50 py-20 lg:py-28"
          aria-label={getText(
            t,
            "aria_privacy_pricing",
            "Privacy and pricing information",
          )}
        >
          <div className={`${wrap} grid gap-6 md:grid-cols-2`}>
            <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-9">
              <ShieldCheck className="h-10 w-10 text-[#1b9e99]" aria-hidden />
              <h2 className="mt-5 text-2xl font-bold text-[#00415a]">
                {t("privacy_title")}
              </h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                {t("privacy_desc")}
              </p>
              {showRetention && (
                <p className="mt-3 leading-relaxed text-slate-600">
                  {retention}
                </p>
              )}
              <Link
                href={href("/privacy")}
                className="mt-6 inline-flex items-center gap-2 font-semibold text-[#00415a] underline underline-offset-4 transition hover:text-[#1b9e99]"
              >
                {t("privacy_link")}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>

            <div className="rounded-2xl border border-[#1b9e99]/30 bg-[#eaf6f5] p-8 sm:p-9">
              <FileOutput className="h-10 w-10 text-[#1b9e99]" aria-hidden />
              <h2 className="mt-5 text-2xl font-bold text-[#00415a]">
                {t("pricing_title")}
              </h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                {t("pricing_desc")}
              </p>
              {showPrice && (
                <p className="mt-3 text-lg font-bold text-[#00415a]">
                  {priceFrom}
                </p>
              )}
              <Link
                href={href("/pricing")}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#1b9e99] px-6 py-3 font-bold text-white transition hover:bg-[#158782]"
              >
                {t("pricing_cta")}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </section>

        {/* REAL TESTIMONIALS ONLY */}
        {people.length > 0 && (
          <section className="py-20 lg:py-28" aria-labelledby="proof-h">
            <div className={wrap}>
              <Head
                id="proof-h"
                title={t("proof_title")}
                desc={getText(t, "proof_desc")}
              />

              <div className={`mt-12 ${proofGrid(people.length)}`}>
                {people.map((person) => (
                  <figure
                    key={person.name}
                    className="flex flex-col rounded-2xl border border-slate-200 bg-white p-7"
                  >
                    <blockquote className="flex-1 text-lg leading-relaxed text-slate-700">
                      “{person.quote}”
                    </blockquote>

                    <figcaption className="mt-7 flex items-center gap-3">
                      {/* {isReal(person.photo) && (
                        <Image
                          src={person.photo}
                          alt={person.name}
                          width={48}
                          height={48}
                          sizes="48px"
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      )} */}
                      <span>
                        <strong className="block text-[#00415a]">
                          {person.name}
                        </strong>
                        <span className="text-sm text-slate-600">
                          {person.role}
                        </span>
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* MOBILE APP (moved lower, compact) */}
        <section
          className="relative overflow-hidden bg-[#00415a] py-20 text-white lg:py-28"
          aria-labelledby="app-h"
        >
          {/* background glow + dot grid */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-[#1b9e99]/30 blur-[120px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:22px_22px]"
          />

          <div
            className={`${wrap} relative grid items-center gap-14 md:grid-cols-[1.15fr_1fr] lg:gap-20`}
          >
            {/* LEFT: copy + store buttons */}
            <div>
              <Head
                id="app-h"
                light
                title={t("app_title")}
                desc={t("app_desc")}
              />

              <ul className="mt-8 space-y-4">
                {appPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 leading-relaxed text-white/90"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#39f8f2]/15 ring-1 ring-[#39f8f2]/40">
                      <Check
                        className="h-3.5 w-3.5 text-[#39f8f2]"
                        aria-hidden
                      />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href={STORE_LINKS.apple}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 rounded-xl bg-white px-5 py-3 text-[#00415a] shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#eaf6f5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#39f8f2]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-7 w-7 shrink-0"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                  </svg>
                  <span className="text-left text-sm font-bold leading-tight">
                    {t("app_ios_cta")}
                  </span>
                </a>

                <a
                  href={STORE_LINKS.google}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 rounded-xl bg-white px-5 py-3 text-[#00415a] shadow-lg shadow-black/20 transition hover:-translate-y-0.5 hover:bg-[#eaf6f5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#39f8f2]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-7 w-7 shrink-0"
                    aria-hidden
                  >
                    <path
                      fill="#00d2ff"
                      d="M3.6 1.8 13.8 12 3.6 22.2a1.7 1.7 0 0 1-.6-1.3V3.1c0-.5.2-1 .6-1.3z"
                    />
                    <path
                      fill="#00f076"
                      d="m17.2 8.6-3.4 3.4L3.6 1.8c.4-.3 1-.3 1.6 0l12 6.8z"
                    />
                    <path
                      fill="#ff3a44"
                      d="m17.2 15.4-12 6.8c-.6.3-1.2.3-1.6 0L13.8 12l3.4 3.4z"
                    />
                    <path
                      fill="#ffc400"
                      d="m21 10.9-3.8-2.3L13.8 12l3.4 3.4 3.8-2.3c1.3-.7 1.3-1.5 0-2.2z"
                    />
                  </svg>
                  <span className="text-left text-sm font-bold leading-tight">
                    {t("app_android_cta")}
                  </span>
                </a>
              </div>

              {showRating && (
                <p className="mt-5 text-sm font-semibold text-white/80">
                  {storeRating}
                </p>
              )}

              <Link
                href={href("/get-app")}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white/80 underline underline-offset-4 transition hover:text-white"
              >
                {t("app_more")}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>

            {/* RIGHT: phone mockup (decorative, language-neutral) */}
            <div
              aria-hidden
              className="relative mx-auto w-full max-w-[300px] md:max-w-[320px]"
            >
              {/* floating Word chip */}
              <div className="absolute -left-4 top-24 z-20 flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-xl shadow-black/25 sm:-left-10">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2b579a]/10 text-[#2b579a]">
                  <FileText className="h-4 w-4" />
                </span>
                <span className="text-sm font-bold text-[#00415a]">Word</span>
              </div>

              {/* floating Excel chip */}
              <div className="absolute -right-3 bottom-28 z-20 flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-xl shadow-black/25 sm:-right-8">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#217346]/10 text-[#217346]">
                  <FileSpreadsheet className="h-4 w-4" />
                </span>
                <span className="text-sm font-bold text-[#00415a]">Excel</span>
              </div>

              {/* phone body */}
              <div className="relative rounded-[2.6rem] border-[10px] border-[#0a2a38] bg-[#0a2a38] shadow-2xl shadow-black/40 md:rotate-[3deg]">
                <div className="overflow-hidden rounded-[2rem] bg-[#f4f9f9]">
                  {/* notch */}
                  <div className="flex justify-center bg-[#1b9e99] pb-3 pt-2">
                    <span className="h-1.5 w-16 rounded-full bg-[#0a2a38]/60" />
                  </div>

                  <div className="space-y-3 p-4">
                    {/* handwritten page */}
                    <div className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200">
                      <svg viewBox="0 0 220 84" className="w-full" fill="none">
                        <g stroke="#cbd5e1" strokeWidth="1">
                          <path d="M0 22H220M0 44H220M0 66H220" />
                        </g>
                        <g
                          stroke="#00415a"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M6 18c6-10 10 6 14-2s6-8 10 0 8 4 12-2 8 0 10 4 8-2 12-4 8 2 12 0" />
                          <path d="M6 40c5-8 9 4 13-2s7-6 11 1 7 3 12-3 9 2 12 3 9-4 13-3 7 3 11 1" />
                          <path d="M6 62c7-9 10 5 15-2s8-5 12 2 8 2 13-2 7 1 12 2" />
                        </g>
                      </svg>
                    </div>

                    {/* conversion arrow */}
                    <div className="flex justify-center">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1b9e99] text-white shadow-md shadow-[#1b9e99]/40">
                        <ArrowRight className="h-4 w-4 rotate-90" />
                      </span>
                    </div>

                    {/* converted table */}
                    <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-[#1b9e99]/30">
                      <div className="grid grid-cols-3 bg-[#1b9e99] px-3 py-2">
                        <span className="h-1.5 w-8 rounded-full bg-white/80" />
                        <span className="h-1.5 w-6 rounded-full bg-white/80" />
                        <span className="h-1.5 w-7 rounded-full bg-white/80" />
                      </div>
                      {[
                        ["12", "4.50", "54.00"],
                        ["8", "6.25", "50.00"],
                        ["20", "2.10", "42.00"],
                        ["5", "9.80", "49.00"],
                      ].map((row, i) => (
                        <div
                          key={i}
                          className={`grid grid-cols-3 px-3 py-2 text-xs font-semibold tabular-nums text-[#00415a] ${
                            i % 2 ? "bg-[#eaf6f5]" : "bg-white"
                          }`}
                        >
                          {row.map((cell) => (
                            <span key={cell}>{cell}</span>
                          ))}
                        </div>
                      ))}
                    </div>

                    {/* free preview pill */}
                    <div className="flex items-center justify-center gap-2 rounded-full bg-[#00415a] px-3 py-2 text-xs font-semibold text-white">
                      <Check className="h-3.5 w-3.5 text-[#39f8f2]" />
                      {t("fact_4")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BLOG */}
        <BlogSection />

        {/* FAQ */}
        <section className="py-20 lg:py-28" aria-labelledby="faq-h">
          <div className={`${wrap} grid gap-10 lg:grid-cols-[1fr_2fr]`}>
            <div>
              <h2
                id="faq-h"
                className="text-2xl font-extrabold tracking-tight text-[#00415a] sm:text-3xl"
              >
                {t("faq_title")}
              </h2>
            </div>

            <div className="space-y-3">
              {faq.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-xl border border-slate-200 bg-white px-6 py-4 transition open:border-[#1b9e99]/40 open:bg-[#eaf6f5]/40"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-[#00415a] marker:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1b9e99] [&::-webkit-details-marker]:hidden">
                    {item.q}
                    <Plus
                      className="h-5 w-5 shrink-0 text-[#1b9e99] transition-transform group-open:rotate-45"
                      aria-hidden
                    />
                  </summary>
                  <p className="mt-4 leading-relaxed text-slate-600">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="px-5 pb-20 sm:px-8 lg:pb-28">
          <div className="mx-auto max-w-6xl rounded-3xl bg-[#00415a] px-7 py-16 text-center text-white sm:px-12 md:py-20">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              {t("final_title")}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              {t("final_desc")}
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <UploadTrigger className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#1b9e99] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-[#1b9e99]/20 transition hover:-translate-y-0.5 hover:bg-[#158782] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1b9e99] sm:flex-none sm:px-7 sm:py-3.5 sm:text-base">
                <Upload
                  className="h-4 w-4 shrink-0 sm:h-5 sm:w-5"
                  aria-hidden
                />
                <span className="truncate">{t("cta_try")}</span>
              </UploadTrigger>
              <a
                href={app("/signup")}
                className="inline-flex items-center rounded-xl border border-white/30 px-7 py-3.5 font-bold text-white transition hover:bg-white/10"
              >
                {t("final_signup")}
              </a>
            </div>

            <p className="mt-6 text-sm text-white/70">{t("trust_line")}</p>
          </div>
        </section>
      </main>
    </ConverterProvider>
  );
}
