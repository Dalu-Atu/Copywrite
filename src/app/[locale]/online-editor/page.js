import React from "react";
import EditorClientContent from "../../ui/EditorClient";
import Script from "next/script";
import Link from "next/link";
import {
  FileText,
  CheckCircle2,
  Zap,
  ShieldCheck,
  ArrowRight,
  Users,
  Briefcase,
  GraduationCap,
  Plane,
  Sparkles,
  Shield,
  Target,
  Globe,
  FileSpreadsheet,
  Presentation,
  Cloud,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "EditorPage" });

  return {
    title: t("meta_title"),
    description: t("meta_desc"),
    alternates: {
      canonical: `https://noteocr.com/${locale}/online-editor`,
      languages: {
        en: "https://noteocr.com/en/online-editor",
        es: "https://noteocr.com/es/online-editor",
        tr: "https://noteocr.com/tr/online-editor",
        zh: "https://noteocr.com/zh/online-editor",
        hi: "https://noteocr.com/hi/online-editor",
        de: "https://noteocr.com/de/online-editor",
        ja: "https://noteocr.com/ja/online-editor",
        "pt-br": "https://noteocr.com/pt-br/online-editor",
      },
    },
    openGraph: {
      title: t("meta_title"),
      description: t("meta_desc"),
      images: ["/images/online-editor-og.jpg"],
    },
  };
}

export default async function OnlineEditorPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "EditorPage" });

  const relatedTools = [
    {
      name: t("related_tool_1_name"),
      desc: t("related_tool_1_desc"),
      icon: <FileText className="w-5 h-5" />,
      link: `/${locale}/handwriting-to-docx`,
    },
    {
      name: t("related_tool_2_name"),
      desc: t("related_tool_2_desc"),
      icon: <FileSpreadsheet className="w-5 h-5" />,
      link: `/${locale}/handwriting-to-excel`,
    },
    {
      name: t("related_tool_3_name"),
      desc: t("related_tool_3_desc"),
      icon: <Sparkles className="w-5 h-5" />,
      link: `/${locale}/edit-pdf`,
    },
    {
      name: t("related_tool_4_name"),
      desc: t("related_tool_4_desc"),
      icon: <Target className="w-5 h-5" />,
      link: `/${locale}/image-to-text`,
    },
  ];

  const faqItems = [
    "edit_office_online",
    "browser_compatibility",
    "word_online_free",
    "excel_formulas",
    "powerpoint_presentations",
    "file_storage",
    "offline_editing",
    "collaboration",
    "microsoft_account",
    "export_formats",
    "templates",
    "mobile_editing",
    "compatibility_issues",
    "file_size_limit",
    "security_privacy",
    "desktop_vs_online",
    "libreoffice_compatibility",
    "macro_support",
    "chromebook_editing",
    "version_history",
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "NoteOCR Online Document Editor",
        applicationCategory: "ProductivityApplication",
        operatingSystem: "Web Browser",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList:
          "Online document editor, PDF editing, Handwriting OCR, Browser-based workspace, Cloud processing",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.6",
          ratingCount: "5892",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: t(`FAQ.${item}.q`),
          acceptedAnswer: {
            "@type": "Answer",
            text: t(`FAQ.${item}.a`),
          },
        })),
      },
      {
        "@type": "HowTo",
        name: "How to Edit Documents Online with NoteOCR",
        step: [
          {
            "@type": "HowToStep",
            name: "Upload your document",
            text: "Upload a PDF or scanned document directly from your device.",
          },
          {
            "@type": "HowToStep",
            name: "Edit in browser",
            text: "Use NoteOCR's web-based editor to modify text, handwriting, and layout.",
          },
          {
            "@type": "HowToStep",
            name: "Export your file",
            text: "Download your document as PDF or Word after editing.",
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#000] text-white selection:bg-purple-500/30">
      <Script
        id="ld-json"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO SECTION - THE TOOL */}
      <section className="relative pt-28 pb-32 flex flex-col items-center justify-center px-5 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none [background-image:linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] [background-size:40px_40px]" />

        <div className="relative z-10 text-center max-w-5xl px-2">
          <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 border border-purple-500/20 rounded-full bg-purple-500/5 font-mono text-[10px] text-purple-500 uppercase tracking-widest">
            <Cloud className="w-3 h-3 animate-pulse" /> {t("hero_pill")}
          </div>

          <h1 className="text-2xl md:text-5xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            {t("hero_title")} <br />
            {t("hero_highlight")}
          </h1>

          <p className="text-gray-400 md:text-xl max-w-3xl mx-auto mb-12">
            {t("hero_subtitle")}
          </p>

          {/* THE TOOL */}
          <EditorClientContent locale={locale} />

          <div className="mt-20 flex flex-wrap justify-center gap-x-12 gap-y-6 opacity-30 grayscale pointer-events-none">
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-tighter">
              <Shield className="w-4 h-4" /> {t("trust_security")}
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-tighter">
              <Zap className="w-4 h-4 text-purple-500" /> {t("trust_sync")}
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-tighter">
              <Target className="w-4 h-4" /> {t("trust_compatibility")}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE SHOWCASE: INTELLIGENT EDITING */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-b border-white/5">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">
            Intelligent Document Processing
          </h2>
          <p className="text-gray-400">
            Go beyond simple typing with tools designed for modern workflows.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Feature 1: AI OCR Integration */}
          <div className="border border-white/10 bg-white/[0.02] p-8 rounded-xl hover:border-purple-500/30 transition-colors">
            <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center mb-6">
              <svg
                className="w-6 h-6 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-3">{t("feat_1_title")}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              {t("feat_1_desc")}
            </p>
          </div>

          {/* Feature 2: Cloud Collaboration */}
          <div className="border border-white/10 bg-white/[0.02] p-8 rounded-xl hover:border-purple-500/30 transition-colors">
            <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center mb-6">
              <svg
                className="w-6 h-6 text-purple-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-3">{t("feat_2_title")}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              {t("feat_2_desc")}
            </p>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-b border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold mb-4">{t("use_cases_title")}</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t("use_cases_subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-8 border border-white/10 bg-white/[0.01] rounded-xl group hover:border-purple-500/30 transition-all">
            <Users className="w-10 h-10 text-purple-500 mb-6" />
            <h3 className="text-lg font-bold mb-3">{t("use_case_1_title")}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              {t("use_case_1_desc")}
            </p>
          </div>

          <div className="p-8 border border-white/10 bg-white/[0.01] rounded-xl group hover:border-purple-500/30 transition-all">
            <GraduationCap className="w-10 h-10 text-purple-500 mb-6" />
            <h3 className="text-lg font-bold mb-3">{t("use_case_2_title")}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              {t("use_case_2_desc")}
            </p>
          </div>

          <div className="p-8 border border-white/10 bg-white/[0.01] rounded-xl group hover:border-purple-500/30 transition-all">
            <Briefcase className="w-10 h-10 text-purple-500 mb-6" />
            <h3 className="text-lg font-bold mb-3">{t("use_case_3_title")}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              {t("use_case_3_desc")}
            </p>
          </div>

          <div className="p-8 border border-white/10 bg-white/[0.01] rounded-xl group hover:border-purple-500/30 transition-all">
            <Plane className="w-10 h-10 text-purple-500 mb-6" />
            <h3 className="text-lg font-bold mb-3">{t("use_case_4_title")}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              {t("use_case_4_desc")}
            </p>
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-b border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">{t("comparison_title")}</h2>
          <p className="text-gray-400">{t("comparison_subtitle")}</p>
        </div>

        <div className="max-w-4xl mx-auto overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-6 text-sm font-mono uppercase text-gray-500">
                  {t("comparison_solution")}
                </th>
                <th className="text-left py-4 px-6 text-sm font-mono uppercase text-gray-500">
                  {t("comparison_access")}
                </th>
                <th className="text-left py-4 px-6 text-sm font-mono uppercase text-gray-500">
                  {t("comparison_features")}
                </th>
                <th className="text-left py-4 px-6 text-sm font-mono uppercase text-gray-500">
                  {t("comparison_cost")}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/5">
                <td className="py-4 px-6">{t("comparison_ms_office")}</td>
                <td className="py-4 px-6 text-gray-400">
                  {t("comparison_ms_access")}
                </td>
                <td className="py-4 px-6 text-gray-400">
                  {t("comparison_ms_features")}
                </td>
                <td className="py-4 px-6 text-gray-400">
                  {t("comparison_ms_cost")}
                </td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-4 px-6">{t("comparison_google")}</td>
                <td className="py-4 px-6 text-gray-400">
                  {t("comparison_google_access")}
                </td>
                <td className="py-4 px-6 text-gray-400">
                  {t("comparison_google_features")}
                </td>
                <td className="py-4 px-6 text-gray-400">
                  {t("comparison_google_cost")}
                </td>
              </tr>
              <tr className="border-b border-purple-500/20 bg-purple-500/5">
                <td className="py-4 px-6 font-bold text-purple-400">
                  {t("comparison_noteocr")}
                </td>
                <td className="py-4 px-6 text-purple-400 font-bold">
                  {t("comparison_noteocr_access")}
                </td>
                <td className="py-4 px-6 text-purple-400 font-bold">
                  {t("comparison_noteocr_features")}
                </td>
                <td className="py-4 px-6 text-purple-400 font-bold">
                  {t("comparison_noteocr_cost")}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-b border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold mb-4">{t("features_title")}</h2>
          <p className="text-gray-400">{t("features_subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-purple-500/20">
              <Globe className="w-8 h-8 text-purple-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">
              {t("feature_main_1_title")}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t("feature_main_1_desc")}
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-purple-500/20">
              <Zap className="w-8 h-8 text-purple-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">
              {t("feature_main_2_title")}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t("feature_main_2_desc")}
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-purple-500/20">
              <Cloud className="w-8 h-8 text-purple-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">
              {t("feature_main_3_title")}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t("feature_main_3_desc")}
            </p>
          </div>
        </div>
      </section>

      {/* TECHNICAL EXPLANATION */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-b border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">{t("technical_title")}</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              {t("technical_desc")}
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="p-6 border border-white/10 bg-white/[0.02] rounded-xl">
                <h4 className="text-lg font-bold mb-3 text-purple-400">
                  {t("technical_formats_title")}
                </h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-500 mt-1 shrink-0" />
                    <span>{t("technical_format_1")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-500 mt-1 shrink-0" />
                    <span>{t("technical_format_2")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-500 mt-1 shrink-0" />
                    <span>{t("technical_format_3")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-500 mt-1 shrink-0" />
                    <span>{t("technical_format_4")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-500 mt-1 shrink-0" />
                    <span>{t("technical_format_5")}</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 border border-white/10 bg-white/[0.02] rounded-xl">
                <h4 className="text-lg font-bold mb-3 text-purple-400">
                  {t("technical_features_title")}
                </h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-purple-500 mt-1 shrink-0" />
                    <span>{t("technical_feature_1")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-purple-500 mt-1 shrink-0" />
                    <span>{t("technical_feature_2")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-purple-500 mt-1 shrink-0" />
                    <span>{t("technical_feature_3")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-purple-500 mt-1 shrink-0" />
                    <span>{t("technical_feature_4")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-purple-500 mt-1 shrink-0" />
                    <span>{t("technical_feature_5")}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED TOOLS */}
      <section className="max-w-7xl mx-auto px-6 py-12 border-b border-white/5">
        <h3 className="text-xl font-bold mb-8 text-center">
          {t("related_tools_title")}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {relatedTools.map((tool) => (
            <Link
              key={tool.name}
              href={tool.link}
              className="group p-6 bg-white/[0.02] border border-white/5 rounded cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-purple-500/40 hover:bg-white/[0.04]"
            >
              <div className="text-gray-500 mb-3 transition-colors group-hover:text-purple-400">
                {tool.icon}
              </div>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold mb-1">{tool.name}</h3>
                  <p className="text-[11px] text-gray-500">{tool.desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-600 opacity-0 translate-x-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* EXTENSIVE FAQ */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-b border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-12 text-center">
            {t("faq_title")}
          </h2>
          <div className="space-y-10">
            {faqItems.map((key, idx) => (
              <div
                key={key}
                className="border-b border-white/5 pb-8 last:border-0"
              >
                <h3 className="text-lg font-bold text-purple-400 mb-3">
                  {idx + 1}. {t(`FAQ.${key}.q`)}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {t(`FAQ.${key}.a`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">{t("cta_title")}</h2>
          <p className="text-gray-400 mb-8">{t("cta_subtitle")}</p>
          <Link
            href="#"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 px-10 rounded-sm shadow-lg shadow-purple-600/20 transition-all hover:-translate-y-1"
          >
            {t("cta_btn")} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
