import React from "react";
import Head from "next/head";
import HeaderComponent from "../ui/HeaderComponent";
import { blogPosts } from "../lib/posts";
import Footer from "../ui/Footer";
import ArticleCard from "../ui/ArticleCard";

export const metadata = {
  title: "Copywrite+ | Convert Handwriting to Text",
  description:
    "Save time and skip the typing. convert handwriting to text or document instantly!",
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
    title: "Convert Handwriting to Text",
    description:
      "Save time and skip the typing. convert handwriting to document instantly!",
    url: "https://copywritee.com",
    siteName: "Copywrite+",
    images: [
      {
        url: "/default.png",
        width: 800,
        height: 450,
        alt: "Handwriting to text conversion",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Copywrite+ Convert Handwriting to Text",
    description: "Effortlessly digitize handwritten notes using AI technology.",
    images: ["/images/default.png"],
  },
};

const Solutions = () => {
  return (
    <>
      <HeaderComponent />
      <section className="text-center py-20 px-4 bg-gradient-to-r from-[#d4f1f4] to-[#e8f9f9]">
        <h1 className="text-4xl font-extrabold text-[#0b3d4f] mb-4">
          Explore The Most Powerful AI Solutions
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Unlock AI’s potential for productivity, document editing, and workflow
          automation.
        </p>
        <div className="mt-10 flex justify-center items-center gap-4">
          <input
            type="text"
            placeholder="Search solutions..."
            className="w-full max-w-md px-5 py-3 border border-gray-300 rounded-full outline-none text-base shadow-sm"
          />
          <button className="px-10 py-3 bg-[#2ec4b6] text-white rounded-full text-base font-semibold hover:bg-[#27b3a3] shadow-md">
            Search
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-10 bg-white">
        {blogPosts.map((post) => (
          <ArticleCard post={post} key={post.id} />
        ))}
      </section>
      <Footer />
    </>
  );
};

export default Solutions;
