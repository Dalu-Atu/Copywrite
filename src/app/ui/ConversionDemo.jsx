"use client";

import { useTranslations } from "next-intl";
import {
  ImageIcon,
  FileText,
  ArrowRight,
  Loader2,
  FileType,
} from "lucide-react";

export default function ConversionDemo() {
  const t = useTranslations("DocsPage.demo");

  return (
    <>
      <style>{`
        @keyframes scan {
          0%, 100% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 3.5s linear infinite;
        }
      `}</style>

      <div className="bg-slate-900 rounded-xl overflow-hidden shadow-2xl mt-6 border border-slate-800">
        <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <span>{t("process_id")}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800 bg-slate-900">
          {/* LEFT: Input Image */}
          <div className="p-6 relative group">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <ImageIcon className="w-3 h-3" /> {t("uploaded_label")}
              </span>
              <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/20 animate-pulse flex items-center gap-1">
                <Loader2 className="w-3 h-3 animate-spin" />
                {t("converting_status")}
              </span>
            </div>

            <div className="relative h-[500px] w-full rounded-lg overflow-hidden border border-slate-700 shadow-lg bg-black/50">
              <img
                src="/images/input.jpg"
                alt={t("alt_input")}
                className="w-full h-full object-contain opacity-90"
              />

              <div className="absolute inset-0 bg-slate-900/10 pointer-events-none"></div>

              <div className="absolute left-0 right-0 h-[2px] bg-teal-400 shadow-[0_0_25px_rgba(45,212,191,1)] z-10 animate-scan pointer-events-none">
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-teal-500/20 to-transparent"></div>
              </div>

              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur text-white/70 text-[10px] px-2 py-1 rounded">
                {t("filename")}
              </div>
            </div>
          </div>

          {/* RIGHT: Output Image */}
          <div className="p-6 bg-slate-900/50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold text-[#1b9e99] uppercase tracking-wider flex items-center gap-2">
                <FileType className="w-3 h-3" /> {t("converted_label")}
              </span>
              <span className="text-xs text-slate-500">{t("file_ext")}</span>
            </div>

            <div className="relative h-[500px] w-full rounded-lg overflow-hidden border border-slate-700 shadow-lg group bg-black/50">
              <img
                src="/images/output.png"
                alt={t("alt_output")}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
