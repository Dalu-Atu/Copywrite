"use client";
import React from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";
import HeaderComponent from "../ui/HeaderComponent";
import { blogPosts } from "../lib/posts";
import Footer from "../ui/Footer";

const Solutions = () => {
  const router = useRouter();
  const { asPath } = router;

  const handlePostClick = (slug) => {
    router.push(`/solutions/${slug}`);
  };

  return (
    <>
      <Head>
        <title>
          Convert Handwriting to Text Instantly – AI-Powered OCR | Copywrit+
        </title>
        <meta
          name="description"
          content="Transform your handwritten notes into editable, digital text in seconds with Copywrit+ AI OCR technology. Accurate, fast, and free handwriting recognition."
        />
        <meta
          name="keywords"
          content="convert handwriting to text, AI OCR tool, best handwriting converter, text recognition software, digital notes, scan handwriting to text, OCR AI"
        />
        {/* Open Graph */}
        <meta
          property="og:title"
          content="Convert Handwriting to Text Instantly – AI-Powered OCR | Copywrit+"
        />
        <meta
          property="og:description"
          content="Tired of messy notes? Convert handwriting into clear, editable text in seconds! Try Copywrit+ AI OCR – Fast, Accurate & Free."
        />
        <meta
          property="og:image"
          content="https://copywritee.com/images/as1.jpeg"
        />
        <meta property="og:url" content="https://copywritee.com/solutions" />
        <meta property="og:type" content="website" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Convert Handwriting to Text Instantly – AI-Powered OCR | Copywrit+"
        />
        <meta
          name="twitter:description"
          content="Tired of messy notes? Convert handwriting into clear, editable text in seconds! Try Copywrit+ AI OCR – Fast, Accurate & Free."
        />
        <meta
          name="twitter:image"
          content="https://copywritee.com/images/as1.jpeg"
        />
        {/* Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Convert Handwriting to Text Instantly – AI-Powered OCR | Copywrit+",
            description:
              "Convert messy handwritten notes into clear, editable text in seconds with Copywrit+ AI OCR technology.",
            url: "https://copywritee.com/solutions",
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://copywritee.com/",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Solutions",
                  item: "https://copywritee.com/solutions",
                },
              ],
            },
            image: "https://copywritee.com/images/as1.jpeg",
          })}
        </script>
      </Head>

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
          <article
            key={post.id}
            onClick={() => handlePostClick(post.slug)}
            className="rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative w-full h-56">
              <Image
                src={post.imageUrl}
                alt={post.title}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
                priority
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-[#062530] mb-2">
                {post.title}
              </h2>
              <p className="text-gray-600 text-sm mb-4">{post.description}</p>
              <div className="flex items-center justify-between">
                <time className="text-gray-500 text-xs">
                  {new Date(post.date).toLocaleDateString()}
                </time>
                <span className="text-[#2ec4b6] font-semibold text-sm">
                  Read More
                </span>
              </div>
            </div>
          </article>
        ))}
      </section>
      <Footer />
    </>
  );
};

export default Solutions;
