import React from "react";
import { useTranslations } from "next-intl";
import {
  GraduationCap,
  Search,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const t = await getTranslations({
    locale: params.locale,
    namespace: "EducationPage",
  });

  return {
    title: t("meta_title"),
    description: t("meta_desc"),
    keywords: [
      "handwriting to text",
      "student OCR",
      "lecture notes OCR",
      "notes to notion",
      "notes to obsidian",
      "anki OCR",
      "study notes digitization",
    ],
 
    robots: {
      index: true,
      follow: true,
    },
  };
}


export default function EducationPage() {
  const t = useTranslations("EducationPage");

  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-emerald-100">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-3/5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest mb-6">
                <GraduationCap className="w-4 h-4" />
                <span>{t("hero.badge")}</span>
              </div>

              <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.1]">
                {t("hero.title_start")} <br />
                <span className="text-emerald-600">
                  {t("hero.title_highlight")}
                </span>
              </h1>

              <p className="md:text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0">
                {t("hero.subtitle")}{" "}
                <span className="font-semibold text-slate-800">
                  {t("hero.platforms")}
                </span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="https://app.copywritee.com/signup"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-10 rounded-lg shadow-xl shadow-emerald-200 transition-all flex items-center justify-center gap-2 group"
                >
                  {t("hero.cta_primary")}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="/contact"
                  className="bg-white border border-slate-300 hover:border-emerald-600 text-slate-700 font-bold py-4 px-10 rounded-lg transition-all"
                >
                  {t("hero.cta_secondary")}
                </a>
              </div>

              <div className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />{" "}
                  {t("hero.trust1")}
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />{" "}
                  {t("hero.trust2")}
                </span>
              </div>
            </div>

            {/* Visual Side */}
            <div className="lg:w-2/5 w-full relative">
              <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <span className="text-xs text-slate-400 ml-2 font-mono">
                    lecture_notes_v1.docx
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="h-4 w-3/4 bg-slate-100 rounded"></div>
                  <div className="h-4 w-full bg-slate-100 rounded"></div>
                  <div className="h-4 w-5/6 bg-emerald-50 rounded border-l-2 border-emerald-400"></div>
                  <div className="h-4 w-full bg-slate-100 rounded"></div>
                  <div className="h-32 w-full bg-slate-50 rounded-lg border-2 border-dashed border-slate-200 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-emerald-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITIONS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              {t("values.title")}
            </h2>
            <p className="md:text-lg text-slate-600">{t("values.subtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <Clock className="w-10 h-10 text-emerald-600 mb-6" />
              <h3 className="text-xl font-bold mb-3">{t("values.v1_title")}</h3>
              <p className="text-slate-600">{t("values.v1_desc")}</p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <Search className="w-10 h-10 text-emerald-600 mb-6" />
              <h3 className="text-xl font-bold mb-3">{t("values.v2_title")}</h3>
              <p className="text-slate-600">{t("values.v2_desc")}</p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <BrainCircuit className="w-10 h-10 text-emerald-600 mb-6" />
              <h3 className="text-xl font-bold mb-3">{t("values.v3_title")}</h3>
              <p className="text-slate-600">{t("values.v3_desc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STEP-BY-STEP WORKFLOW */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-4">{t("steps.title")}</h2>
            <p className="text-slate-400">{t("steps.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            <div>
              <span className="text-6xl font-black text-white/10 mb-4 block">
                01
              </span>
              <h4 className="text-xl font-bold mb-3">{t("steps.s1_title")}</h4>
              <p className="text-slate-400 leading-relaxed">
                {t("steps.s1_desc")}
              </p>
            </div>
            <div>
              <span className="text-6xl font-black text-white/10 mb-4 block">
                02
              </span>
              <h4 className="text-xl font-bold mb-3">{t("steps.s2_title")}</h4>
              <p className="text-slate-400 leading-relaxed">
                {t("steps.s2_desc")}
              </p>
            </div>
            <div>
              <span className="text-6xl font-black text-white/10 mb-4 block">
                03
              </span>
              <h4 className="text-xl font-bold mb-3">{t("steps.s3_title")}</h4>
              <p className="text-slate-400 leading-relaxed">
                {t("steps.s3_desc")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMPARISON TABLE */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">
            {t("compare.title")}
          </h2>
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-6 font-bold">{t("compare.h1")}</th>
                  <th className="p-6 font-bold text-emerald-600">
                    {t("compare.h2")}
                  </th>
                  <th className="p-6 font-bold text-slate-400">
                    {t("compare.h3")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-6 font-medium">{t("compare.r1_c1")}</td>
                  <td className="p-6 text-emerald-600 font-semibold">
                    {t("compare.r1_c2")}
                  </td>
                  <td className="p-6 text-slate-500">{t("compare.r1_c3")}</td>
                </tr>
                <tr>
                  <td className="p-6 font-medium">{t("compare.r2_c1")}</td>
                  <td className="p-6 text-emerald-600 font-semibold">
                    {t("compare.r2_c2")}
                  </td>
                  <td className="p-6 text-slate-500">{t("compare.r2_c3")}</td>
                </tr>
                <tr>
                  <td className="p-6 font-medium">{t("compare.r3_c1")}</td>
                  <td className="p-6 text-emerald-600 font-semibold">
                    {t("compare.r3_c2")}
                  </td>
                  <td className="p-6 text-slate-500">{t("compare.r3_c3")}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 5. FINAL CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-emerald-600 rounded-3xl p-12 md:p-20 text-center text-white relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                {t("cta.title")}
              </h2>
              <p className="text-emerald-100 md:text-lg mb-10 opacity-90">
                {t("cta.desc")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://app.copywritee.com/signup"
                  className="bg-white text-emerald-600 font-bold py-4 px-10 rounded-lg shadow-lg hover:bg-emerald-50 transition-all"
                >
                  {t("cta.btn1")}
                </a>
                <a
                  href="/contact"
                  className="bg-emerald-500 text-white border border-emerald-400 font-bold py-4 px-10 rounded-lg hover:bg-emerald-400 transition-all"
                >
                  {t("cta.btn2")}
                </a>
              </div>
              <p className="mt-8 text-sm text-emerald-200">{t("cta.footer")}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
