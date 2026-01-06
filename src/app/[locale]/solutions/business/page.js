import React from "react";
import { useTranslations } from "next-intl";
import {
  ShieldCheck,
  Users,
  Building2,
  Lock,
  Zap,
  CheckCircle2,
  Scale,
  Stethoscope,
  ArrowRight,
  Database,
  BarChart3,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "EnterprisePage",
  });

  return {
    title: t("meta_title"),
    description: t("meta_desc"),
    keywords: [
      "enterprise OCR",
      "document intelligence",
      "legal OCR",
      "healthcare OCR",
      "secure document processing",
      "SOC2 OCR",
      "HIPAA OCR",
    ],
  
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function EnterprisePage() {
  const t = useTranslations("EnterprisePage");

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-24 bg-slate-900">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-3/5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
                <ShieldCheck className="w-4 h-4" />
                <span>{t("hero.badge")}</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight">
                {t("hero.title_start")} <br />
                <span className="text-emerald-500">
                  {t("hero.title_highlight")}
                </span>
              </h1>

              <p className="md:text-xl text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0">
                {t("hero.subtitle")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="/contact"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-10 rounded-lg shadow-xl shadow-emerald-900/20 transition-all flex items-center justify-center gap-2"
                >
                  {t("hero.cta")}
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Visual: Abstract Data Nodes */}
            <div className="lg:w-2/5 w-full hidden lg:block">
              <div className="relative p-8 bg-slate-800/50 rounded-2xl border border-slate-700 backdrop-blur-sm">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-700">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span className="text-xs text-slate-300">
                        API: OCR_Batch_092
                      </span>
                    </div>
                    <span className="text-[10px] text-green-400 font-mono">
                      200 OK
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-700">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span className="text-xs text-slate-300">AES-256</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-mono">
                      {t("hero.visual_active")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-700">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                      <span className="text-xs text-slate-300">HIPAA/SOC2</span>
                    </div>
                    <CheckCircle2 className="w-3 h-3 text-green-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SOLUTIONS BY INDUSTRY */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold mb-4">{t("solutions.title")}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {t("solutions.desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Legal */}
            <div className="p-10 rounded-2xl border border-slate-200 hover:shadow-xl transition-shadow">
              <Scale className="w-12 h-12 text-emerald-600 mb-8" />
              <h3 className="text-2xl font-bold mb-4">
                {t("solutions.legal.title")}
              </h3>
              <p className="text-slate-600 mb-6">{t("solutions.legal.desc")}</p>
              <ul className="space-y-3 text-sm font-medium text-slate-500">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />{" "}
                  {t("solutions.legal.item1")}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />{" "}
                  {t("solutions.legal.item2")}
                </li>
              </ul>
            </div>

            {/* Healthcare */}
            <div className="p-10 rounded-2xl border border-slate-200 hover:shadow-xl transition-shadow">
              <Stethoscope className="w-12 h-12 text-emerald-600 mb-8" />
              <h3 className="text-2xl font-bold mb-4">
                {t("solutions.health.title")}
              </h3>
              <p className="text-slate-600 mb-6">
                {t("solutions.health.desc")}
              </p>
              <ul className="space-y-3 text-sm font-medium text-slate-500">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />{" "}
                  {t("solutions.health.item1")}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />{" "}
                  {t("solutions.health.item2")}
                </li>
              </ul>
            </div>

            {/* Business */}
            <div className="p-10 rounded-2xl border border-slate-200 hover:shadow-xl transition-shadow">
              <Building2 className="w-12 h-12 text-emerald-600 mb-8" />
              <h3 className="text-2xl font-bold mb-4">
                {t("solutions.biz.title")}
              </h3>
              <p className="text-slate-600 mb-6">{t("solutions.biz.desc")}</p>
              <ul className="space-y-3 text-sm font-medium text-slate-500">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />{" "}
                  {t("solutions.biz.item1")}
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />{" "}
                  {t("solutions.biz.item2")}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECURITY SECTION */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">{t("security.title")}</h2>
              <p className="md:text-lg text-slate-600 mb-8">
                {t("security.desc")}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <Lock className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold">{t("security.item1_title")}</h4>
                    <p className="text-xs text-slate-500">
                      {t("security.item1_desc")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <Database className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold">{t("security.item2_title")}</h4>
                    <p className="text-xs text-slate-500">
                      {t("security.item2_desc")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <Users className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold">{t("security.item3_title")}</h4>
                    <p className="text-xs text-slate-500">
                      {t("security.item3_desc")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                    <BarChart3 className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold">{t("security.item4_title")}</h4>
                    <p className="text-xs text-slate-500">
                      {t("security.item4_desc")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-900 rounded-3xl p-12 text-white">
              <h4 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Zap className="w-6 h-6 text-yellow-400" />
                {t("security.stats_title")}
              </h4>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2 font-mono">
                    <span>{t("security.stat1_label")}</span>
                    <span>99.98%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[99.9%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2 font-mono">
                    <span>{t("security.stat2_label")}</span>
                    <span>&lt;1.2s</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[85%]"></div>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-8">
                  {t("security.stats_footer")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FINAL CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-2">
          <div className="bg-slate-900 rounded-3xl p-12 md:p-20 text-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {t("cta.title")}
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
              {t("cta.desc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-emerald-600 text-white font-bold py-4 px-10 rounded-lg shadow-lg hover:bg-emerald-500 transition-all"
              >
                {t("cta.button")}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
