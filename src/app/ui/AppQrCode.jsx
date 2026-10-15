"use client";

import { QRCodeSVG } from "qrcode.react";
import { useTranslations } from "next-intl";

export default function AppQrCode() {
  const t = useTranslations("AppPage");

  return (
    <div className="mt-8 hidden items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 lg:inline-flex">
      <div className="rounded-lg bg-white p-2">
        <QRCodeSVG value="https://noteocr.com/get-app" size={96} level="M" />
      </div>
      <div className="max-w-[18ch]">
        <p className="text-sm font-medium text-[#F4F1EA]">{t("qr_title")}</p>
        <p className="mt-1 text-xs text-white/60">{t("qr_hint")}</p>
      </div>
    </div>
  );
}
