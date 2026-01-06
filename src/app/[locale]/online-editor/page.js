import React from "react";
import EditorClientContent from "../../ui/EditorClient";
import { getTranslations } from "next-intl/server";

// 1. DYNAMIC METADATA (Server Side)
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "EditorPage" });

  return {
    title: t("meta_title"),
    description: t("meta_desc"),
    alternates: {
      canonical: `https://copywritee.com/${locale}/online-editor`,
      languages: {
        en: "https://copywritee.com/en/online-editor",
        es: "https://copywritee.com/es/online-editor",
        tr: "https://copywritee.com/tr/online-editor",
        zh: "https://copywritee.com/zh/online-editor",
        hi: "https://copywritee.com/hi/online-editor",
        de: "https://copywritee.com/de/online-editor",
        ja: "https://copywritee.com/ja/online-editor",
        "pt-br": "https://copywritee.com/pt-br/online-editor",
      },
    },
    openGraph: {
      title: t("meta_title"),
      description: t("meta_desc"),
    },
  };
}

export default async function OnlineEditorPage({ params }) {
  const { locale } = await params;

  return (
    <main className="min-h-screen bg-white">

      <div className="h-20 w-full bg-[#f1f5f9] border-b border-slate-200" />

      {/* INTERACTIVE CONTENT: Hooks and State */}
      <EditorClientContent locale={locale} />
    </main>
  );
}
