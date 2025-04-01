"use client";
import React, { useEffect, useState } from "react";
import HeaderComponent from "./HeaderComponent";
import FeaturesSection from "./FeatureSection";
import {
  ConversionSectionExcel,
  ConversionSectionWord,
} from "./ConversionSection";
import TestimonialSection from "./TestimonialSection";
import PricingSection from "./Pricing";
import Footer from "./Footer";
import FAQSection from "./Faq";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";
import HowItWorksSection from "./HowItWorks";
import BlogSection from "./BlogSection";

const messages = [
  "Upload your paper, convert it to text, and get a professional document ready for download or editing",
  "Experience AI-powered handwriting-to-text conversion with unmatched precision and speed.",
  "From messy notes to polished documents, our tool makes it effortless.",
];

const HomePage = () => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(80);
  const [pauseBeforeDelete, setPauseBeforeDelete] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleTyping = () => {
      const currentMessage = messages[loopIndex % messages.length];

      if (!isDeleting && !pauseBeforeDelete) {
        setText(currentMessage.substring(0, text.length + 1));
        if (text === currentMessage) {
          setPauseBeforeDelete(true);
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else if (isDeleting) {
        setText(currentMessage.substring(0, text.length - 1));
        if (text === "") {
          setIsDeleting(false);
          setLoopIndex(loopIndex + 1);
          setPauseBeforeDelete(false);
          setTypingSpeed(150);
        }
      }
    };

    const typingTimeout = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(typingTimeout);
  }, [text, isDeleting, pauseBeforeDelete, loopIndex, messages, typingSpeed]);

  return (
    <>
      <Head>
        <title>Copywrite | Convert Handwriting to Text instantly</title>
        <meta
          name="description"
          content="Easily convert handwriting into perfectly formatted text documents. Fast, accurate, and effortless conversion."
        />
        <meta
          name="keywords"
          content="handwriting to text, AI converter, digital handwriting, OCR software, handwritten notes to text, image to text, text recognition, handwriting recognition, document scanning, digital note taking, handwriting analysis, convert handwriting to digital text, ai handwriting reader, best handwriting converter, free handwriting to text, online handwriting recognition"
        />
        <meta name="author" content="Copywrite" />

        {/* Open Graph for social media */}
        <meta property="og:title" content="Convert handwriting to text" />
        <meta
          property="og:description"
          content="Convert your handwritten notes into formatted digital documents in seconds."
        />
        <meta property="og:image" content="/images/handwritting-to-text.png" />
        <meta property="og:url" content="https://copywritee.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Convert Handwriting to Text - AI Handwriting Converter"
        />
        <meta
          name="twitter:description"
          content="Effortlessly digitize handwritten notes using AI technology."
        />
        <meta name="twitter:image" content="/images/default.png" />
      </Head>

      <main>
        <div className="absolute top-[35%] left-[85%] w-[10vw] h-[10vw] z-[-1] bg-gradient-to-r from-[#56b4d3] to-[#62e389] blur-[40px] rounded-full md:top-[45%] md:left-[80%] md:w-[15vw] md:h-[15vw]"></div>
        <div className="absolute top-[35%] right-[85%] w-[10vw] h-[10vw] z-[-1] bg-gradient-to-r from-[#62e389] to-[#56b4d3] blur-[40px] rounded-full md:top-[45%] md:right-[80%] md:w-[15vw] md:h-[15vw]"></div>
        <HeaderComponent />
        <section id="home" className="text-center max-w-5xl mx-auto mt-12">
          <h1 className="text-2xl font-bold leading-snug text-[#00415a] sm:text-3xl md:text-4xl px-2">
            Convert Handwriting into Perfectly
            <span className="bg-gradient-to-r from-[#015979] via-[#1b9e99] to-[#39f8f2] bg-clip-text text-transparent font-bold">
              {" "}
              Formatted <br className="hidden sm:inline" /> Documents in Seconds
            </span>
          </h1>
          <p className="text-lg text-gray-600 w-4/5 mx-auto mt-2">{text}</p>
          <p
            style={{
              marginTop: "1rem",
              textAlign: "center",
              color: "#706900",
              fontSize: "large",
              marginLeft: "20px",
              marginRight: "20px",
            }}
          >
            {" "}
            <i>Signup and try out for Free</i>
          </p>
          <div className="flex justify-center gap-4 mt-6 mb-4">
            <button
              onClick={() => router.push("https://app.copywritee.com/signup")}
              className="border-2 border-[#1b9e99] text-[#1b9e99] rounded-md px-6 py-3 transition-all hover:bg-[#015979] hover:text-white"
            >
              Get Started
            </button>
            <button
              onClick={() =>
                router.push("https://app.copywritee.com/upload-image")
              }
              className="bg-[#1b9e99] text-white rounded-md px-6 py-3 transition-all hover:bg-[#015979]"
            >
              Upload Image
            </button>
          </div>

          <div className="relative inline-block w-[95%]">
            <Image
              src="/images/handwritting-to-text.png"
              alt="AI-powered handwriting to text conversion"
              title="AI-powered handwriting to text conversion"
              width={800}
              height={450}
              layout="responsive"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 h-1/5 bg-gradient-to-b from-transparent to-white"></div>
          </div>
        </section>
        <p
          style={{
            textAlign: "center",
            color: "gray",
            marginTop: "1rem",
            position: "relative",
            top: "1rem",
            fontSize: "large",
            marginLeft: "20px",
            marginRight: "20px",
          }}
        >
          {" "}
          ❤️ Loved by +5000 working professionals!
        </p>
        <FeaturesSection />
        <HowItWorksSection />
        <section>
          <ConversionSectionWord />
          <ConversionSectionExcel />
        </section>
        <TestimonialSection />
        <PricingSection />
        <FAQSection />
        <BlogSection />
        <Footer />
      </main>
    </>
  );
};

export default HomePage;
