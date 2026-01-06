"use client";
import React from "react";
import { useTranslations } from "next-intl";
import {
  UploadCloud,
  Wand2,
  FileOutput,
  Upload,
  CheckCircle2,
} from "lucide-react";

const HowItWorksSection = () => {
  const t = useTranslations("HowItWorks");

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background Decorative Blob */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent opacity-50"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="h-px w-8 bg-slate-300"></span>
            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">
              {t("label")}
            </span>
            <span className="h-px w-8 bg-slate-300"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">
            {t("title_1")} <br className="hidden md:block" />
            <span className="text-teal-600">{t("title_2")}</span>
          </h2>
          <p className="text-sm md:text-lg text-slate-600 mb-6 leading-relaxed">
            {t("description")}
          </p>
        </div>

        {/* The Process Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Connector Line (Desktop Only) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-slate-200 to-transparent -z-10"></div>

          {/* STEP 1: UPLOAD & SCAN */}
          <div className="relative group">
            <div className="w-24 h-24 mx-auto bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/40 flex items-center justify-center mb-8 relative z-10 group-hover:-translate-y-2 transition-transform duration-500">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                <UploadCloud className="w-6 h-6" />
              </div>
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm border-4 border-slate-50">
                1
              </div>
            </div>
            <div className="text-center px-4">
              <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                {t("step_1_title")}
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                {t("step_1_desc")}
              </p>
            </div>
            {/* MINI UI: UPLOAD ZONE */}
            <div className="mt-8 mx-auto w-full max-w-[240px] bg-white border border-slate-200 rounded-2xl p-4 shadow-sm group-hover:shadow-xl group-hover:border-blue-300 transition-all duration-500 relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
              </div>
              <div className="border-2 border-dashed border-slate-100 rounded-xl p-4 flex flex-col items-center bg-slate-50/50 group-hover:bg-blue-50/30 transition-colors">
                <Upload className="w-6 h-6 text-blue-400 mb-2 animate-bounce" />
                <div className="h-1.5 w-16 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-0 group-hover:w-full transition-all duration-1000"></div>
                </div>
              </div>
            </div>
          </div>

          {/* STEP 2: NEURAL ANALYSIS */}
          <div className="relative group">
            <div className="w-24 h-24 mx-auto bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/40 flex items-center justify-center mb-8 relative z-10 group-hover:-translate-y-2 transition-transform duration-500">
              <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors duration-500">
                <Wand2 className="w-6 h-6" />
              </div>
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm border-4 border-slate-50">
                2
              </div>
            </div>
            <div className="text-center px-4">
              <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-teal-600 transition-colors">
                {t("step_2_title")}
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                {t("step_2_desc")}
              </p>
            </div>
            {/* MINI UI: SCANNING ENGINE */}
            <div className="mt-8 mx-auto w-full max-w-[240px] bg-slate-900 rounded-2xl p-4 shadow-2xl relative overflow-hidden h-32">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              ></div>
              <div className="relative space-y-2">
                <div className="h-2 w-full bg-slate-700/50 rounded flex items-center px-1">
                  <div className="h-1 w-1/3 bg-teal-500/50 rounded animate-pulse"></div>
                </div>
                <div className="h-2 w-4/5 bg-slate-700/50 rounded"></div>
              </div>
              {/* The Scanning Beam */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-500/20 to-transparent h-1/2 w-full -translate-y-full group-hover:animate-[scan_2s_ease-in-out_infinite]"></div>
              <div className="absolute bottom-2 right-2 flex gap-1">
                <div className="w-1 h-1 bg-teal-500 rounded-full animate-ping"></div>
                <span className="text-[8px] font-mono text-teal-500 uppercase tracking-tighter">
                  {t("processing")}
                </span>
              </div>
            </div>
          </div>

          {/* STEP 3: SYNTHESIS & EXPORT */}
          <div className="relative group">
            <div className="w-24 h-24 mx-auto bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/40 flex items-center justify-center mb-8 relative z-10 group-hover:-translate-y-2 transition-transform duration-500">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors duration-500">
                <FileOutput className="w-6 h-6" />
              </div>
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm border-4 border-slate-50">
                3
              </div>
            </div>
            <div className="text-center px-4">
              <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">
                {t("step_3_title")}
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                {t("step_3_desc")}
              </p>
            </div>
            {/* MINI UI: EXPORT SUCCESS */}
            <div className="mt-8 mx-auto w-full max-w-[240px] h-32 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-amber-500/5 rounded-full blur-3xl group-hover:bg-amber-500/10 transition-colors"></div>
              <div className="relative flex gap-2">
                <div className="w-12 h-16 bg-white border border-slate-200 shadow-md rounded-lg flex flex-col p-2 -rotate-12 translate-x-4 group-hover:translate-x-0 group-hover:rotate-[-15deg] transition-all duration-500 opacity-60">
                  <div className="w-full h-1 bg-blue-100 rounded mb-1"></div>
                </div>
                <div className="w-14 h-20 bg-white border-2 border-white shadow-2xl rounded-xl z-10 flex flex-col items-center justify-center gap-2 group-hover:scale-110 transition-transform duration-500 ring-1 ring-slate-100">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  <div className="text-[10px] font-bold text-slate-800 tracking-tighter">
                    DOCX
                  </div>
                </div>
                <div className="w-12 h-16 bg-white border border-slate-200 shadow-md rounded-lg flex flex-col p-2 rotate-12 -translate-x-4 group-hover:translate-x-0 group-hover:rotate-[15deg] transition-all duration-500 opacity-60">
                  <div className="w-full h-1 bg-emerald-100 rounded mb-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan {
          0%, 100% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default HowItWorksSection;
