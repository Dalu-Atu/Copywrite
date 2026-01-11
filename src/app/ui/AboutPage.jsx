"use client";
import React from "react";
import { useTranslations } from "next-intl";
import {
  FileText,
  Table,
  Cloud,
  Users,
  Share2,
  ArrowRight,
  Cpu,
  Globe,
  ScanLine,
  Layers,
  Code2,
} from "lucide-react";

export default function About() {
  const t = useTranslations("AboutPage");

  // Localized Features Array
  const features = ["engine", "spreadsheets", "hub", "collab", "export"].map(
    (key) => ({
      title: t(`features.${key}.title`),
      tag: t(`features.${key}.tag`),
      description: t(`features.${key}.desc`),
      icon: {
        engine: FileText,
        spreadsheets: Table,
        hub: Cloud,
        collab: Users,
        export: Share2,
      }[key],
      color:
        key === "hub"
          ? "bg-violet-100 text-violet-700"
          : key === "collab"
          ? "bg-pink-100 text-pink-700"
          : key === "export"
          ? "bg-amber-100 text-amber-700"
          : "bg-emerald-100 text-emerald-700",
    })
  );

  return (
    <div className="bg-white font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* --- Hero Section --- */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 overflow-hidden bg-slate-50 border-b border-slate-200">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-sm mb-6">
              <span className="flex h-2 w-2 rounded-full bg-emerald-600"></span>
              <span className="text-sm font-medium text-slate-600">
                {t("hero.badge")}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
              {t("hero.title_start")} <br />
              <span className="text-emerald-600">
                {t("hero.title_highlight")}
              </span>
            </h1>
            <p className="text-slate-600 leading-relaxed mb-6">
              {t("hero.p1")}
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              {t("hero.p2")}{" "}
              <span className="font-semibold text-slate-900">
                {t("hero.p2_bold")}
              </span>
            </p>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-600 rounded-2xl transform rotate-3 opacity-10"></div>
            <img
              src="/images/noteocr-illustration.png"
              alt="Interface"
              className="relative rounded-2xl shadow-2xl border border-slate-200 bg-white"
            />
          </div>
        </div>
      </section>

      {/* --- Tech Section --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-6">
            {t("tech.title_start")}{" "}
            <span className="text-emerald-600">
              {t("tech.title_highlight")}
            </span>
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto mb-16">
            {t("tech.subtitle")}{" "}
            <span className="font-semibold text-emerald-600">
              OCR, ICR, and NLP
            </span>{" "}
            {t("tech.subtitle_end")}
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              {
                icon: <Cpu />,
                title: t("tech.card1_t"),
                desc: t("tech.card1_d"),
              },
              {
                icon: <ScanLine />,
                title: t("tech.card2_t"),
                desc: t("tech.card2_d"),
              },
              {
                icon: <Globe />,
                title: t("tech.card3_t"),
                desc: t("tech.card3_d"),
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-emerald-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-emerald-600 mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Ecosystem Section --- */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 mb-6">
              The NoteOcr{" "}
              <span className="text-emerald-600">
                {t("ecosystem.highlight")}
              </span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {t("ecosystem.subtitle")}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
            {features.map((feature, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div
                  className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center ${feature.color}`}
                >
                  <feature.icon className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-slate-900">
                      {feature.title}
                    </h3>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-slate-200 text-slate-600 rounded-md">
                      {feature.tag}
                    </span>
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-3">
                    {feature.description}
                  </p>
                  <a
                    href="https://app.noteocr.com/signup"
                    className="inline-flex items-center text-sm font-semibold text-emerald-600 hover:text-emerald-800 group"
                  >
                    {t("ecosystem.explore")}{" "}
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Founder Section --- */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-12 grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-6 text-emerald-400 font-semibold uppercase text-sm">
              <Code2 className="w-5 h-5" />
              <span>{t("founder.badge")}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              {t("founder.title")}
            </h2>
            <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
              <p>
                {t("founder.p1")}{" "}
                <strong className="text-white">Atu Chukwudalu Daniel</strong>.
              </p>
              <p>{t("founder.p2")}</p>
            </div>
            <div className="mt-8 pt-8 border-t border-slate-700">
              <p className="font-medium text-white text-lg">
                Atu Chukwudalu Daniel
              </p>
              <p className="text-slate-400 text-sm">{t("founder.role")}</p>
            </div>
          </div>
          <div className="relative">
            <img
              src="/images/carrer.png"
              alt="Founder"
              className="relative rounded-2xl shadow-2xl w-full h-80 object-cover grayscale"
            />
          </div>
        </div>
      </section>

      {/* --- Final Vision --- */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            {t("vision.title")}
          </h2>
          <p className="text-slate-600 leading-relaxed mb-12">
            {t("vision.p")}
          </p>
          <button
            onClick={() =>
              (window.location.href = "https://app.noteocr.com/signup")
            }
            className="inline-flex items-center px-8 py-4 text-lg font-bold text-white bg-emerald-600 rounded-xl shadow-lg hover:bg-emerald-700 transition-all"
          >
            {t("vision.cta")} <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </section>
    </div>
  );
}
