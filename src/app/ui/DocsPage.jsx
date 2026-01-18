"use client";

import React, { useState, useEffect } from "react";
import {
  Book,
  ChevronRight,
  Zap,
  Layout,
  Code,
  Server,
  CreditCard,
  Mail,
  FileText,
  Table as TableIcon,
  Users,
  AlertCircle,
  ChevronDown,
  Terminal,
  Shield,
  Globe,
  Activity,
  Scale,
  BookOpen,
} from "lucide-react";
import ConversionDemo from "./ConversionDemo";
import { useTranslations } from "next-intl";

export default function DocsPage() {
  const t = useTranslations("DocsPage");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]");
      let current = "overview";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 150) {
          current = section.getAttribute("id");
        }
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "overview", label: t("sidebar.nav.overview"), icon: Book },
    {
      id: "getting-started",
      label: t("sidebar.nav.getting_started"),
      icon: Zap,
    },
    { id: "converter", label: t("sidebar.nav.converter"), icon: Layout },
    { id: "templates", label: t("sidebar.nav.templates"), icon: Layout },
    { id: "integrations", label: t("sidebar.nav.integrations"), icon: Code },
    { id: "enterprise", label: t("sidebar.nav.enterprise"), icon: Server },
    { id: "billing", label: t("sidebar.nav.billing"), icon: CreditCard },
    { id: "contact", label: t("sidebar.nav.support"), icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#1b9e99]/20 mt-16">
      <div className="max-w-[1600px] mx-auto flex items-start">
        {/* Sidebar Navigation */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-72 bg-slate-50/80 backdrop-blur-xl border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-[100vh] lg:sticky lg:top-0 overflow-y-auto ${
            isMobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
          }`}
        >
          <div className="p-6">
            <nav className="space-y-0.5">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`group flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeSection === item.id
                      ? "bg-white text-[#00415a] shadow-sm ring-1 ring-slate-200"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <item.icon
                    className={`w-4 h-4 ${
                      activeSection === item.id
                        ? "text-[#1b9e99]"
                        : "text-slate-400 group-hover:text-slate-600"
                    }`}
                  />
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-8 pt-8 border-t border-slate-200">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">
                {t("sidebar.external_links")}
              </div>
              <a
                href="#"
                className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-[#1b9e99] transition-colors"
              >
                {t("sidebar.api_reference")}{" "}
                <ChevronRight className="w-3 h-3 ml-auto opacity-50" />
              </a>
              <a
                href="#"
                className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-[#1b9e99] transition-colors"
              >
                {t("sidebar.system_status")}
                <span className="ml-auto flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </a>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 py-12 px-6 sm:px-12 lg:px-16 lg:py-16 ">
          <div className="max-w-4xl mx-auto space-y-20">
            {/* Header */}
            <header className="space-y-6 border-b border-slate-100">
              <div className="flex items-center gap-2 text-sm text-[#1b9e99] font-medium mb-4">
                <span>{t("header.breadcrumb")}</span>
                <ChevronRight className="w-4 h-4 text-slate-300" />
                <span>{t("header.category")}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                {t("header.title")}
              </h1>
              <p className="text-sm md:text-xl text-slate-500 leading-relaxed max-w-3xl">
                {t("header.subtitle")}
              </p>
              <div className="flex gap-4 pt-2">
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors">
                  {t("header.cta")} <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </header>

            {/* OVERVIEW */}
            <section id="overview" className="scroll-mt-20 space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">
                {t("overview.title")}
              </h2>
              <p className="text-sm md:text-xl text-slate-500 leading-relaxed max-w-3xl">
                {t("overview.description")}
              </p>

              <div className="grid sm:grid-cols-3 gap-6 my-8">
                {[
                  {
                    title: t("overview.cards.ocr.title"),
                    desc: t("overview.cards.ocr.desc"),
                    icon: Zap,
                  },
                  {
                    title: t("overview.cards.tables.title"),
                    desc: t("overview.cards.tables.desc"),
                    icon: TableIcon,
                  },
                  {
                    title: t("overview.cards.teams.title"),
                    desc: t("overview.cards.teams.desc"),
                    icon: Users,
                  },
                ].map((card, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-lg hover:shadow-slate-100/50 hover:border-[#1b9e99]/30 transition-all duration-300 cursor-default"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center mb-4 text-[#1b9e99] shadow-sm">
                      <card.icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">
                      {card.title}
                    </h3>
                    <p className="text-sm text-slate-500">{card.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* GETTING STARTED */}
            <section id="getting-started" className="scroll-mt-32 space-y-8">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                {t("getting_started.title")}
              </h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-none w-8 h-8 rounded-full bg-[#e6f9f8] text-[#1b9e99] flex items-center justify-center font-bold text-sm ring-4 ring-white">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-2">
                      {t("getting_started.step1_title")}
                    </h3>
                    <p className="text-sm md:text-xl text-slate-500 leading-relaxed max-w-3xl">
                      Sign up at{" "}
                      <span className="text-[#1b9e99]">noteocr.com</span>. If
                      you are joining an organization, use your invite link.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-none w-8 h-8 rounded-full bg-[#e6f9f8] text-[#1b9e99] flex items-center justify-center font-bold text-sm ring-4 ring-white">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-2">
                      {t("getting_started.step2_title")}
                    </h3>
                    <p className="text-sm md:text-xl text-slate-500 leading-relaxed max-w-3xl">
                      {t("getting_started.step2_desc", {
                        button: t("getting_started.step2_button"),
                      })}
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4 mt-7">
                      <div className="border border-slate-200 rounded-lg p-4 bg-white">
                        <div className="flex items-center gap-2 font-semibold text-slate-900 mb-1">
                          <FileText className="w-4 h-4 text-blue-500" />{" "}
                          {t("getting_started.mode_word_title")}
                        </div>
                        <p className="text-xs text-slate-500">
                          {t("getting_started.mode_word_desc")}
                        </p>
                      </div>
                      <div className="border border-slate-200 rounded-lg p-4 bg-white">
                        <div className="flex items-center gap-2 font-semibold text-slate-900 mb-1">
                          <TableIcon className="w-4 h-4 text-green-500" />{" "}
                          {t("getting_started.mode_excel_title")}
                        </div>
                        <p className="text-xs text-slate-500">
                          {t("getting_started.mode_excel_desc")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-none w-8 h-8 rounded-full bg-[#e6f9f8] text-[#1b9e99] flex items-center justify-center font-bold text-sm ring-4 ring-white">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-2">
                      {t("getting_started.step3_title")}
                    </h3>
                    <p className="text-sm md:text-xl text-slate-500 leading-relaxed max-w-3xl">
                      {t("getting_started.step3_desc")}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* CONVERTER */}
            <section id="converter" className="scroll-mt-5 space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">
                {t("converter.title")}
              </h2>
              <p className="text-sm md:text-xl text-slate-500 leading-relaxed max-w-3xl">
                {t("converter.description")}
              </p>
              <ConversionDemo />
              <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-900">
                  <strong>{t("converter.constraint_label")}</strong>{" "}
                  {t("converter.constraint_text")}
                </div>
              </div>
            </section>

            {/* INTEGRATIONS & COMPATIBILITY */}
            <section id="integrations" className="scroll-mt-32 space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">
                {t("integrations.title")}
              </h2>
              <p className="text-sm md:text-xl text-slate-500 leading-relaxed max-w-3xl">
                {t("integrations.description")}
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                {[
                  "Microsoft Word",
                  "Microsoft Excel",
                  "PDF",
                  "Google Docs",
                  "Markdown",
                  "Plain Text",
                ].map((format) => (
                  <span
                    key={format}
                    className="px-3 py-1.5 rounded-full border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:border-[#1b9e99] hover:text-[#1b9e99] transition-colors cursor-default"
                  >
                    {format}
                  </span>
                ))}
              </div>
            </section>

            {/* TEMPLATES */}
            <section id="templates" className="scroll-mt-32 space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">
                {t("templates.title")}
              </h2>
              <p className="text-sm md:text-xl text-slate-500 leading-relaxed max-w-3xl">
                {t("templates.description")}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* 1. Meeting Notes */}
                <div className="group cursor-pointer">
                  <div className="aspect-[3/4] bg-white border border-slate-200 rounded-xl shadow-sm group-hover:shadow-lg group-hover:border-[#1b9e99]/50 transition-all relative overflow-hidden p-3 flex flex-col gap-2">
                    <div className="h-1.5 w-full bg-[#1b9e99] rounded-full opacity-20 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex gap-2 items-center mt-1">
                      <div className="w-6 h-6 rounded-full bg-slate-100"></div>
                      <div className="h-2 w-16 bg-slate-200 rounded"></div>
                    </div>
                    <div className="absolute bottom-3 right-3 p-2 bg-white rounded-full shadow-sm border border-slate-100 text-[#1b9e99]">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="mt-2 text-sm font-medium text-center text-slate-700 group-hover:text-[#1b9e99]">
                    {t("templates.items.meeting")}
                  </p>
                </div>

                {/* 2. Medical Form */}
                <div className="group cursor-pointer">
                  <div className="aspect-[3/4] bg-white border border-slate-200 rounded-xl shadow-sm group-hover:shadow-lg group-hover:border-red-400/50 transition-all relative overflow-hidden p-3 flex flex-col gap-2">
                    <div className="h-1.5 w-full bg-red-400 rounded-full opacity-20 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-3 right-3 p-2 bg-white rounded-full shadow-sm border border-slate-100 text-red-500">
                      <Activity className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="mt-2 text-sm font-medium text-center text-slate-700 group-hover:text-red-500">
                    {t("templates.items.medical")}
                  </p>
                </div>

                {/* 3. Legal Contract */}
                <div className="group cursor-pointer">
                  <div className="aspect-[3/4] bg-white border border-slate-200 rounded-xl shadow-sm group-hover:shadow-lg group-hover:border-slate-400/50 transition-all relative overflow-hidden p-4 flex flex-col gap-1.5">
                    <div className="h-1.5 w-full bg-slate-600 rounded-full opacity-20 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-3 right-3 p-2 bg-white rounded-full shadow-sm border border-slate-100 text-slate-600">
                      <Scale className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="mt-2 text-sm font-medium text-center text-slate-700 group-hover:text-slate-600">
                    {t("templates.items.legal")}
                  </p>
                </div>

                {/* 4. Class Syllabus */}
                <div className="group cursor-pointer">
                  <div className="aspect-[3/4] bg-white border border-slate-200 rounded-xl shadow-sm group-hover:shadow-lg group-hover:border-amber-400/50 transition-all relative overflow-hidden p-3 flex flex-col gap-2">
                    <div className="h-1.5 w-full bg-amber-400 rounded-full opacity-20 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-3 right-3 p-2 bg-white rounded-full shadow-sm border border-slate-100 text-amber-500">
                      <BookOpen className="w-4 h-4" />
                    </div>
                  </div>
                  <p className="mt-2 text-sm font-medium text-center text-slate-700 group-hover:text-amber-500">
                    {t("templates.items.syllabus")}
                  </p>
                </div>
              </div>
            </section>

            {/* INTEGRATIONS ROADMAP & API */}
            <section id="integrations" className="scroll-mt-32 space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">
                {t("integrations.roadmap_title")}
              </h2>
              <p className="text-sm md:text-xl text-slate-500 leading-relaxed max-w-3xl">
                {t("integrations.roadmap_desc")}
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                {[
                  "Google Drive",
                  "Dropbox",
                  "OneDrive",
                  "Evernote",
                  "Slack",
                ].map((app) => (
                  <span
                    key={app}
                    className="px-3 py-1.5 rounded-full border border-slate-200 bg-white text-sm font-medium text-slate-500 cursor-not-allowed opacity-75"
                  >
                    {app}{" "}
                    <span className="text-[10px] text-slate-400 ml-1">
                      ({t("integrations.planned")})
                    </span>
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 mt-8 mb-4">
                <h3 className="font-bold text-slate-900">
                  {t("integrations.api_title")}
                </h3>
                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide border border-blue-200">
                  {t("integrations.api_badge")}
                </span>
              </div>

              <p className="text-sm md:text-xl text-slate-500 leading-relaxed max-w-3xl">
                {t("integrations.api_desc").replace(
                  "{link}",
                  <a
                    href="#waitlist"
                    className="text-[#1b9e99] font-medium hover:underline"
                  >
                    {t("integrations.api_link_text")}
                  </a>
                )}
              </p>

              <div className="relative overflow-hidden rounded-xl bg-slate-900 border border-slate-800 p-8 text-center">
                <div className="absolute inset-0 opacity-20 blur-[2px] pointer-events-none select-none p-6 font-mono text-xs text-left text-teal-400">
                  {`import { NoteOCR } from '@noteocr/sdk';\nconst client = new NoteOCR(process.env.API_KEY);`}
                </div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-4">
                  <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
                    <Terminal className="w-6 h-6 text-teal-400" />
                  </div>
                  <h3 className="text-white font-bold text-lg">
                    {t("integrations.api_preview_title")}
                  </h3>
                  <p className="text-slate-400 max-w-sm mx-auto text-sm">
                    {t("integrations.api_preview_desc")}
                  </p>
                  <button className="bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold py-2 px-6 rounded-lg transition-colors text-sm">
                    {t("integrations.api_btn")}
                  </button>
                </div>
              </div>
            </section>

            {/* ENTERPRISE */}
            <section id="enterprise" className="scroll-mt-32 space-y-6">
              <h2 className="text-2xl font-bold text-slate-900">
                {t("enterprise.title")}
              </h2>
              <p className="text-sm md:text-xl text-slate-500 leading-relaxed max-w-3xl">
                {t("enterprise.description")}
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#1b9e99]" />{" "}
                    {t("enterprise.sso_title")}
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">
                    {t("enterprise.sso_desc")}
                  </p>
                  <button className="text-sm text-[#1b9e99] font-medium hover:underline">
                    {t("enterprise.sso_cta")}
                  </button>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#1b9e99]" />{" "}
                    {t("enterprise.data_title")}
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {t("enterprise.data_desc")}
                  </p>
                </div>
              </div>
            </section>

            {/* BILLING */}
            <section id="billing" className="scroll-mt-32 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {t("billing.title")}
                </h2>
                <p className="text-sm md:text-xl text-slate-500 leading-relaxed max-w-3xl">
                  {t("billing.description")}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {/* Starter */}
                <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/50">
                  <div className="font-bold text-slate-900">
                    {t("billing.starter")}
                  </div>
                  <div className="text-2xl font-bold text-slate-900 my-1">
                    {t("billing.free")}
                  </div>
                  <div className="text-xs text-slate-500 mb-3">
                    {t("billing.tier_starter_desc")}
                  </div>
                  <div className="text-xs font-mono bg-white border border-slate-200 p-2 rounded text-slate-600">
                    {t("billing.limit_prefix")} 50 pages/mo
                  </div>
                </div>
                {/* Pro */}
                <div className="p-4 rounded-lg border border-[#1b9e99] bg-[#1b9e99]/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-[#1b9e99] text-white text-[10px] font-bold px-2 py-0.5 rounded-bl">
                    {t("billing.popular")}
                  </div>
                  <div className="font-bold text-[#1b9e99]">
                    {t("billing.pro")}
                  </div>
                  <div className="text-2xl font-bold text-slate-900 my-1">
                    $8
                    <span className="text-sm font-normal text-slate-500">
                      {t("billing.mo")}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mb-3">
                    {t("billing.tier_pro_desc")}
                  </div>
                </div>
                {/* Business */}
                <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/50">
                  <div className="font-bold text-slate-900">
                    {t("billing.business")}
                  </div>
                  <div className="text-2xl font-bold text-slate-900 my-1">
                    $25
                    <span className="text-sm font-normal text-slate-500">
                      {t("billing.mo")}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mb-3">
                    {t("billing.tier_biz_desc")}
                  </div>
                </div>
              </div>

              {/* Comparison Matrix */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900">
                  {t("billing.matrix_title")}
                </h3>
                <div className="overflow-hidden border border-slate-200 rounded-xl shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left border-collapse">
                      <thead className="bg-slate-50 text-slate-900 font-semibold border-b border-slate-200">
                        <tr>
                          <th className="p-4">
                            {t("billing.matrix_head_cat")}
                          </th>
                          <th className="p-4">{t("billing.starter")}</th>
                          <th className="p-4 text-[#1b9e99] bg-[#1b9e99]/5">
                            {t("billing.pro")}
                          </th>
                          <th className="p-4">{t("billing.business")}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        <tr className="bg-slate-50/50">
                          <td className="p-4 font-bold" colSpan={4}>
                            {t("billing.rows.usage")}
                          </td>
                        </tr>
                        <tr>
                          <td className="p-4 font-medium">
                            {t("billing.rows.vol")}
                          </td>
                          <td className="p-4">50</td>
                          <td className="p-4 font-semibold bg-[#1b9e99]/5">
                            200
                          </td>
                          <td className="p-4 font-semibold">1,000</td>
                        </tr>
                        {/* ... repeat for other rows ... */}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-blue-50 text-blue-700 p-4 rounded-lg text-sm border border-blue-100">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <p>
                    <strong>{t("billing.note_title")}</strong>{" "}
                    {t("billing.note_text")}
                  </p>
                </div>
              </div>
            </section>

            {/* CONTACT SUPPORT */}
            <section id="contact" className="scroll-mt-32 space-y-6 ">
              <div className="bg-[#f8fafc] rounded-2xl p-8 border border-slate-200 text-center">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  {t("contact.title")}
                </h2>
                <p className="text-slate-600 mb-8 max-w-lg mx-auto">
                  {t("contact.description")}
                </p>
                <div className="flex justify-center gap-4">
                  <a
                    href="mailto:care.copywrite@gmail.com"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#00415a] text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    <Mail className="w-4 h-4" /> {t("contact.btn")}
                  </a>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
