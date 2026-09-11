"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  Reveal,
  LaunchModal,
  StoreButton,
  STORE_LINKS,
  ICONS_BY_KEY,
  CheckIcon,
} from "./AppShared";
import { USE_CASES } from "./app-usecases-config";

const TRUST_KEYS = ["trust_1", "trust_2", "trust_3"];
const STEP_KEYS = ["step_1", "step_2", "step_3"];
const AUDIENCE_KEYS = ["audience_1", "audience_2", "audience_3", "audience_4"];
const COMPARISON_ROWS = ["row1", "row2", "row3"];

/* Margin rule: the recurring structural device (ruled-notebook motif)
   used instead of generic card borders / dividers throughout the page. */
function MarginHeading({ eyebrow, children, className = "" }) {
  return (
    <div
      className={`relative border-l-2 border-[#34D399]/40 pl-6 ${className}`}
    >
      {eyebrow && <p className="mb-2 text-sm text-white/45">{eyebrow}</p>}
      {children}
    </div>
  );
}

/* Hero device: crossfades a capture screenshot into the converted result,
   with a single scan-line sweep. This is the one orchestrated motion
   moment on the page — everything else is static. */
function ScanDemo({
  videoAlt,
  label,
  scanLineStart = 700,
  scanLineEnd = 1900,
}) {
  const [showScanLine, setShowScanLine] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) return; // just show the poster/first frame, no scan-line

    const t1 = setTimeout(() => setShowScanLine(true), scanLineStart);
    const t2 = setTimeout(() => setShowScanLine(false), scanLineEnd);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [scanLineStart, scanLineEnd]);

  return (
    <div className="relative mx-auto w-full max-w-xs lg:max-w-sm">
      <div
        aria-hidden="true"
        className="absolute inset-6 -z-10 rounded-full bg-[#34D399]/20 blur-3xl"
      />

      {/* Device frame */}
      <div className="relative overflow-hidden rounded-[2.25rem] border border-white/15 bg-[#15191F] p-2 shadow-2xl">
        <div className="relative aspect-[9/18.3] overflow-hidden rounded-[1.75rem] bg-[#0D1013]">
          {!videoFailed ? (
            <video
              ref={videoRef}
              src="/videos/scan-demo.mp4"
              poster="/images/scan-demo.png"
              aria-label={videoAlt}
              onError={() => setVideoFailed(true)}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 h-full w-full bg-[#0D1013] object-cover object-top"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-xs text-white/40">
              Demo unavailable
            </div>
          )}

          {/* Scan-line sweep */}
          {showScanLine && (
            <div className="pointer-events-none absolute inset-0">
              <div className="scan-line" />
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .scan-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          top: 0;
          background: linear-gradient(
            90deg,
            transparent,
            #34d399 20%,
            #34d399 80%,
            transparent
          );
          box-shadow: 0 0 12px 2px rgba(52, 211, 153, 0.6);
          animation: sweep 1.2s ease-in-out forwards;
        }
        @keyframes sweep {
          0% {
            top: 0%;
          }
          100% {
            top: 100%;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .scan-line {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
export default function UseCaseLandingPage({ useCase, locale }) {
  const t = useTranslations(useCase.namespace);
  const tApp = useTranslations("AppPage");
  const tRoot = useTranslations();
  const [modalStore, setModalStore] = useState(null);
  const localePath = locale === "en" ? "" : `/${locale}`;

  const Icon = ICONS_BY_KEY[useCase.iconKey];
  const related = USE_CASES.filter((u) => u.slug !== useCase.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-[#0D1013] text-[#F4F1EA] antialiased selection:bg-[#34D399] selection:text-[#0D1013]">
      <LaunchModal
        open={modalStore !== null}
        store={modalStore}
        onClose={() => setModalStore(null)}
      />

      {/* ---------------- Header ---------------- */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0D1013]/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a
            href={`${localePath}/`}
            className="font-serif text-xl italic tracking-tight text-[#F4F1EA]"
          >
            NoteOCR
          </a>
          <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
            <a
              href={`${localePath}/`}
              className="transition-colors hover:text-white"
            >
              {tApp("nav_home")}
            </a>
            <a
              href={`${localePath}/app#why-the-app`}
              className="transition-colors hover:text-white"
            >
              {tApp("nav_features")}
            </a>
            <a
              href={`${localePath}/pricing`}
              className="transition-colors hover:text-white"
            >
              {tApp("nav_pricing")}
            </a>
          </nav>
          <a
            href="#download"
            className="rounded-lg bg-[#10B981] px-4 py-2 text-sm font-medium text-[#0D1013] transition-colors hover:bg-[#34D399] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34D399]"
          >
            {tApp("nav_download_button")}
          </a>
        </div>
      </header>

      <main>
        {/* ---------------- 1. Hero ---------------- */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, transparent, transparent 33px, rgba(244,241,234,0.9) 34px)",
            }}
          />
          <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 pb-20 pt-16 lg:grid-cols-2 lg:gap-10 lg:pb-28 lg:pt-24">
            <div>
              <p className="mb-5 text-sm text-white/50">{t("hero_pill")}</p>

              <h1 className="font-serif text-3xl leading-[1.08] tracking-tight text-[#F4F1EA] sm:text-5xl lg:text-[3.25rem]">
                {t("hero_title")}
              </h1>

              <p className="mt-6 max-w-[46ch] leading-relaxed text-white/65 md:text-lg text-sm">
                {t("hero_subtitle")}
              </p>

              {/* Trust row */}
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/60">
                {TRUST_KEYS.map((key) => (
                  <span key={key} className="inline-flex items-center gap-1.5">
                    <CheckIcon className="h-4 w-4 text-[#34D399]" />
                    {t(key)}
                  </span>
                ))}
              </div>

              <div
                className="mt-9 flex w-full flex-nowrap items-start justify-start gap-3 max-[450px]:flex-col max-[450px]:items-stretch"
                id="download"
              >
                <StoreButton
                  store="apple"
                  href={STORE_LINKS.apple}
                  onUnavailable={setModalStore}
                />
                <StoreButton
                  store="google"
                  href={STORE_LINKS.google}
                  onUnavailable={setModalStore}
                />
              </div>
            </div>

            <ScanDemo
              captureAlt={t("hero_image_alt")}
              resultAlt={t("after_alt")}
              label={t("hero_scan_label")}
            />
          </div>
        </section>

        {/* ---------------- 2. Pain point ---------------- */}
        <section className="border-t border-white/[0.08]">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24 lg:py-28">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              {/* Small label / visual anchor */}
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[#34D399]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#34D399]" />
                  {t("pain_eyebrow")}
                </span>

                <h2 className="mt-5 max-w-xl font-serif text-3xl leading-[1.08] tracking-tight text-[#F4F1EA] sm:text-4xl lg:text-5xl">
                  {t("pain_title")}
                </h2>
              </div>

              {/* Main statement */}
              <div className="relative">
                <div className="absolute -left-5 top-0 hidden h-full w-px bg-gradient-to-b from-[#34D399]/60 via-white/10 to-transparent lg:block" />

                <p className="max-w-2xl text-lg leading-relaxed text-white/60 sm:text-xl lg:text-[1.35rem] lg:leading-relaxed">
                  {t("pain_desc")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- 3. Before / After ---------------- */}
        <section className="border-t border-white/[0.08]">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24 lg:py-28">
            {/* Heading */}
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[#34D399]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#34D399]" />
                {t("before_after_eyebrow")}
              </span>

              <h2 className="mt-5 font-serif text-3xl leading-[1.08] tracking-tight text-[#F4F1EA] sm:text-4xl lg:text-5xl">
                {t("before_after_title")}
              </h2>

              <p className="mt-5 text-sm leading-relaxed text-white/55 sm:text-base lg:text-lg">
                {t("before_after_desc")}
              </p>
            </div>

            {/* Transformation */}
            <div className="mt-12 grid gap-5 md:grid-cols-[1fr_auto_1fr] md:items-center lg:mt-16">
              {/* BEFORE */}
              <div className="group">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/[0.10] bg-[#15191F] shadow-2xl shadow-black/20">
                  <Image
                    src={useCase.images.before}
                    alt={t("before_alt")}
                    fill
                    sizes="(min-width: 1024px) 520px, (min-width: 768px) 45vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.02]"
                  />

                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />

                  <span className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur-md">
                    {t("before_label")}
                  </span>
                </div>
              </div>

              {/* TRANSFORM INDICATOR */}
              <div className="flex items-center justify-center py-1 md:px-2 md:py-0">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#34D399]/30 bg-[#34D399]/[0.08] text-[#34D399]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* AFTER */}
              <div className="group">
                <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-[#34D399]/30 bg-[#F3EEDF] shadow-2xl shadow-black/20">
                  <Image
                    src={useCase.images.after}
                    alt={t("after_alt")}
                    fill
                    sizes="(min-width: 1024px) 520px, (min-width: 768px) 45vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-[1.02]"
                  />

                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />

                  <span className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-[#0D1013]/75 px-3 py-1.5 text-xs font-medium text-[#F4F1EA] backdrop-blur-md">
                    {t("after_label")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- 4. How it works ---------------- */}
        <section className="border-t border-white/[0.08]">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24 lg:py-28">
            {/* Heading */}
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[#34D399]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#34D399]" />
                {t("how_eyebrow")}
              </span>

              <h2 className="mt-5 font-serif text-3xl leading-[1.08] tracking-tight text-[#F4F1EA] sm:text-4xl lg:text-5xl">
                {t("how_title")}
              </h2>

              <p className="mt-5 text-sm leading-relaxed text-white/55 sm:text-base lg:text-lg">
                {t("how_subtitle")}
              </p>
            </div>

            {/* Steps */}
            <ol className="mt-12 grid gap-4 sm:mt-16 md:grid-cols-3 lg:gap-6">
              {STEP_KEYS.map((key, i) => (
                <li
                  key={key}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.025] p-6 transition duration-300 hover:border-[#34D399]/25 hover:bg-white/[0.04] sm:p-7 lg:p-8"
                >
                  {/* Step number */}
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#34D399]/25 bg-[#34D399]/[0.07] font-serif text-lg text-[#34D399]">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {i < STEP_KEYS.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="hidden text-white/20 md:block"
                      >
                        →
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <h3 className="mt-8 text-lg font-medium tracking-tight text-[#F4F1EA]">
                    {t(`${key}_title`)}
                  </h3>

                  <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-white/50">
                    {t(`${key}_desc`)}
                  </p>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-[#34D399]/40 via-[#34D399]/10 to-transparent opacity-0 transition duration-300 group-hover:opacity-100 sm:left-7 sm:right-7 lg:left-8 lg:right-8" />
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------------- 5. Who it's for ---------------- */}
        <section className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
            <MarginHeading className="max-w-2xl">
              <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
                {t("who_title")}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/65 md:text-lg">
                {t("who_subtitle")}
              </p>
            </MarginHeading>

            <div className="mt-12 divide-y divide-white/10 border-t border-white/10">
              {AUDIENCE_KEYS.map((key) => (
                <div
                  key={key}
                  className="grid gap-2 py-6 sm:grid-cols-[minmax(0,220px)_1fr] sm:gap-8"
                >
                  <h3 className="text-base font-medium text-[#F4F1EA]">
                    {t(`${key}_title`)}
                  </h3>
                  <p className="max-w-[60ch] text-sm leading-relaxed text-white/60">
                    {t(`${key}_desc`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- 6. Comparison table ---------------- */}
        <section className="border-t border-white/10">
          <div className="mx-auto max-w-4xl px-6 py-20 lg:py-28">
            <MarginHeading className="max-w-2xl">
              <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
                {t("comparison_title")}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/65 md:text-lg">
                {t("comparison_subtitle")}
              </p>
            </MarginHeading>

            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-white/15 text-white/50">
                    <th className="py-3 pr-4 font-normal">
                      {t("comparison_col_method")}
                    </th>
                    <th className="py-3 pr-4 font-normal">
                      {t("comparison_col_time")}
                    </th>
                    <th className="py-3 pr-4 font-normal">
                      {t("comparison_col_accuracy")}
                    </th>
                    <th className="py-3 font-normal">
                      {t("comparison_col_cost")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row) => {
                    const isNoteOCR = row === "row3";
                    return (
                      <tr
                        key={row}
                        className={[
                          "border-b border-white/10",
                          isNoteOCR ? "text-[#34D399]" : "text-white/75",
                        ].join(" ")}
                      >
                        <td className="py-4 pr-4 font-medium">
                          {t(`${row}_method`)}
                        </td>
                        <td className="py-4 pr-4">{t(`${row}_time`)}</td>
                        <td className="py-4 pr-4">{t(`${row}_accuracy`)}</td>
                        <td className="py-4">{t(`${row}_cost`)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ---------------- 7. Proof point ---------------- */}
        {/* <section className="border-t border-white/10">
          <div className="mx-auto max-w-5xl px-6 py-20 lg:py-24">
            <div className="grid gap-10 rounded-2xl border border-white/10 bg-[#15191F] p-8 sm:p-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3">
                  <Image
                    src="/images/app-icon.png"
                    alt="NoteOCR app icon"
                    width={40}
                    height={40}
                    className="rounded-xl"
                  />
                  <span className="font-serif text-lg italic">NoteOCR</span>
                </div>
                <p className="mt-6 font-serif text-3xl italic leading-snug text-[#34D399]">
                  {t("proof_stat_number")}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-white/55">
                  {t("proof_stat_label")}
                </p>
              </div>

              <div className="flex flex-col justify-center border-t border-white/10 pt-8 lg:border-l lg:border-t-0 lg:pl-16 lg:pt-0">
                <p className="max-w-[52ch] text-lg leading-relaxed text-[#F4F1EA]">
                  {t("proof_quote")}
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <Image
                    src="/images/avatar-1.jpg"
                    alt=""
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                  <div className="text-sm">
                    <p className="font-medium text-[#F4F1EA]">
                      {t("proof_quote_name")}
                    </p>
                    <p className="text-white/50">{t("proof_quote_role")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* ---------------- 8. FAQ ---------------- */}
        <section className="border-t border-white/10">
          <div className="mx-auto max-w-3xl px-6 py-20 lg:py-28">
            <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
              {t("faq_title")}
            </h2>

            <div className="mt-10 divide-y divide-white/10 border-t border-white/10">
              {useCase.faqKeys.map((key) => (
                <details key={key} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-medium text-[#F4F1EA] marker:content-none">
                    {t(`FAQ.items.${key}.q`)}
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full border border-white/20 text-white/60 transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-white/60">
                    {t(`FAQ.items.${key}.a`)}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- 9. Related use cases ---------------- */}
        {related.length > 0 && (
          <section className="border-t border-white/10">
            <div className="mx-auto max-w-6xl px-6 py-20 lg:py-24">
              <MarginHeading>
                <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
                  {t("related_title")}
                </h2>
              </MarginHeading>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {related.map((rel) => {
                  const RelIcon = ICONS_BY_KEY[rel.iconKey];
                  return (
                    <a
                      key={rel.slug}
                      href={`${localePath}/app/${rel.slug}`}
                      className="group flex items-center gap-4 rounded-2xl border border-white/10 p-5 transition-colors hover:border-[#34D399]/60 hover:bg-[#15191F] sm:p-6"
                    >
                      {RelIcon && (
                        <RelIcon className="h-8 w-8 flex-none text-[#E3B23C]" />
                      )}
                      <span className="text-base font-medium text-[#F4F1EA] transition-colors group-hover:text-[#34D399]">
                        {tRoot(`${rel.namespace}.nav_label`)}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ---------------- 10. Final CTA ---------------- */}
        <section className="border-t border-white/10 px-6 py-20 lg:py-28">
          <div className="mx-auto max-w-3xl rounded-3xl border border-[#34D399]/30 bg-gradient-to-b from-[#15191F] to-[#0D1013] px-8 py-14 text-center sm:px-14">
            <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
              {t("cta_title")}
            </h2>
            <p className="mx-auto mt-4 max-w-[38ch] text-lg text-white/65">
              {t("cta_subtitle")}
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <StoreButton
                store="apple"
                href={STORE_LINKS.apple}
                onUnavailable={setModalStore}
              />
              <StoreButton
                store="google"
                href={STORE_LINKS.google}
                onUnavailable={setModalStore}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
