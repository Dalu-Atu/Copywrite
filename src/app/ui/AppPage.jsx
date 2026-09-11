"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { APP_FAQ_KEYS } from "./app-faq-keys";
import ExploreByUseCase from "./ExploreByUseCase";
import { LaunchModal, StoreButton, STORE_LINKS } from "./AppShared";

const LAUNCH_DATE = new Date("2026-09-21T00:00:00");

function Reveal({ children, className = "", as: Tag = "div", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={[
        "transition-all duration-700 ease-out",
        "motion-reduce:transition-none motion-reduce:transform-none",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        className,
      ].join(" ")}
    >
      {children}
    </Tag>
  );
}

/* ---------- small inline icons (no icon library) ---------- */

function CameraIcon(props) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" {...props}>
      <rect
        x="5"
        y="12"
        width="30"
        height="21"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M14 12l2.4-4h7.2l2.4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle
        cx="20"
        cy="22.5"
        r="6.2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="29.5" cy="17" r="1.1" fill="currentColor" />
    </svg>
  );
}

function CloudSyncIcon(props) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" {...props}>
      <path
        d="M13 27.5a6.5 6.5 0 0 1-1-12.9 8 8 0 0 1 15.4-2.6A6.5 6.5 0 0 1 27 27.5H13z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 21.5 20 18l3.5 3.5M20 18v9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DevicesSyncIcon(props) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" {...props}>
      <rect
        x="5"
        y="9"
        width="18"
        height="13"
        rx="1.6"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M9 26h10"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <rect
        x="26"
        y="15"
        width="9"
        height="16"
        rx="1.8"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M29.5 27.5h2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BellIcon(props) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" {...props}>
      <path
        d="M20 8.5c-4 0-6.6 3-6.6 7v4.4c0 1.5-.5 2.9-1.4 4l-1 1.2h18l-1-1.2a6.4 6.4 0 0 1-1.4-4V15.5c0-4-2.6-7-6.6-7z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M17 27.5a3 3 0 0 0 6 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6 6l12 12M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ---------- static content (icons + image sources only — copy comes from t()) ---------- */

const FEATURE_KEYS = [
  { key: "feature_1", icon: CameraIcon },
  { key: "feature_2", icon: CloudSyncIcon },
  { key: "feature_3", icon: DevicesSyncIcon },
  { key: "feature_4", icon: BellIcon },
];

const STEP_KEYS = ["step_1", "step_2", "step_3"];

const SCREENSHOTS = [
  { src: "/Screenshot1.png", altKey: "screenshot_1_alt" },
  { src: "/Screenshot4.png", altKey: "screenshot_2_alt" },
  { src: "/Screenshot2.png", altKey: "screenshot_3_alt" },
  { src: "/Screenshot3.png", altKey: "screenshot_4_alt" },
  { src: "/Screenshot5.png", altKey: "screenshot_5_alt" },
];

/* ---------- countdown ---------- */

function getTimeLeft(target) {
  const diff = target.getTime() - Date.now();
  const clamped = Math.max(diff, 0);
  return {
    total: clamped,
    days: Math.floor(clamped / (1000 * 60 * 60 * 24)),
    hours: Math.floor((clamped / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((clamped / (1000 * 60)) % 60),
    seconds: Math.floor((clamped / 1000) % 60),
  };
}

function useCountdown(target) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
}

function CountdownUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-serif text-3xl tabular-nums text-[#F4F1EA] sm:text-4xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 text-[11px] uppercase tracking-wide text-white/50">
        {label}
      </span>
    </div>
  );
}

export default function AppPage({ locale }) {
  const t = useTranslations("AppPage");
  const [modalStore, setModalStore] = useState(null);
  const localePath = locale === "en" ? "" : `/${locale}`;

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
              {t("nav_home")}
            </a>
            <a
              href="#why-the-app"
              className="transition-colors hover:text-white"
            >
              {t("nav_features")}
            </a>
            <a
              href={`${localePath}/pricing`}
              className="transition-colors hover:text-white"
            >
              {t("nav_pricing")}
            </a>
          </nav>
          <a
            href="#download"
            className="rounded-lg bg-[#10B981] px-4 py-2 text-sm font-medium text-[#0D1013] transition-colors hover:bg-[#34D399] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34D399]"
          >
            {t("nav_download_button")}
          </a>
        </div>
      </header>

      <main>
        {/* ---------------- Hero ---------------- */}
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
            <Reveal>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-[#34D399]" />
                {t("hero_pill")}
              </div>
              <h1 className="font-serif text-4xl leading-[1.08] tracking-tight text-[#F4F1EA] sm:text-5xl lg:text-[3.4rem]">
                {t("hero_title")}
              </h1>
              <p className="mt-6 max-w-[46ch] leading-relaxed text-white/65 md:text-lg text-sm">
                {t("hero_subtitle")}
              </p>

              <div
                className=" mt-9 flex w-full flex-nowrap items-start justify-center gap-3 max-[450px]:flex-col max-[450px]:items-center "
                id="download"
              >
                {" "}
                <StoreButton
                  store="apple"
                  href={STORE_LINKS.apple}
                  onUnavailable={setModalStore}
                />{" "}
                <StoreButton
                  store="google"
                  href={STORE_LINKS.google}
                  onUnavailable={setModalStore}
                />{" "}
              </div>
            </Reveal>

            <Reveal
              delay={120}
              className="relative mx-auto w-full max-w-xs lg:max-w-sm"
            >
              <div
                aria-hidden="true"
                className="absolute inset-6 -z-10 rounded-full bg-[#34D399]/20 blur-3xl"
              />
              <span
                aria-hidden="true"
                className="absolute -left-3 -top-3 h-8 w-8 rounded-tl-lg"
                style={{
                  borderLeft: "2px solid rgba(227,178,60,0.7)",
                  borderTop: "2px solid rgba(227,178,60,0.7)",
                }}
              />
              <span
                aria-hidden="true"
                className="absolute -right-3 -top-3 h-8 w-8 rounded-tr-lg"
                style={{
                  borderRight: "2px solid rgba(227,178,60,0.7)",
                  borderTop: "2px solid rgba(227,178,60,0.7)",
                }}
              />
              <span
                aria-hidden="true"
                className="absolute -left-3 -bottom-3 h-8 w-8 rounded-bl-lg"
                style={{
                  borderLeft: "2px solid rgba(227,178,60,0.7)",
                  borderBottom: "2px solid rgba(227,178,60,0.7)",
                }}
              />
              <span
                aria-hidden="true"
                className="absolute -right-3 -bottom-3 h-8 w-8 rounded-br-lg"
                style={{
                  borderRight: "2px solid rgba(227,178,60,0.7)",
                  borderBottom: "2px solid rgba(227,178,60,0.7)",
                }}
              />

              <Image
                src="/images/hero-phone.png"
                alt={t("hero_image_alt")}
                width={750}
                height={1524}
                sizes="(min-width: 1024px) 384px, 320px"
                className="relative h-auto w-full drop-shadow-2xl"
                priority
              />
            </Reveal>
          </div>
        </section>

        {/* ---------------- Why the App ---------------- */}
        <section
          id="why-the-app"
          className="mx-auto max-w-6xl px-6 py-20 lg:py-28"
        >
          <Reveal className="max-w-2xl">
            <p className="mb-3 text-sm text-[#34D399]">{t("why_pill")}</p>
            <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
              {t("why_title")}
            </h2>
            <p className="mt-4 md:text-lg text-sm leading-relaxed text-white/65">
              {t("why_subtitle")}
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {FEATURE_KEYS.map(({ key, icon: Icon }, i) => (
              <Reveal
                key={key}
                delay={i * 80}
                as="article"
                className="rounded-2xl border border-white/10 p-5 sm:p-6"
              >
                <Icon className="h-8 w-8 text-[#E3B23C]" />
                <h3 className="mt-5 text-base font-medium text-[#F4F1EA]">
                  {t(`${key}_title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {t(`${key}_desc`)}
                </p>
              </Reveal>
            ))}
          </div>
        </section>

        <ExploreByUseCase locale={locale} />

        {/* ---------------- How It Works ---------------- */}
        <section className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
            <Reveal className="max-w-2xl">
              <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
                {t("how_title")}
              </h2>
              <p className="mt-4 md:text-lg text-sm leading-relaxed text-white/65">
                {t("how_subtitle")}
              </p>
            </Reveal>

            <div className="mt-14 grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
              <ol className="grid gap-8 sm:grid-cols-3 lg:gap-6">
                {STEP_KEYS.map((key, i) => (
                  <Reveal
                    key={key}
                    as="li"
                    delay={i * 100}
                    className="relative"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E3B23C]/50 font-serif text-lg italic text-[#E3B23C]">
                      {i + 1}
                    </span>
                    <h3 className="mt-5 text-base font-medium text-[#F4F1EA]">
                      {t(`${key}_title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">
                      {t(`${key}_desc`)}
                    </p>
                  </Reveal>
                ))}
              </ol>

              <Reveal delay={150} className="relative mx-auto w-full max-w-xs">
                <div className="relative aspect-[9/20] overflow-hidden rounded-[1rem]">
                  <Image
                    src="/images/2.png"
                    alt={t("how_image_alt")}
                    width={750}
                    height={1574}
                    sizes="(min-width: 1024px) 384px, 320px"
                    className="relative h-auto w-full drop-shadow-2xl"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------------- Handwriting to Excel ---------------- */}
        <section className="border-t border-white/10">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
            <Reveal>
              <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
                {t("excel_title")}
              </h2>
              <p className="mt-5 max-w-[46ch] leading-relaxed text-white/65 md:text-lg text-sm">
                {t("excel_desc")}
              </p>
            </Reveal>

            <Reveal delay={120}>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10 bg-[#15191F]">
                  <Image
                    src="/xlsx.png"
                    alt={t("excel_before_alt")}
                    fill
                    sizes="(min-width: 640px) 220px, 45vw"
                    className="object-cover"
                  />
                  <span className="absolute bottom-2 left-2 rounded-md bg-black/60 px-2 py-1 text-xs text-white/80">
                    {t("excel_before_label")}
                  </span>
                </div>
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-[#34D399]/40 bg-[#F3EEDF]">
                  <Image
                    src="/images/scan-text.jpeg"
                    alt={t("excel_after_alt")}
                    fill
                    sizes="(min-width: 640px) 220px, 45vw"
                    className="object-cover"
                  />
                  <span className="absolute bottom-2 left-2 rounded-md bg-[#0D1013]/80 px-2 py-1 text-xs text-[#F3EEDF]">
                    {t("excel_after_label")}
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------------- Handwriting to Text ---------------- */}
        <section className="border-t border-white/10">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
            <Reveal className="order-2 lg:order-1">
              <div className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-xl border border-white/10 bg-[#15191F]">
                <Image
                  src="/images/noteocr-image002-bg.png"
                  alt={t("text_image_alt")}
                  fill
                  sizes="(min-width: 1024px) 480px, 90vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={120} className="order-1 lg:order-2">
              <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
                {t("text_title")}
              </h2>
              <p className="mt-5 max-w-[46ch] md:text-lg text-sm leading-relaxed text-white/65">
                {t("text_desc")}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ---------------- Screenshots / App Gallery ---------------- */}
        <section className="border-t border-white/10 py-20 lg:py-28">
          <Reveal className="mx-auto max-w-6xl px-6">
            <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
              {t("gallery_title")}
            </h2>
          </Reveal>

          <Reveal delay={100} className="mt-10">
            <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 lg:mx-auto lg:max-w-6xl lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:px-6">
              {SCREENSHOTS.map((shot) => (
                <div
                  key={shot.src}
                  className="relative aspect-[9/16] w-40 flex-none snap-start overflow-hidden rounded-2xl border border-white/10 bg-[#15191F] sm:w-48 lg:w-auto"
                >
                  <Image
                    src={shot.src}
                    alt={t(shot.altKey)}
                    fill
                    sizes="(min-width: 1024px) 20vw, 192px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ---------------- FAQ ---------------- */}
        <section className="border-t border-white/10">
          <div className="mx-auto max-w-3xl px-6 py-20 lg:py-28">
            <Reveal>
              <h2 className="font-serif text-3xl leading-tight tracking-tight sm:text-4xl">
                {t("faq_title")}
              </h2>
            </Reveal>

            <div className="mt-10 divide-y divide-white/10 border-t border-white/10">
              {APP_FAQ_KEYS.map((key, i) => (
                <Reveal as="div" key={key} delay={i * 40}>
                  <details className="group py-5">
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
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Final CTA ---------------- */}
        <section className="border-t border-white/10 px-6 py-20 lg:py-28">
          <Reveal
            as="div"
            className="mx-auto max-w-3xl rounded-3xl border border-[#34D399]/30 bg-gradient-to-b from-[#15191F] to-[#0D1013] px-8 py-14 text-center sm:px-14"
          >
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
          </Reveal>
        </section>
      </main>
    </div>
  );
}
