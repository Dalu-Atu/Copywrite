import React from "react";
import ExcelToolInterface from "../../ui/ExcelToolInterface";
import {
  Table,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Grid3X3,
  FileSpreadsheet,
  ArrowRight,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

// 1. DYNAMIC METADATA (SEO BEST PRACTICE)
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ExcelPage" });

  return {
    title: t("meta_title"),
    description: t("meta_desc"),
    alternates: {
      canonical: `https://copywritee.com/${locale}/handwriting-to-excel`,
      languages: {
        en: "https://copywritee.com/en/handwriting-to-excel",
        es: "https://copywritee.com/es/handwriting-to-excel",
        tr: "https://copywritee.com/tr/handwriting-to-excel",
        zh: "https://copywritee.com/zh/handwriting-to-excel",
        hi: "https://copywritee.com/hi/handwriting-to-excel",
        de: "https://copywritee.com/de/handwriting-to-excel",
        ja: "https://copywritee.com/ja/handwriting-to-excel",
        "pt-br": "https://copywritee.com/pt-br/handwriting-to-excel",
      },
    },
    openGraph: {
      title: t("meta_title"),
      description: t("meta_desc"),
      images: ["/images/tools/table-to-excel-og.jpg"],
    },
  };
}

export default function HandwritingToExcelPage() {
  const t = useTranslations("ExcelPage");
  const tf = useTranslations("FAQ");

  // Relevant FAQs for the Excel conversion
  const faqItems = ["table_to_excel", "cursive", "math", "is_free"];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((key) => ({
      "@type": "Question",
      name: tf(`items.${key}.q`),
      acceptedAnswer: {
        "@type": "Answer",
        text: tf(`items.${key}.a`),
      },
    })),
  };
return (
  <main className="min-h-screen bg-white">
    {/* 1. THE TOP SHELF (For your Header) */}
    {/* This solid light bar ensures your black/grey header text is 100% visible */}
    <div className="h-20 w-full bg-[#f1f5f9] border-b border-slate-200" />

    {/* 2. THE DARK HERO SECTION */}
    <section className="relative pt-20 pb-20 overflow-hidden bg-[#0B1120]">
      {/* Sharp Top Shadow/Glow to bridge the gap */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent shadow-[0_0_20px_rgba(16,185,129,0.3)]" />

      {/* Your Original Excel Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
        {/* Hero Content */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-8">
          <Table className="w-3 h-3" />
          <span>{t("hero_pill")}</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          {t("hero_title")}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
            {t("hero_highlight")}
          </span>
        </h1>

        <p className="md:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto mb-12">
          {t("hero_subtitle")}
        </p>

        <div className="relative">
          <ExcelToolInterface />
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-12 opacity-60">
          <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />{" "}
            {t("trust_security")}
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
            <Grid3X3 className="w-4 h-4 text-emerald-500" /> {t("trust_grid")}
          </div>
          <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />{" "}
            {t("trust_accuracy")}
          </div>
        </div>
      </div>
    </section>

    {/* 2. VALUE PROPOSITION */}
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className="bg-slate-50 rounded-2xl p-8 border border-slate-100 group hover:border-emerald-100 transition-colors"
            >
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-600 mb-6 shadow-sm">
                {num === 1 ? (
                  <Grid3X3 />
                ) : num === 2 ? (
                  <Zap />
                ) : (
                  <FileSpreadsheet />
                )}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {t(`feat_${num}_title`)}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {t(`feat_${num}_desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 3. HOW IT WORKS */}
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-3xl font-bold mb-16">{t("how_title")}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="relative group">
              <div className="text-8xl font-black text-white/5 absolute -top-8 left-1/2 -translate-x-1/2 group-hover:text-white/10 transition-colors">
                {step}
              </div>
              <h3 className="text-xl font-bold text-emerald-400 mb-2 relative z-10">
                {t(`step_${step}_title`)}
              </h3>
              <p className="text-slate-400 relative z-10">
                {t(`step_${step}_desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 4. FAQ SECTION */}
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
          {t("faq_title")}
        </h2>
        <div className="space-y-8">
          {faqItems.map((key) => (
            <div
              key={key}
              className="border-b border-slate-100 pb-8 last:border-0"
            >
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {tf(`items.${key}.q`)}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {tf(`items.${key}.a`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 5. CTA BOTTOM */}
    <section className="bg-emerald-50 py-20 border-t border-emerald-100 text-center">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-emerald-900 mb-6">
          {t("cta_title")}
        </h2>
        <a
          href="/signup"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-emerald-600/20 transition-all hover:-translate-y-1"
        >
          {t("cta_btn")} <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  </main>
);
}
