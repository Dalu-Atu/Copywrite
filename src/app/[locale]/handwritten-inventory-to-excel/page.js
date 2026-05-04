import React from "react";
import ExcelToolInterface from "../../ui/ExcelToolInterface";
import Script from "next/script";
import Link from "next/link";
import {
  Table,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Grid3X3,
  FileSpreadsheet,
  ArrowRight,
  Calculator,
  Package,
  GraduationCap,
  LineChart,
  Sparkles,
  Shield,
  FileText,
  DollarSign,
  Clock,
  Target,
  Notebook,
  Text,
} from "lucide-react";

import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "InventoryToExcel" });
  const localePath = locale === "en" ? "" : `/${locale}`; // 👈 same helper logic

  return {
    title: t("meta_title"),
    description: t("meta_desc"),
    alternates: {
      canonical: `https://noteocr.com${localePath}/handwritten-inventory-to-excel`,
      languages: {
        "x-default": "https://noteocr.com/handwritten-inventory-to-excel",
        en: "https://noteocr.com/handwritten-inventory-to-excel",
        es: "https://noteocr.com/es/handwritten-inventory-to-excel",
        tr: "https://noteocr.com/tr/handwritten-inventory-to-excel",
        zh: "https://noteocr.com/zh/handwritten-inventory-to-excel",
        hi: "https://noteocr.com/hi/handwritten-inventory-to-excel",
        de: "https://noteocr.com/de/handwritten-inventory-to-excel",
        ja: "https://noteocr.com/ja/handwritten-inventory-to-excel",
        fr: "https://noteocr.com/fr/handwritten-inventory-to-excel",
        "pt-br": "https://noteocr.com/pt-br/handwritten-inventory-to-excel",
        da: "https://noteocr.com/da/handwritten-inventory-to-excel",
        fi: "https://noteocr.com/fi/handwritten-inventory-to-excel",
        it: "https://noteocr.com/it/handwritten-inventory-to-excel",
        nl: "https://noteocr.com/nl/handwritten-inventory-to-excel",
        no: "https://noteocr.com/no/handwritten-inventory-to-excel",
        sv: "https://noteocr.com/sv/handwritten-inventory-to-excel",
      },
    },
    openGraph: {
      title: t("meta_title"),
      description: t("meta_desc"),
      images: ["/images/tools/table-to-excel-og.jpg"],
    },
  };
}

export default async function InventoryToExcel({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "InventoryToExcel" });
  const localePath = locale === "en" ? "" : `/${locale}`; // 👈 same helper logic

  const relatedTools = [
    {
      name: t("related_tool_1_name"),
      desc: t("related_tool_1_desc"),
      icon: <FileText className="w-5 h-5" />,
      link: `${localePath}/handwritten-invoice-to-excel`,
    },
    {
      name: t("related_tool_2_name"),
      desc: t("related_tool_2_desc"),
      icon: <Notebook className="w-5 h-5" />,
      link: `${localePath}/handwritten-inventory-to-excel`,
    },
    {
      name: t("related_tool_3_name"),
      desc: t("related_tool_3_desc"),
      icon: <FileSpreadsheet className="w-5 h-5" />,
      link: `${localePath}/scan-to-word`,
    },
    {
      name: t("related_tool_4_name"),
      desc: t("related_tool_4_desc"),
      icon: <Text className="w-5 h-5" />,
      link: `${localePath}/handwritten-invoice-to-excel`,
    },
  ];

  const faqItems = [
    "how_to_convert_inventory",
    "messy_warehouse_writing",
    "sku_recognition",
    "pos_integration",
    "blank_paper_lists",
    "tallies_and_tick_marks",
    "multiple_clipboard_pages",
    "is_inventory_tool_free",
    "data_security_inventory",
    "crossouts_corrections",
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: t("meta_title"),
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        featureList:
          "Handwriting OCR, Table Structure Detection, Excel Export, Grid Recognition, Multi-Column Processing",
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((key) => ({
          "@type": "Question",
          name: t(`FAQ.items.${key}.q`),
          acceptedAnswer: {
            "@type": "Answer",
            text: t(`FAQ.items.${key}.a`),
          },
        })),
      },
      {
        "@type": "HowTo",
        name: "How to Convert Handwritten Tables to Excel",
        step: [
          {
            "@type": "HowToStep",
            name: "Upload handwritten table image",
            text: "Photograph or scan your handwritten table and upload the image file",
          },
          {
            "@type": "HowToStep",
            name: "AI processes table structure",
            text: "Our OCR engine detects rows, columns, and cell boundaries automatically",
          },
          {
            "@type": "HowToStep",
            name: "Download Excel file",
            text: "Get your formatted .xlsx spreadsheet ready for editing",
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#000] text-white selection:bg-emerald-500/30">
      <Script
        id="ld-json"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO SECTION - THE TOOL */}
      <section className="relative pt-32 pb-32 flex flex-col items-center justify-center px-5 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none [background-image:linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] [background-size:40px_40px]" />

        <div className="relative z-10 text-center max-w-5xl px-2">
          <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 border border-emerald-500/20 rounded-full bg-emerald-500/5 font-mono text-[10px] text-emerald-500 uppercase tracking-widest">
            <Grid3X3 className="w-3 h-3 animate-pulse" /> {t("hero_pill")}
          </div>

          <h1 className="text-2xl md:text-5xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            {t("hero_title")}
          </h1>

          <p className="text-gray-400 md:text-xl max-w-3xl mx-auto mb-12 ">
            {t("hero_subtitle")}
          </p>

          {/* THE TOOL */}
          <ExcelToolInterface
            locale={locale}
            translation={"InventoryToExcel"}
          />

          <div className="mt-20 flex flex-wrap justify-center gap-x-12 gap-y-6 opacity-30 grayscale pointer-events-none">
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-tighter">
              <Shield className="w-4 h-4" /> {t("trust_ssl")}
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-tighter">
              <Zap className="w-4 h-4 text-emerald-500" />{" "}
              {t("trust_processing")}
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono tracking-tighter">
              <Target className="w-4 h-4" /> {t("trust_accuracy")}
            </div>
          </div>
        </div>
      </section>

      {/* BEFORE/AFTER EXAMPLE */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-b border-white/5">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t("before_after_title")}</h2>
          <p className="text-gray-400">{t("before_after_desc")}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Before Section */}
          <div className="border border-white/10 bg-white/[0.02] p-6 rounded-xl">
            <div className="text-xs text-emerald-500 font-mono mb-3 uppercase tracking-wider">
              {t("before_label")}
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded border border-white/5">
              <img
                src="/images/before-excel.jpg"
                alt={t("before_label")}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* After Section */}
          <div className="border border-emerald-500/20 bg-emerald-500/[0.02] p-6 rounded-xl">
            <div className="text-xs text-emerald-400 font-mono mb-3 uppercase tracking-wider">
              {t("after_label")}
            </div>
            <div className="aspect-[4/3] overflow-hidden rounded border border-emerald-500/10">
              <img
                src="/images/after-excel.png"
                alt={t("after_label")}
                className="w-full h-full object-cover"
              />
            </div>
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
          <div className="p-8 border border-white/10 bg-white/[0.01] rounded-xl group hover:border-emerald-500/30 transition-all">
            <Calculator className="w-10 h-10 text-emerald-500 mb-6" />
            <h3 className="text-lg font-bold mb-3">{t("use_case_1_title")}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              {t("use_case_1_desc")}
            </p>
          </div>

          <div className="p-8 border border-white/10 bg-white/[0.01] rounded-xl group hover:border-emerald-500/30 transition-all">
            <Package className="w-10 h-10 text-emerald-500 mb-6" />
            <h3 className="text-lg font-bold mb-3">{t("use_case_2_title")}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              {t("use_case_2_desc")}
            </p>
          </div>

          <div className="p-8 border border-white/10 bg-white/[0.01] rounded-xl group hover:border-emerald-500/30 transition-all">
            <GraduationCap className="w-10 h-10 text-emerald-500 mb-6" />
            <h3 className="text-lg font-bold mb-3">{t("use_case_3_title")}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              {t("use_case_3_desc")}
            </p>
          </div>

          <div className="p-8 border border-white/10 bg-white/[0.01] rounded-xl group hover:border-emerald-500/30 transition-all">
            <LineChart className="w-10 h-10 text-emerald-500 mb-6" />
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
          <h2 className="text-2xl font-bold mb-4">{t("comparison_title")}</h2>
          <p className="text-gray-400">{t("comparison_subtitle")}</p>
        </div>

        <div className="max-w-4xl mx-auto overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 px-6 text-sm font-mono uppercase text-gray-500">
                  {t("comparison_col_method")}
                </th>
                <th className="text-left py-4 px-6 text-sm font-mono uppercase text-gray-500">
                  {t("comparison_col_time")}
                </th>
                <th className="text-left py-4 px-6 text-sm font-mono uppercase text-gray-500">
                  {t("comparison_col_accuracy")}
                </th>
                <th className="text-left py-4 px-6 text-sm font-mono uppercase text-gray-500">
                  {t("comparison_col_cost")}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-white/5">
                <td className="py-4 px-6">{t("comparison_row1_method")}</td>
                <td className="py-4 px-6 text-gray-400">
                  {t("comparison_row1_time")}
                </td>
                <td className="py-4 px-6 text-gray-400">
                  {t("comparison_row1_accuracy")}
                </td>
                <td className="py-4 px-6 text-gray-400">
                  {t("comparison_row1_cost")}
                </td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-4 px-6">{t("comparison_row2_method")}</td>
                <td className="py-4 px-6 text-gray-400">
                  {t("comparison_row2_time")}
                </td>
                <td className="py-4 px-6 text-gray-400">
                  {t("comparison_row2_accuracy")}
                </td>
                <td className="py-4 px-6 text-gray-400">
                  {t("comparison_row2_cost")}
                </td>
              </tr>
              <tr className="border-b border-emerald-500/20 bg-emerald-500/5">
                <td className="py-4 px-6 font-bold text-emerald-400">
                  {t("comparison_row3_method")}
                </td>
                <td className="py-4 px-6 text-emerald-400 font-bold">
                  {t("comparison_row3_time")}
                </td>
                <td className="py-4 px-6 text-emerald-400 font-bold">
                  {t("comparison_row3_accuracy")}
                </td>
                <td className="py-4 px-6 text-emerald-400 font-bold">
                  {t("comparison_row3_cost")}
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
            <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
              <Grid3X3 className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t("feature_1_title")}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t("feature_1_desc")}
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
              <Calculator className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t("feature_2_title")}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t("feature_2_desc")}
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
              <FileSpreadsheet className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="text-xl font-bold mb-3">{t("feature_3_title")}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {t("feature_3_desc")}
            </p>
          </div>
        </div>
      </section>

      {/* TECHNICAL EXPLANATION */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-b border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">{t("tech_title")}</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-400 md:text-lg mb-6">{t("tech_intro")}</p>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="p-6 border border-white/10 bg-white/[0.02] rounded-xl">
                <h4 className="text-lg font-bold mb-3 text-emerald-400">
                  {t("tech_detect_title")}
                </h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                    <span>{t("tech_detect_1")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                    <span>{t("tech_detect_2")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                    <span>{t("tech_detect_3")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                    <span>{t("tech_detect_4")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                    <span>{t("tech_detect_5")}</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 border border-white/10 bg-white/[0.02] rounded-xl">
                <h4 className="text-lg font-bold mb-3 text-emerald-400">
                  {t("tech_tips_title")}
                </h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                    <span>{t("tech_tips_1")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                    <span>{t("tech_tips_2")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                    <span>{t("tech_tips_3")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                    <span>{t("tech_tips_4")}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                    <span>{t("tech_tips_5")}</span>
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
              className="group p-6 bg-white/[0.02] border border-white/5 rounded cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:border-emerald-500/40 hover:bg-white/[0.04]"
            >
              <div className="text-gray-500 mb-3 transition-colors group-hover:text-emerald-400">
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
                <h3 className="text-lg font-bold text-emerald-400 mb-3">
                  {idx + 1}. {t(`FAQ.items.${key}.q`)}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {t(`FAQ.items.${key}.a`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="max-w-7xl mx-auto px-6 py-20 text-center"
        id="cta-section"
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">{t("cta_title")}</h2>
          <p className="text-gray-400 mb-8">{t("cta_subtitle")}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-10 rounded-sm shadow-lg shadow-emerald-600/20 transition-all hover:-translate-y-1"
          >
            {t("cta_button")} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
