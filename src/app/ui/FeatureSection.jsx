"use client";
import React from "react";
import { useTranslations } from "next-intl";
import {
  Table,
  Cloud,
  LayoutTemplate,
  FileSpreadsheet,
  Check,
  ChevronDown,
  Globe,
  Share2,
  FolderOpen,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  Loader2,
} from "lucide-react";
import TrustSection from "./TrustSection";

const CopywriteFeatures = () => {
  const t = useTranslations("Features");

  return (
    <section className="py-12 md:py-24 bg-slate-50 border-t border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. SECTION HEADER */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-24">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="h-px w-8 bg-slate-300"></span>
            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">
              {t("section_label")}
            </span>
            <span className="h-px w-8 bg-slate-300"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">
            {t("main_title_1")}
            <br className="hidden md:block" />
            <span className="text-teal-600">{t("main_title_2")}</span>
          </h2>
          <p className="text-sm md:text-lg text-slate-600 mb-6 leading-relaxed">
            {t("main_desc")}
          </p>
        </div>

        {/* 2. MAIN FEATURE: The Word-like Editor */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20 mb-16 md:mb-32">
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-4">
              <LayoutTemplate className="w-3 h-3 md:w-4 md:h-4" />
              <span>{t("editor_label")}</span>
            </div>
            <h3 className="text-2xl md:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
              {t("editor_title")}
            </h3>
            <p className="text-sm md:text-lg text-slate-600 mb-6 leading-relaxed">
              {t("editor_desc")}
            </p>

            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1 w-4 h-4 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <p className="text-sm md:text-base text-slate-700">
                    {t(`editor_check_${i}`)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Side - MS Word Window remains identical */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-blue-900/20 border border-slate-200 bg-white ring-1 ring-slate-900/5">
              <div className="bg-[#2B579A] w-full flex items-center justify-between px-4 py-2 text-white">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 opacity-90">
                    <div className="w-6 h-3 rounded-full bg-white/20 border border-white/30 relative">
                      <div className="absolute right-0.5 top-0.5 w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-[10px] font-medium hidden md:block">
                      AutoSave On
                    </span>
                  </div>
                </div>
                <div className="text-xs md:text-sm font-semibold tracking-wide truncate px-2">
                  {t("editor_mock_doc")}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">
                    JD
                  </div>
                </div>
              </div>
              {/* Toolbar & Image Content ... (same as your original) */}
              <div className="bg-[#f3f2f1] border-b border-slate-300 w-full px-2 md:px-4 py-2 flex items-center gap-2 md:gap-4">
                <div className="hidden md:flex gap-3 text-xs text-slate-600 font-medium mr-2">
                  <span className="text-[#2B579A] border-b-2 border-[#2B579A] pb-0.5">
                    Home
                  </span>
                  <span>Insert</span>
                  <span>Draw</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="bg-white border border-slate-300 rounded px-1.5 py-0.5 text-[10px]">
                    Calibri <ChevronDown className="inline w-2 h-2" />
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-600 ml-auto md:ml-0">
                  <Bold className="w-4 h-4" />
                  <Italic className="w-4 h-4" />
                  <Underline className="w-4 h-4" />
                </div>
              </div>
              <div className="p-2 md:p-6 flex justify-center">
                <img
                  src="/images/noteocr-image002-bg.png"
                  alt="Handwriting to Word"
                  className="w-full shadow-lg rounded-lg border border-slate-300/50"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3. SECONDARY FEATURE: Tables */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20 mb-16 md:mb-32">
          {/* Visual Side - Excel remains identical */}
          <div className="w-full lg:w-1/2 order-1 lg:order-1">
            <div className="relative rounded-xl overflow-hidden shadow-2xl shadow-emerald-900/20 border border-slate-200 bg-white">
              <div className="bg-[#217346] w-full flex items-center justify-between px-4 py-2 text-white">
                <FileSpreadsheet className="w-4 h-4" />
                <div className="text-xs md:text-sm font-semibold truncate">
                  {t("table_mock_doc")}
                </div>
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  JD
                </div>
              </div>
              <div className="p-2 md:p-4">
                <img
                  src="/images/table-to-excel.png"
                  alt="Excel conversion"
                  className="w-full rounded border-4 border-white"
                />
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 order-2 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-4">
              <Table className="w-3 h-3 md:w-4 md:h-4" />
              <span>{t("table_label")}</span>
            </div>
            <h3 className="text-2xl md:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
              {t("table_title")}
            </h3>
            <p className="text-sm md:text-lg text-slate-600 mb-6 leading-relaxed">
              {t("table_desc")}
            </p>
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1 w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <Check className="w-2.5 h-2.5" />
                  </div>
                  <p className="text-sm md:text-base text-slate-700">
                    {t(`table_check_${i}`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. THE ECOSYSTEM GRID */}
        <div className="mb-12 md:mb-16">
          <div className="text-center mb-10 md:mb-14">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
              {t("eco_title")}
            </h3>
            <p className="text-slate-500 mt-2 text-sm md:text-base">
              {t("eco_subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 mb-16">
            {/* Lang Card */}
            <div className="md:col-span-12 lg:col-span-4 bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden group h-[330px]">
              <Globe className="absolute top-0 right-0 p-8 opacity-10 w-48 h-48 group-hover:rotate-12 transition-all duration-700" />
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Globe className="w-5 h-5 text-teal-300" />
                    <span className="font-semibold text-teal-300 text-xs uppercase tracking-widest">
                      {t("lang_label")}
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold mb-3">{t("lang_title")}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {t("lang_desc")}
                  </p>
                </div>
                <div className="flex gap-4 opacity-40 group-hover:opacity-100 transition-opacity duration-500 flex-wrap">
                  <span className="text-4xl font-serif">A</span>
                  <span className="text-4xl font-serif">あ</span>
                  <span className="text-4xl font-serif">Ω</span>
                </div>
              </div>
            </div>

            {/* Cloud Card */}
            <div className="md:col-span-12 lg:col-span-4 bg-blue-600 rounded-3xl p-8 text-white relative overflow-hidden group h-[330px]">
              <FolderOpen className="absolute -right-4 -bottom-4 opacity-15 w-56 h-56 group-hover:scale-105 transition-transform duration-500" />
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <Cloud className="w-5 h-5 text-white mb-4" />
                  <span className="font-semibold text-blue-100 text-xs uppercase tracking-widest block mb-1">
                    {t("cloud_label")}
                  </span>
                  <h3 className="text-2xl font-bold mb-3">
                    {t("cloud_title")}
                  </h3>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    {t("cloud_desc")}
                  </p>
                </div>
              </div>
            </div>

            {/* Export Card */}
            <div className="md:col-span-12 lg:col-span-4 bg-white rounded-3xl p-8 border border-slate-200 shadow-lg relative overflow-hidden group h-[330px]">
              <Share2 className="absolute -right-10 -bottom-10 opacity-[0.05] w-64 h-64 group-hover:rotate-12 transition-all duration-700" />
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <Share2 className="w-5 h-5 text-teal-600 mb-4" />
                  <span className="font-semibold text-teal-600 text-xs uppercase tracking-widest block mb-1">
                    {t("export_label")}
                  </span>
                  <h3 className="text-3xl font-bold text-slate-900 mb-3">
                    {t("export_title")}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {t("export_desc")}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {["Word", "Excel", "PDF", "Text"].map((tool) => (
                    <div
                      key={tool}
                      className="px-3 py-2 bg-slate-50 border border-slate-100 rounded-xl text-center font-bold text-[11px] text-slate-600"
                    >
                      {tool}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TrustSection />
    </section>
  );
};

export default CopywriteFeatures;
