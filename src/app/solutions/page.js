import React from "react";
import Head from "next/head";
import HeaderComponent from "../ui/HeaderComponent";
import { blogPosts } from "../lib/posts";
import Footer from "../ui/Footer";
import ArticleCard from "../ui/ArticleCard";
import Script from "next/script";

// Note: For App Router, use the metadata export pattern
// For Pages Router, use the Head component as shown below
export const metadata = {
  title: "Copywrite | Convert Handwriting to Text with AI OCR Technology",
  description:
    "Save time and skip the typing. Convert handwritten notes to editable text or documents instantly with 97% accuracy. Free trial available!",
  keywords: [
    "handwriting to text",
    "AI converter",
    "OCR software",
    "handwriting recognition",
    "image to text",
    "text recognition",
    "handwriting to digital text",
    "convert handwriting to text online",
    "best AI handwriting converter",
    "free handwriting to text converter",
    "scan handwritten notes to text",
    "AI-powered handwriting recognition",
    "turn handwriting into editable text",
    "digital handwriting conversion software",
    "handwritten notes to text",
    "handwriting transcription software",
    "text extraction from image",
    "document scanning software",
    "AI text recognition",
    "PDF handwriting to text",
    "online OCR handwriting",
    "handwriting-to-text app",
    "How do I convert handwriting to text?",
    "What is the best handwriting recognition software?",
    "Can AI convert handwriting to text?",
    "Is there a free handwriting-to-text converter?",
    "How to scan and edit handwritten notes?",
  ],
  alternates: { canonical: "https://copywritee.com/solutions" },
  openGraph: {
    title: "Convert Handwriting to Text with 98% Accuracy | Copywrite",
    description:
      "Save time and skip the typing. Convert handwriting to document instantly with our AI-powered OCR technology!",
    url: "https://copywritee.com/solutions",
    siteName: "Copywrite",
    images: [
      {
        url: "https://copywritee.com/images/handwriting-conversion-demo.png",
        width: 1200,
        height: 630,
        alt: "Handwriting to text conversion with Copywrite",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Copywrite - Convert Handwriting to Text with 97% Accuracy",
    description: "Effortlessly digitize handwritten notes using AI technology.",
    images: ["https://copywritee.com/images/handwriting-conversion-demo.png"],
    site: "@copywriteeapp",
    creator: "@copywriteeapp",
  },
};

const solutionCategories = [
  "Document Processing",
  "Data Extraction",
  "Handwriting Recognition",
  "OCR Technology",
  "AI Automation",
];

const Solutions = () => {
  // Structured JSON-LD data for SaaS product
  const productSchemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Copywrite OCR",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Document Processing Software",
    operatingSystem: "Web browser",
    offers: {
      "@type": "Offer",
      price: "9.99",
      priceCurrency: "USD",
      priceValidUntil: "2026-03-29",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1245",
    },
    description:
      "AI-powered OCR solution for converting handwritten notes, images and PDFs to editable text with 97% accuracy.",
  };

  return (
    <>
      <HeaderComponent />

      <main>
        <section className="text-center py-20 px-4 bg-gradient-to-r from-[#d4f1f4] to-[#e8f9f9]">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#0b3d4f] mb-4">
              Convert Handwriting to Text with 98% Accuracy
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-6">
              Save time and skip the typing. Our AI-powered OCR technology
              transforms handwritten notes into editable digital text instantly!
            </p>
            <p className="text-md text-gray-600 max-w-2xl mx-auto mb-8">
              Trusted by 50,000+ professionals and businesses worldwide for
              document digitization.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
              <input
                type="text"
                placeholder="Search solutions..."
                className="w-full max-w-md px-5 py-3 border border-gray-300 rounded-full outline-none text-base shadow-sm"
                aria-label="Search for OCR solutions"
              />
              <button className="px-8 py-3 bg-[#2ec4b6] text-white rounded-lg font-medium hover:bg-[#27b3a3] transition duration-300 shadow-md">
                Find Solutions
              </button>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="solution-categories"
          className="py-10 bg-gray-50"
        >
          <div className="max-w-6xl mx-auto px-4">
            <h2
              id="solution-categories"
              className="text-2xl font-bold text-center text-[#0b3d4f] mb-8"
            >
              Explore OCR Solutions By Category
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {solutionCategories.map((category, index) => (
                <a
                  key={index}
                  href={"/"}
                  className="px-6 py-3 bg-white border border-gray-200 rounded-full text-[#0b3d4f] hover:bg-[#e8f9f9] transition duration-300"
                >
                  {category}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section
          aria-labelledby="solutions-grid"
          className="py-16 px-4 bg-white"
        >
          <div className="max-w-6xl mx-auto">
            <h2
              id="solutions-grid"
              className="text-3xl font-bold text-[#0b3d4f] mb-2 text-center"
            >
              AI-Powered OCR Solutions
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Discover how our advanced OCR technology can streamline your
              document processing workflow and boost productivity.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <ArticleCard post={post} key={post.id} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f8fdfd] py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#0b3d4f] mb-6">
              Ready to Convert Your Handwriting to Text?
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Join thousands of professionals who save hours each week by
              digitizing their handwritten notes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://app.copywritee.com/signup"
                className="px-8 py-3 bg-[#2ec4b6] text-white rounded-lg font-medium hover:bg-[#27b3a3] transition duration-300 shadow-md"
              >
                Try For Free
              </a>
              <a
                href="https://app.copywritee.com/upload-image"
                className="px-8 py-3 bg-white text-[#0b3d4f] border border-[#0b3d4f] rounded-lg font-medium hover:bg-gray-50 transition duration-300"
              >
                See Live Demo
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Additional rich snippet data with Next.js Script component */}
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInfaqnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://copywritee.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Solutions",
                item: "https://copywritee.com/solutions",
              },
            ],
          }),
        }}
      />
    </>
  );
};

export default Solutions;
