import BlogSection from "../../ui/BlogSection";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  const localePath = locale === "en" ? "" : `/${locale}`;

  return {
    title: "Blog | NoteOCR",
    description: "Insights on AI, handwriting recognition, and productivity",
    alternates: {
      canonical: `https://noteocr.com${localePath}/blog`,
      languages: {
        "x-default": "https://noteocr.com/blog",
        en: "https://noteocr.com/blog",
        tr: "https://noteocr.com/tr/blog",
        es: "https://noteocr.com/es/blog",
        zh: "https://noteocr.com/zh/blog",
        hi: "https://noteocr.com/hi/blog",
        de: "https://noteocr.com/de/blog",
        ja: "https://noteocr.com/ja/blog",
        fr: "https://noteocr.com/fr/blog",
        "pt-br": "https://noteocr.com/pt-br/blog",
        da: "https://noteocr.com/da/blog",
        fi: "https://noteocr.com/fi/blog",
        it: "https://noteocr.com/it/blog",
        nl: "https://noteocr.com/nl/blog",
        no: "https://noteocr.com/no/blog",
        sv: "https://noteocr.com/sv/blog",
      },
    },
    openGraph: {
      title: "Blog | NoteOCR",
      description: "Insights on AI, handwriting recognition, and productivity",
      url: `https://noteocr.com${localePath}/blog`,
      siteName: "NoteOCR",
      images: [
        { url: "/icon.png", width: 1200, height: 630, alt: "NoteOCR Blog" },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Blog | NoteOCR",
      description: "Insights on AI, handwriting recognition, and productivity",
      images: ["/icon.png"],
    },
  };
}

export default function BlogPage() {
  return <BlogSection />;
}
