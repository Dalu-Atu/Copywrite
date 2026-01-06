"use client";
import React from "react";
import { useTranslations } from "next-intl";
import {
  Scale,
  FileCheck,
  Shield,
  CreditCard,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Globe,
  Mail,
  ChevronRight,
} from "lucide-react";

export default function TermsOfService() {
  const t = useTranslations("TermsPage");

  const sections = [
    { id: "services", icon: FileCheck, title: t("s1_t"), content: t("s1_c") },
    { id: "content", icon: Shield, title: t("s2_t"), content: t("s2_c") },
    { id: "ip", icon: Scale, title: t("s3_t"), content: t("s3_c") },
    { id: "payments", icon: CreditCard, title: t("s4_t"), content: t("s4_c") },
    {
      id: "prohibited",
      icon: XCircle,
      title: t("s5_t"),
      content: t("s5_c"),
      isList: true,
    },
    {
      id: "termination",
      icon: AlertTriangle,
      title: t("s6_t"),
      content: t("s6_c"),
      isWarning: true,
    },
    {
      id: "liability",
      icon: Shield,
      title: t("s7_t"),
      content: t("s7_c"),
      isWarning: true,
    },
    { id: "changes", icon: RefreshCw, title: t("s8_t"), content: t("s8_c") },
    { id: "law", icon: Globe, title: t("s9_t"), content: t("s9_c") },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-emerald-100">
      {/* Hero Header */}
      <section className="relative pt-32 pb-20 bg-slate-50 border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest mb-6">
            <Scale className="w-4 h-4" />
            <span>Legal Documentation</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
            {t("hero_title")}
          </h1>
          <p className="text-slate-500 font-medium">
            {t("last_updated")}: {t("date")}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sticky Sidebar Navigation */}
          <aside className="lg:w-1/4 hidden lg:block sticky top-32 h-fit">
            <nav className="space-y-1">
              {sections.map((section, idx) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all group"
                >
                  <span className="text-slate-300 group-hover:text-emerald-400 font-mono text-xs">
                    0{idx + 1}
                  </span>
                  {section.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Main Content Areas */}
          <div className="lg:w-3/4 space-y-20">
            {/* Welcome Message */}
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
              <p className="text-lg text-slate-600 leading-relaxed italic">
                {t("welcome_text")}
              </p>
            </div>

            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-32"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center text-emerald-600">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                      <span className="text-slate-300 mr-2 font-mono text-xl">
                        0{index + 1}.
                      </span>
                      {section.title}
                    </h2>
                  </div>

                  <div
                    className={`sm:ml-16 leading-relaxed text-slate-600 space-y-4`}
                  >
                    {section.isList ? (
                      <div className="grid gap-4">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 group hover:border-emerald-200 transition-colors"
                          >
                            <ChevronRight className="w-5 h-5 text-emerald-500 shrink-0" />
                            <p className="text-slate-700">
                              {t(`prohibited_item_${i}`)}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : section.isWarning ? (
                      <div className="bg-emerald-50/50 rounded-2xl p-8 border border-emerald-100 text-slate-700">
                        {section.content}
                      </div>
                    ) : (
                      <p className="text-lg">{section.content}</p>
                    )}
                  </div>
                </section>
              );
            })}

            {/* Contact Card */}
            <section
              id="contact"
              className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden"
            >
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                <div>
                  <h2 className="text-3xl font-bold mb-4">{t("contact_t")}</h2>
                  <p className="text-slate-400 max-w-md">{t("contact_d")}</p>
                </div>
                <div className="space-y-4 w-full md:w-auto">
                  <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl backdrop-blur-md border border-white/10">
                    <Mail className="w-5 h-5 text-emerald-400" />
                    <span className="font-semibold tracking-wide">
                      care.copywrite@gmail.com
                    </span>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl"></div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
