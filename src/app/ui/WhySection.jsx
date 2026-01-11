"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2, XCircle, Clock, TrendingUp, Shield } from "lucide-react";

const WhySection = () => {
  const t = useTranslations("Why");

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="text-center max-w-3xl mx-auto ">
        <div className="inline-flex items-center gap-2 mb-6">
          <span className="h-px w-8 bg-slate-300"></span>
          <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">
            {t("label")}
          </span>
          <span className="h-px w-8 bg-slate-300"></span>
        </div>
      </div>

      {/* Background Gradients */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] bg-teal-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            {t("title_main")}{" "}
            <span className="text-red-500 line-through decoration-red-500/50 decoration-4">
              {t("title_bad_ocr")}
            </span>
            . <br />
            {t("title_suffix")}
          </h2>
          <p className="text-sm md:text-lg text-slate-600 mb-6 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* COMPARISON ENGINE */}
        <div className="mb-12 bg-slate-50 rounded-3xl border border-slate-200 p-2 md:p-4 overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
            {/* LEFT: Others */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 relative overflow-hidden group">
              <div className="absolute top-4 right-4 px-3 py-1 bg-red-50 text-red-600 text-xs font-bold uppercase rounded-full border border-red-100 flex items-center gap-1">
                <XCircle className="w-3 h-3" /> Others
              </div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6">
                {t("others_label")}
              </h3>
              <div className="space-y-4 font-mono text-sm text-slate-400 opacity-70">
                <p className="break-words">
                  Tab|e_01{" "}
                  <span className="bg-red-100 text-red-500 px-1">
                    {t("others_error")}
                  </span>{" "}
                  Inv# 9928
                </p>
                <div className="pl-4 border-l-2 border-red-100 text-xs italic text-red-400">
                  {t("others_notes")
                    .split("|")
                    .map((note, i) => (
                      <p key={i}>{note.trim()}</p>
                    ))}
                </div>
              </div>
            </div>

            {/* RIGHT: NoteOcr */}
            <div className="bg-white rounded-2xl border border-teal-100 p-6 md:p-8 relative overflow-hidden shadow-xl shadow-teal-900/5">
              <div className="absolute top-4 right-4 px-3 py-1 bg-teal-50 text-teal-700 text-xs font-bold uppercase rounded-full border border-teal-100 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> NoteOcr
              </div>
              <h3 className="text-sm font-semibold text-teal-600 uppercase tracking-wider mb-6">
                {t("our_label")}
              </h3>
              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                  <span className="font-bold text-slate-900">
                    Invoice #9928
                  </span>
                  <span className="bg-green-50 text-green-700 px-2 py-0.5 rounded text-xs font-medium">
                    {t("our_status")}
                  </span>
                </div>
                <div className="w-full bg-slate-50 rounded border border-slate-100 overflow-hidden">
                  <div className="grid grid-cols-2 bg-slate-100 p-2 text-xs font-bold text-slate-600">
                    <div>{t("our_table_desc")}</div>
                    <div className="text-right">{t("our_table_total")}</div>
                  </div>
                  <div className="grid grid-cols-2 p-2 border-b border-slate-100 text-xs">
                    <div>{t("our_table_item")}</div>
                    <div className="text-right">$4,000.00</div>
                  </div>
                  <div className="grid grid-cols-2 p-2 text-xs">
                    <div>{t("our_table_date")}</div>
                    <div className="text-right">12/27/2024</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-teal-600 font-medium mt-4">
                  {t("our_features")
                    .split("|")
                    .map((feat, i) => (
                      <React.Fragment key={i}>
                        <CheckCircle2 className="w-3 h-3" /> {feat.trim()}
                      </React.Fragment>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* METRICS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Speed */}
          <div className="bg-slate-100 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-slate-100 group">
            <Clock className="w-10 h-10 p-2.5 bg-white rounded-lg border border-slate-200 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {t("card_1_title")}
            </h3>
            <p className="text-slate-500 text-sm mb-6">{t("card_1_desc")}</p>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="w-16">{t("card_1_manual")}</span>
                <div className="flex-1 h-2 bg-slate-200 rounded-full"></div>
                <span>4h</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-teal-700">
                <span className="w-16">NoteOcr</span>
                <div className="w-12 h-2 bg-teal-500 rounded-full"></div>
                <span>3s</span>
              </div>
            </div>
          </div>

          {/* ROI */}
          <div className="bg-slate-100 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-slate-100 group">
            <TrendingUp className="w-10 h-10 p-2.5 bg-white rounded-lg border border-slate-200 text-green-600 mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {t("card_2_title")}
            </h3>
            <p className="text-slate-500 text-sm mb-4">{t("card_2_desc")}</p>
            <div className="mt-auto pt-4 border-t border-slate-200">
              <span className="text-3xl font-bold text-slate-900">$20</span>
              <span className="text-xs text-slate-500 ml-1">
                {t("card_2_stat")}
              </span>
            </div>
          </div>

          {/* Security */}
          <div className="bg-slate-100 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-slate-100 group">
            <Shield className="w-10 h-10 p-2.5 bg-white rounded-lg border border-slate-200 text-purple-600 mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {t("card_3_title")}
            </h3>
            <p className="text-slate-500 text-sm mb-6">{t("card_3_desc")}</p>
            <div className="flex gap-2">
              {["SOC2", "GDPR", "AES-256"].map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-bold text-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
