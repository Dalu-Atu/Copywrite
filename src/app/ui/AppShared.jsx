"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";

/* Leave a store's value as "" until it's live in that store. */
export const STORE_LINKS = {
  apple:
    "https://apps.apple.com/ng/app/noteocr-handwriting-to-text/id6803424702",
  google: "https://play.google.com/store/apps/details?id=com.noteocr.app",
};

/* Official launch date shown in the countdown modal. */
export const LAUNCH_DATE = new Date("2026-09-21T00:00:00");

export function Reveal({
  children,
  className = "",
  as: Tag = "div",
  delay = 0,
}) {
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

export function CameraIcon(props) {
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

export function CloudSyncIcon(props) {
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

export function DevicesSyncIcon(props) {
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

export function BellIcon(props) {
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

export function CloseIcon(props) {
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

/* Used for the trust-signal row on both AppPage and UseCaseLandingPage. */
export function CheckIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4 10.5l3.5 3.5L16 6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Maps the plain-string iconKey in app-usecases-config.js to a real component. */
export const ICONS_BY_KEY = {
  camera: CameraIcon,
  cloud: CloudSyncIcon,
  devices: DevicesSyncIcon,
  bell: BellIcon,
};

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

/* ---------- launch modal ---------- */

export function LaunchModal({ open, onClose, store }) {
  const t = useTranslations("AppPage");
  const { days, hours, minutes, seconds } = useCountdown(LAUNCH_DATE);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    const previouslyFocused = document.activeElement;
    dialogRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  const storeLabel =
    store === "apple"
      ? t("store_apple_bottom")
      : store === "google"
        ? t("store_google_bottom")
        : t("modal_store_fallback");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      role="presentation"
    >
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-[#0D1013]/80 backdrop-blur-sm"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="launch-modal-title"
        tabIndex={-1}
        className="relative w-full max-w-sm rounded-2xl border border-[#34D399]/30 bg-[#15191F] p-7 text-center shadow-2xl outline-none sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34D399]"
        >
          <CloseIcon className="h-4 w-4" />
        </button>

        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70">
          <span className="h-1.5 w-1.5 rounded-full bg-[#34D399]" />
          {t("modal_pill", { store: storeLabel })}
        </div>

        <h3
          id="launch-modal-title"
          className="font-serif text-2xl leading-tight tracking-tight text-[#F4F1EA] sm:text-[1.7rem]"
        >
          {t("modal_title")}
        </h3>
        <p className="mx-auto mt-3 max-w-[32ch] text-sm leading-relaxed text-white/60">
          {t("modal_desc")}
        </p>

        <div className="mx-auto mt-7 flex max-w-xs items-start justify-center gap-4 sm:gap-6">
          <CountdownUnit value={days} label={t("modal_days")} />
          <CountdownUnit value={hours} label={t("modal_hrs")} />
          <CountdownUnit value={minutes} label={t("modal_min")} />
          <CountdownUnit value={seconds} label={t("modal_sec")} />
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-8 flex flex-col gap-2 sm:flex-row"
        >
          {/* <input
            type="email"
            required
            placeholder={t("modal_email_placeholder")}
            aria-label={t("modal_email_aria")}
            className="w-full flex-1 rounded-lg border border-white/15 bg-[#0D1013] px-3.5 py-2.5 text-sm text-[#F4F1EA] placeholder:text-white/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34D399]"
          />
          <button
            type="submit"
            className="rounded-lg bg-[#10B981] px-4 py-2.5 text-sm font-medium text-[#0D1013] transition-colors hover:bg-[#34D399] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#34D399]"
          >
            {t("modal_notify_button")}
          </button> */}
        </form>
      </div>
    </div>
  );
}

export function StoreButton({ store, href, onUnavailable, className = "" }) {
  const t = useTranslations("AppPage");

  const isApple = store === "apple";

  const handleClick = (e) => {
    if (!href) {
      e.preventDefault();
      onUnavailable(store);
    }
  };

  const topLabel = isApple ? t("store_apple_top") : t("store_google_top");

  const bottomLabel = isApple
    ? t("store_apple_bottom")
    : t("store_google_bottom");

  return (
    <a
      href={href || "#"}
      onClick={handleClick}
      aria-haspopup={href ? undefined : "dialog"}
      className={[
        // Base button
        "group inline-flex items-center justify-center gap-3",
        "rounded-xl border border-white/15 bg-[#15191F]",
        "px-5 py-3",
        "whitespace-nowrap",

        // On extremely small phones:
        // make the actual <a> full width
        "max-[450px]:flex",
        "max-[450px]:w-full",
        "max-[450px]:justify-center",

        // Hover / focus
        "transition-colors",
        "hover:border-[#34D399]/60",
        "hover:bg-[#1B2028]",
        "focus-visible:outline",
        "focus-visible:outline-2",
        "focus-visible:outline-offset-2",
        "focus-visible:outline-[#34D399]",

        className,
      ].join(" ")}
    >
      <span className="shrink-0 text-[#34D399]" aria-hidden="true">
        {isApple ? (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
            <path d="M16.5 12.6c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3-1.6-1.3-.1-2.5.8-3.1.8-.6 0-1.6-.7-2.6-.7-1.3 0-2.6.8-3.3 2-1.4 2.4-.4 6 1 8 .7 1 1.5 2.1 2.6 2 1-.1 1.4-.7 2.7-.7s1.6.7 2.7.6c1.1 0 1.8-1 2.5-2 .8-1.1 1.1-2.2 1.1-2.3-.1 0-2.1-.8-2.4-2.9zM14.3 5.9c.6-.7 1-1.7.9-2.6-.9 0-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.5.9.1 1.9-.5 2.5-1.2z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor">
            <path d="M4.5 3.5c-.4.3-.6.8-.6 1.4v14.2c0 .6.2 1.1.6 1.4l8.2-8.5-8.2-8.5z" />

            <path
              d="M15.7 12l2.7-1.6-3.4-2-2.8 2.8 2.8 2.8 3.4-2-2.7-1.6z"
              opacity=".55"
            />

            <path
              d="M4.9 3.2 15 9.4l2.9-1.7L6.7 2c-.6-.3-1.3-.2-1.8.2z"
              opacity=".8"
            />

            <path
              d="M4.9 20.8 15 14.6l2.9 1.7L6.7 22c-.6.3-1.3.2-1.8-.2z"
              opacity=".8"
            />
          </svg>
        )}
      </span>

      <span className="text-left leading-tight">
        <span className="block text-[10px] uppercase tracking-wide text-white/50">
          {topLabel}
        </span>

        <span className="block font-medium text-white/95">{bottomLabel}</span>
      </span>
    </a>
  );
}
