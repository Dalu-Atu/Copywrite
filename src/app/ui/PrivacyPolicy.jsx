"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  Shield,
  User,
  Database,
  Settings,
  Cookie,
  Share2,
  Globe,
  Clock,
  Eye,
  Lock,
  Baby,
  RefreshCw,
  Mail,
  ChevronRight,
  ArrowUp,
  Menu,
  X,
  CheckCircle2,
  FileText,
} from "lucide-react";

// ─── Section definitions ────────────────────────────────────────────────────
const useSections = (t) => [
  {
    id: "controller",
    icon: User,
    title: t("s1_t"),
    content: t("s1_c"),
    type: "text",
  },
  {
    id: "collection",
    icon: Database,
    title: t("s2_t"),
    content: t("s2_c"),
    type: "collection",
  },
  {
    id: "usage",
    icon: Settings,
    title: t("s3_t"),
    content: t("s3_c"),
    type: "text",
  },
  {
    id: "documents",
    icon: FileText,
    title: t("s4_t"),
    content: t("s4_c"),
    type: "documents",
  },
  {
    id: "cookies",
    icon: Cookie,
    title: t("s5_t"),
    content: t("s5_c"),
    type: "text",
  },
  {
    id: "sharing",
    icon: Share2,
    title: t("s6_t"),
    content: t("s6_c"),
    type: "text",
  },
  {
    id: "transfers",
    icon: Globe,
    title: t("s7_t"),
    content: t("s7_c"),
    type: "text",
  },
  {
    id: "retention",
    icon: Clock,
    title: t("s8_t"),
    content: t("s8_c"),
    type: "text",
  },
  {
    id: "rights",
    icon: Eye,
    title: t("s9_t"),
    content: t("s9_c"),
    type: "rights",
  },
  {
    id: "security",
    icon: Lock,
    title: t("s10_t"),
    content: t("s10_c"),
    type: "security",
  },
  {
    id: "children",
    icon: Baby,
    title: t("s11_t"),
    content: t("s11_c"),
    type: "text",
  },
  {
    id: "changes",
    icon: RefreshCw,
    title: t("s12_t"),
    content: t("s12_c"),
    type: "text",
  },
  {
    id: "contact",
    icon: Mail,
    title: t("s13_t"),
    content: t("s13_c"),
    type: "text",
  },
];

// ─── Data table rows ─────────────────────────────────────────────────────────
const useDataRows = (t) => [
  {
    type: t("data_row1_type"),
    purpose: t("data_row1_purpose"),
    basis: t("data_row1_basis"),
    retention: t("data_row1_retention"),
  },
  {
    type: t("data_row2_type"),
    purpose: t("data_row2_purpose"),
    basis: t("data_row2_basis"),
    retention: t("data_row2_retention"),
  },
  {
    type: t("data_row3_type"),
    purpose: t("data_row3_purpose"),
    basis: t("data_row3_basis"),
    retention: t("data_row3_retention"),
  },
  {
    type: t("data_row4_type"),
    purpose: t("data_row4_purpose"),
    basis: t("data_row4_basis"),
    retention: t("data_row4_retention"),
  },
  {
    type: t("data_row5_type"),
    purpose: t("data_row5_purpose"),
    basis: t("data_row5_basis"),
    retention: t("data_row5_retention"),
  },
];

const useRights = (t) => [
  { key: "right_access", icon: Eye },
  { key: "right_rectify", icon: Settings },
  { key: "right_erase", icon: X },
  { key: "right_restrict", icon: Lock },
  { key: "right_portability", icon: Share2 },
  { key: "right_object", icon: Shield },
  { key: "right_consent", icon: CheckCircle2 },
];

const SECURITY_BADGES_KEYS = [
  "security_badge1",
  "security_badge2",
  "security_badge3",
  "security_badge4",
  "security_badge5",
  "security_badge6",
  "security_badge7",
  "security_badge8",
];

const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

// ─── Main component ──────────────────────────────────────────────────────────
export default function PrivacyPolicy() {
  const t = useTranslations("PrivacyPage");
  const sections = useSections(t);
  const dataRows = useDataRows(t);
  const rights = useRights(t);

  const [activeSection, setActiveSection] = useState(sections[0].id);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 600);
      let current = sections[0].id;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && window.scrollY >= el.offsetTop - 150) current = s.id;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-emerald-100">
      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="relative bg-gray-950 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: NOISE_SVG, backgroundSize: "128px" }}
        />
        <div className="absolute -top-40 left-1/4 w-[700px] h-[500px] rounded-full bg-emerald-600/8 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full bg-emerald-600/6 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28 lg:pt-36 pb-14 sm:pb-20 lg:pb-24 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-[0.18em] mb-6 sm:mb-8">
            <Shield className="w-3.5 h-3.5" />
            <span>Data & Privacy</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-none mb-4 sm:mb-5">
            {t("hero_title")}
          </h1>

          <p className="text-gray-400 text-sm sm:text-base max-w-2xl leading-relaxed mb-6 sm:mb-8 px-2">
            {t("hero_subtitle")}
          </p>

          {/* Trust strip */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-6 sm:mb-8">
            {[
              "GDPR Compliant",
              "Swiss nFADP",
              "No Data Selling",
              "No AI Training",
            ].map((badge) => (
              <div
                key={badge}
                className="flex items-center gap-1.5 text-xs text-gray-500"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                <span>{badge}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
            <Clock className="w-4 h-4 text-gray-600 flex-shrink-0" />
            <span>
              {t("last_updated")}:{" "}
              <span className="text-gray-300 font-semibold">{t("date")}</span>
            </span>
          </div>

          {/* Quick-jump pills — hidden on xs */}
          <div className="mt-8 sm:mt-10 hidden sm:flex flex-wrap justify-center gap-2">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="px-3 py-1.5 text-xs font-medium rounded-full bg-white/[0.05] border border-white/[0.09] text-gray-500 hover:text-emerald-400 hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all"
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── MOBILE STICKY NAV ──────────────────────────────────── */}
      <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 truncate max-w-[calc(100%-3rem)]">
            <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
            <span className="truncate">
              {sections.find((s) => s.id === activeSection)?.title ??
                "Contents"}
            </span>
          </div>
          <button
            onClick={() => setMobileNavOpen((v) => !v)}
            className="flex-shrink-0 w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors"
            aria-label="Toggle navigation"
          >
            {mobileNavOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>

        {mobileNavOpen && (
          <nav className="border-t border-gray-100 bg-white max-h-[60vh] overflow-y-auto divide-y divide-gray-50">
            {sections.map((s) => {
              const Icon = s.icon;
              const isActive = activeSection === s.id;
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setMobileNavOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-emerald-50 text-emerald-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 ${
                      isActive ? "text-emerald-600" : "text-gray-400"
                    }`}
                  />
                  <span className="flex-1">{s.title}</span>
                  {isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  )}
                </a>
              );
            })}
          </nav>
        )}
      </div>

      {/* ── BODY ───────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-20">
          {/* ── SIDEBAR (desktop only) ────────────────────────── */}
          <aside className="hidden lg:block w-[220px] xl:w-[250px] flex-shrink-0">
            <div className="sticky top-28">
              <div className="mb-6 pb-5 border-b border-gray-100">
                <img src="/logo.png" alt="NoteOCR" className="h-7 w-auto" />
              </div>

              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2 px-2">
                Contents
              </p>

              <nav className="space-y-0.5">
                {sections.map((s) => {
                  const Icon = s.icon;
                  const isActive = activeSection === s.id;
                  return (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium transition-all group ${
                        isActive
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-100/80"
                          : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      <Icon
                        className={`w-3.5 h-3.5 flex-shrink-0 ${
                          isActive
                            ? "text-emerald-600"
                            : "text-gray-400 group-hover:text-gray-500"
                        }`}
                      />
                      <span className="leading-snug truncate">{s.title}</span>
                      {isActive && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                      )}
                    </a>
                  );
                })}
              </nav>

              <div className="mt-8 rounded-xl bg-gray-950 border border-gray-800 p-4">
                <p className="text-xs font-semibold text-white mb-1">
                  Privacy questions?
                </p>
                <p className="text-[11px] text-gray-500 mb-3 leading-relaxed">
                  Contact our privacy team directly.
                </p>
                <a
                  href="mailto:support@noteocr.com"
                  className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <Mail className="w-3 h-3" />
                  support@noteocr.com
                </a>
              </div>
            </div>
          </aside>

          {/* ── MAIN CONTENT ─────────────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {/* Welcome banner */}
            <div className="mb-10 sm:mb-16 rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-7 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-emerald-400/5 rounded-full blur-2xl" />
              <div className="relative flex gap-3 sm:gap-4">
                <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 mb-1.5">
                    Your data, your control
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {t("welcome_text")}
                  </p>
                </div>
              </div>
            </div>

            {/* Sections */}
            <div className="space-y-12 sm:space-y-16">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <section
                    key={section.id}
                    id={section.id}
                    className="scroll-mt-28 group"
                  >
                    {/* Section header */}
                    <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-5">
                      <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white shadow-sm border border-gray-200 flex items-center justify-center text-emerald-600 group-hover:border-emerald-200 transition-all">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <div className="pt-0.5 min-w-0">
                        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-600 mb-1">
                          §{String(index + 1).padStart(2, "0")}
                        </p>
                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                          {section.title}
                        </h2>
                      </div>
                    </div>

                    <div className="h-px bg-gray-100 mb-5 ml-[52px] sm:ml-[60px]" />

                    <div className="ml-0 sm:ml-[60px]">
                      {/* Plain text */}
                      {section.type === "text" && (
                        <p className="text-gray-600 leading-[1.85] text-[15px]">
                          {section.content}
                        </p>
                      )}

                      {/* Data collection — text + table */}
                      {section.type === "collection" && (
                        <div className="space-y-6">
                          <p className="text-gray-600 leading-[1.85] text-[15px]">
                            {section.content}
                          </p>

                          {/* Mobile: card stack */}
                          <div className="sm:hidden space-y-3">
                            {dataRows.map((row, i) => (
                              <div
                                key={i}
                                className="rounded-xl border border-gray-200 bg-gray-50 p-4 space-y-2"
                              >
                                <p className="text-xs font-bold text-gray-900">
                                  {row.type}
                                </p>
                                <p className="text-[12px] text-gray-600">
                                  {row.purpose}
                                </p>
                                <div className="flex flex-wrap gap-2 pt-1">
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-50 border border-blue-100 text-[11px] font-semibold text-blue-700">
                                    {row.basis}
                                  </span>
                                  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-gray-100 border border-gray-200 text-[11px] font-medium text-gray-600">
                                    {row.retention}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Desktop: table */}
                          <div className="hidden sm:block overflow-x-auto rounded-xl border border-gray-200">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                  {[
                                    t("data_col_type"),
                                    t("data_col_purpose"),
                                    t("data_col_basis"),
                                    t("data_col_retention"),
                                  ].map((col) => (
                                    <th
                                      key={col}
                                      className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-gray-400"
                                    >
                                      {col}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-100">
                                {dataRows.map((row, i) => (
                                  <tr
                                    key={i}
                                    className="hover:bg-gray-50/60 transition-colors"
                                  >
                                    <td className="px-4 py-3.5 font-semibold text-gray-800 text-[13px]">
                                      {row.type}
                                    </td>
                                    <td className="px-4 py-3.5 text-gray-600 text-[13px]">
                                      {row.purpose}
                                    </td>
                                    <td className="px-4 py-3.5">
                                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-50 border border-blue-100 text-[11px] font-semibold text-blue-700">
                                        {row.basis}
                                      </span>
                                    </td>
                                    <td className="px-4 py-3.5 text-gray-500 text-[12px]">
                                      {row.retention}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Documents — emerald highlight box */}
                      {section.type === "documents" && (
                        <div className="space-y-4">
                          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-5 sm:p-6">
                            <div className="flex gap-3">
                              <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                              <p className="text-[14px] text-gray-700 leading-[1.85]">
                                {section.content}
                              </p>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {[
                              {
                                icon: Lock,
                                label: "TLS 1.3 + AES-256",
                                sub: "Encrypted end-to-end",
                              },
                              {
                                icon: Shield,
                                label: "Isolated Processing",
                                sub: "No cross-user exposure",
                              },
                              {
                                icon: X,
                                label: "Auto-Deleted After Job",
                                sub: "Source file gone immediately",
                              },
                            ].map(({ icon: Ic, label, sub }) => (
                              <div
                                key={label}
                                className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-200"
                              >
                                <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-emerald-100 border border-emerald-200 flex items-center justify-center">
                                  <Ic className="w-3.5 h-3.5 text-emerald-700" />
                                </div>
                                <div>
                                  <p className="text-[13px] font-semibold text-gray-800">
                                    {label}
                                  </p>
                                  <p className="text-[11px] text-gray-500">
                                    {sub}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Rights — grid of right badges + explanatory text */}
                      {section.type === "rights" && (
                        <div className="space-y-5">
                          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                            {rights.map(({ key, icon: Ic }) => (
                              <div
                                key={key}
                                className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 border border-gray-200 hover:border-emerald-200 hover:bg-emerald-50/40 transition-all group"
                              >
                                <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-white border border-gray-200 group-hover:border-emerald-200 flex items-center justify-center">
                                  <Ic className="w-3.5 h-3.5 text-emerald-600" />
                                </div>
                                <p className="text-[12px] font-semibold text-gray-700 leading-tight">
                                  {t(key)}
                                </p>
                              </div>
                            ))}
                          </div>
                          <p className="text-gray-600 leading-[1.85] text-[15px]">
                            {section.content}
                          </p>
                        </div>
                      )}

                      {/* Security — badges + text */}
                      {section.type === "security" && (
                        <div className="space-y-5">
                          <p className="text-gray-600 leading-[1.85] text-[15px]">
                            {section.content}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {SECURITY_BADGES_KEYS.map((key) => (
                              <span
                                key={key}
                                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-xs font-semibold text-emerald-700"
                              >
                                <Lock className="w-3 h-3" />
                                {t(key)}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </section>
                );
              })}
            </div>

            {/* ── CONTACT CARD ───────────────────────────────────── */}
            <section className="mt-14 sm:mt-20 relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gray-950">
              <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{ backgroundImage: NOISE_SVG, backgroundSize: "128px" }}
              />
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/6 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

              <div className="relative z-10 p-6 sm:p-10 md:p-14">
                <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
                  <div className="max-w-md">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-4 sm:mb-5">
                      <Shield className="w-3 h-3" />
                      <span>Privacy Support</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3 leading-tight">
                      {t("contact_t")}
                    </h2>
                    <p className="text-gray-400 leading-relaxed text-sm">
                      {t("contact_d")}
                    </p>
                  </div>

                  <div className="flex-shrink-0 space-y-3 w-full md:w-auto">
                    <a
                      href="mailto:support@noteocr.com"
                      className="flex items-center gap-3 sm:gap-4 bg-white/[0.05] hover:bg-white/[0.09] border border-white/10 hover:border-emerald-500/30 px-4 sm:px-6 py-3.5 sm:py-4 rounded-xl transition-all group"
                    >
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600 mb-0.5">
                          {t("contact_email_label")}
                        </p>
                        <p className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors truncate">
                          support@noteocr.com
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-emerald-400 ml-auto flex-shrink-0 transition-colors" />
                    </a>

                    <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{t("contact_response")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <p className="mt-8 sm:mt-10 text-center text-[11px] text-gray-400 font-medium uppercase tracking-widest">
              © {new Date().getFullYear()} NoteOCR Inc. · All Rights Reserved ·
              Governed by Swiss Law & GDPR
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to top */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 z-50 w-10 h-10 rounded-full bg-gray-900 border border-gray-700 shadow-xl flex items-center justify-center text-white hover:bg-emerald-600 hover:border-emerald-500 transition-all"
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
