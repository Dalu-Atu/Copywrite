"use client";
import { Upload, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useConverter } from "./ConverterProvider";

export default function HeroUploader() {
  const t = useTranslations("HomePage");
  const { openPicker, isProcessing, dragActive } = useConverter();

  return (
    <div
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      aria-live="polite"
    >
      <h2 className="text-lg font-bold text-[#00415a]">{t("demo_title")}</h2>
      <p className="mt-1 text-sm text-slate-600">{t("demo_desc")}</p>

      <button
        type="button"
        onClick={openPicker}
        disabled={isProcessing}
        className={`mt-4 flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-10 text-center transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1b9e99] disabled:opacity-70 ${
          dragActive
            ? "border-[#1b9e99] bg-[#1b9e99]/15"
            : "border-[#1b9e99]/50 bg-[#1b9e99]/5 hover:bg-[#1b9e99]/10"
        }`}
      >
        {isProcessing ? (
          <>
            <Loader2
              className="h-7 w-7 animate-spin text-[#1b9e99]"
              aria-hidden
            />
            <span className="font-semibold text-[#00415a]">
              {t("demo_busy")}
            </span>
          </>
        ) : (
          <>
            <Upload className="h-7 w-7 text-[#1b9e99]" aria-hidden />
            <span className="font-semibold text-[#00415a]">
              {t("demo_drop")}
            </span>
            <span className="text-xs text-slate-500">{t("demo_formats")}</span>
          </>
        )}
      </button>
    </div>
  );
}
