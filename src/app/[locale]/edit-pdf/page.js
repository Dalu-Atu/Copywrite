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
      canonical: `https://copywritee.com/${locale}/edit-pdf`,
      languages: {
        en: "https://copywritee.com/en/edit-pdf",
        es: "https://copywritee.com/es/edit-pdf",
        tr: "https://copywritee.com/tr/edit-pdf",
        zh: "https://copywritee.com/zh/edit-pdf",
        hi: "https://copywritee.com/hi/edit-pdf",
        de: "https://copywritee.com/de/edit-pdf",
        ja: "https://copywritee.com/ja/edit-pdf",
        "pt-br": "https://copywritee.com/pt-br/edit-pdf",
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
