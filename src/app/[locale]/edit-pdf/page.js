import React from "react";
import PdfClientContent from "../../ui/PdfClientContent";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "PdfPage" });

  return {
    title: t("meta_title"),
    description: t("meta_desc"),

    alternates: {
      canonical: `https://noteocr.com/${locale}/edit-pdf`,
      languages: {
        en: "https://noteocr.com/en/edit-pdf",
        es: "https://noteocr.com/es/edit-pdf",
        tr: "https://noteocr.com/tr/edit-pdf",
        zh: "https://noteocr.com/zh/edit-pdf",
        hi: "https://noteocr.com/hi/edit-pdf",
        de: "https://noteocr.com/de/edit-pdf",
        ja: "https://noteocr.com/ja/edit-pdf",
        "pt-br": "https://noteocr.com/pt-br/edit-pdf",
      },
    },
  };
}

export default async function PdfToolsPage({ params }) {
  const { locale } = await params;

  return (
    <main className="min-h-screen bg-white">
      {/* 1. THE TOP SHELF (Safe zone for Nav) */}
      <div className="h-20 w-full bg-[#FFF1F2] border-b border-rose-100/50" />
      {/* 2. THE CLIENT CONTENT */}
      <PdfClientContent locale={locale} />
    </main>
  );
}
