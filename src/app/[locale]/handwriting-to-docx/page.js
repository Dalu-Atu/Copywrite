
import React from "react";
import ToolInterface from "../../ui/ToolInterface";
import {
  FileText,
  CheckCircle2,
  Zap,
  ShieldCheck,
  LayoutTemplate,
  ArrowRight,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

// 1. Keep the keys list outside (this is fine as it's just an array)
const faqItems = [
  "what_is",
  "who_benefit",
  "how_work",
  "accuracy",
  "cursive",
  "formats",
  "how_to_word",
  "limits",
  "math",
  "phone_scan",
  "quality",
  "history",
  "low_accuracy",
  "pdf_edit",
  "cloud_save",
  "sharing",
  "storage_limit",
  "languages",
  "messy_writing",
  "security",
  "install",
  "offline",
  "batch",
  "is_free",
  "pricing_diff",
  "cancel",
  "why_manual",
  "diff_others",
  "digitize_free",
];

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "WordPage" });

  return {
    title: t("meta_title"),
    description: t("meta_desc"),
    alternates: {
      canonical: `https://copywritee.com/${locale}/handwriting-to-docx`,
      languages: {
        en: "https://copywritee.com/en/handwriting-to-docx",
        tr: "https://copywritee.com/tr/handwriting-to-docx",
        es: "https://copywritee.com/es/handwriting-to-docx",
        zh: "https://copywritee.com/zh/handwriting-to-docx",
        hi: "https://copywritee.com/hi/handwriting-to-docx",
        de: "https://copywritee.com/de/handwriting-to-docx",
        ja: "https://copywritee.com/ja/handwriting-to-docx",
        "pt-br": "https://copywritee.com/pt-br/handwriting-to-docx",
        "x-default": "https://copywritee.com/en/handwriting-to-docx",
      },
    },
    openGraph: {
      title: t("hero_title_1") + " " + t("hero_title_2"),
      description: t("meta_desc"),
      images: ["/images/copywrite-image002.png"],
    },
  };
}

export default function HandwritingToWordPage() {
  // Initialize hooks inside the component
  const t = useTranslations("WordPage");
  const h = useTranslations("HomePage");
  const test = useTranslations("Testimonials");
  const tf = useTranslations("FAQ"); // Moved inside

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. THE TOP SHELF (Clean zone for your transparent header) */}
      {/* Matches the Slate-100 shelf from the Excel page for consistency */}
      <div className="h-20 w-full bg-[#f1f5f9] border-b border-slate-200" />

      {/* 2. HERO & TOOL SECTION */}
      <section className="relative pt-20 pb-20 overflow-hidden bg-[#0B1120]">
        {/* Sharp Blue Glow Line to bridge the shelf and the hero */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent shadow-[0_0_20px_rgba(59,130,246,0.3)]" />

        {/* Background Effects (Blue Theme) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Header Content */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
              <FileText className="w-3 h-3" />
              <span>{h("trust_pill")}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              {t("hero_title_1")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                {t("hero_title_2")}
              </span>
            </h1>
            <p className="md:text-lg text-slate-400 leading-relaxed">
              {t("hero_subtitle")}
            </p>
          </div>

          {/* THE INTERACTIVE TOOL */}
          <div className="relative">
            <ToolInterface />
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-12 opacity-60">
            <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
              <ShieldCheck className="w-4 h-4 text-blue-500" /> Secure SSL
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
              <Zap className="w-4 h-4 text-blue-500" /> {h("stat_time")}
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
              <CheckCircle2 className="w-4 h-4 text-blue-500" />{" "}
              {h("stat_accuracy")}
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 mb-6 shadow-sm border border-slate-200">
                <LayoutTemplate className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {t("feat_1_title")}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {t("feat_1_desc")}
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 mb-6 shadow-sm border border-slate-200">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {t("feat_2_title")}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {t("feat_2_desc")}
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-purple-600 mb-6 shadow-sm border border-slate-200">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {t("feat_3_title")}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {t("feat_3_desc")}
              </p>
            </div>
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
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {t("faq_q1")}
              </h3>
              <p className="text-slate-600 leading-relaxed">{t("faq_a1")}</p>
            </div>
            <div className="h-px bg-slate-100"></div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {t("faq_q2")}
              </h3>
              <p className="text-slate-600 leading-relaxed">{t("faq_a2")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA BOTTOM */}
      <section className="bg-blue-50 py-20 border-t border-blue-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            {test("trust_footer")}
          </h2>
          <a
            href="/signup"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-blue-600/20 transition-all hover:-translate-y-1"
          >
            {h("cta_start")} <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
