"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, Upload, CheckCircle, Loader2, Star } from "lucide-react";

// Import your existing sections
import FeaturesSection from "./FeatureSection";
import TrustSection from "./TrustSection";
import HowItWorksSection from "./HowItWorks";
import WhySection from "./WhySection";
import TestimonialSection from "./TestimonialSection";
import FAQSection from "./Faq";

const HomePage = () => {
  const t = useTranslations("HomePage");

  return (
    <main className="bg-white selection:bg-[#1b9e99] selection:text-white">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes scan {
          0%, 100% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan { animation: scan 3.5s linear infinite; }
        .hero-mesh {
          background-color: #ffffff;
          background-image: radial-gradient(at 0% 0%, rgba(27, 158, 153, 0.1) 0px, transparent 50%),
                            radial-gradient(at 100% 0%, rgba(57, 248, 242, 0.1) 0px, transparent 50%);
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(-5%); }
          50% { transform: translateY(0); }
        }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
      `,
        }}
      />

      {/* ================= HERO SECTION ================= */}
      <section
        id="home"
        aria-label="Introduction"
        className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden hero-mesh"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* 1. TRUST PILL */}
          <div className="inline-flex items-center gap-2 bg-white border border-[#1b9e99]/20 shadow-[0_2px_10px_rgba(27,158,153,0.1)] text-[#00415a] px-4 py-1.5 rounded-full text-sm font-semibold mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1b9e99] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1b9e99]"></span>
            </span>
            <span>{t("trust_pill")}</span>
          </div>

          {/* 2. HEADLINE */}
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#00415a] mb-6 leading-[1.1]">
            {t("hero_title_1")} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#015979] via-[#1b9e99] to-[#39f8f2]">
              {t("hero_title_2")}
            </span>
          </h1>

          {/* 3. SUBHEADLINE */}
          <p className="text-sm md:text-xl text-slate-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            {t("hero_subtitle")}
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm text-slate-500 font-medium">
            {/* <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-[#1b9e99]" /> {t("check_1")}
            </div> */}
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-[#1b9e99]" /> {t("check_2")}
            </div>
            {/* <div className="flex items-center gap-1">
              <div className="flex text-amber-400">
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
                <Star className="w-3 h-3 fill-current" />
              </div>
              <span className="ml-1">{t("rating_text")}</span>
            </div> */}
          </div>

          {/* 4. CTAs */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <a
              href="https://app.noteocr.com/signup"
              className="group relative overflow-hidden bg-[#1b9e99] text-white rounded-xl px-8 py-4 font-bold text-lg transition-all duration-300 hover:bg-[#158782] hover:shadow-[0_10px_40px_rgba(27,158,153,0.3)] hover:-translate-y-1"
            >
              <span className="relative flex items-center justify-center gap-2">
                {t("cta_start")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>

            <a
              href="https://app.noteocr.com/upload-image"
              className="group relative overflow-hidden bg-white text-[#00415a] border border-slate-200 rounded-xl px-8 py-4 font-bold text-lg transition-all duration-300 hover:border-[#1b9e99]/50 hover:text-[#1b9e99] hover:shadow-lg hover:-translate-y-1"
            >
              <span className="relative flex items-center justify-center gap-2">
                <Upload className="w-5 h-5" />
                {t("cta_upload")}
              </span>
            </a>
          </div>

          {/* 5. HERO VISUAL - RESTORED FULL DESIGN */}
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute -inset-4 bg-gradient-to-r from-[#1b9e99] to-[#39f8f2] rounded-[2rem] opacity-20 blur-2xl"></div>

            <div className="relative bg-[#0F172A] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-700/50 overflow-hidden ring-1 ring-white/10">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-950/50 border-b border-slate-800 backdrop-blur-md">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                </div>
                <div className="flex items-center gap-2 text-[10px] md:text-xs font-mono text-slate-400">
                  <Loader2 className="w-3 h-3 animate-spin text-indigo-400" />
                  <span className="tracking-widest uppercase opacity-70">
                    NoteOCR_Engine_V2.4
                  </span>
                </div>
                <div className="w-12"></div>
              </div>

              <div className="relative w-full aspect-video bg-slate-900 overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/images/noteocr-image002-bg.png"
                  className="w-full h-full object-cover opacity-90 transition-opacity duration-700"
                >
                  <source
                    src="/videos/noteocr-note-to-document.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="hidden md:block absolute -right-6 top-1/4 bg-white/90 backdrop-blur shadow-xl border border-slate-200 p-4 rounded-xl animate-bounce-slow">
              <span className="text-2xl font-bold text-[#00415a]">15s</span>
              <div className="text-xs text-slate-500 font-bold">
                {t("stat_time")}
              </div>
            </div>

            <div
              className="hidden md:block absolute -left-6 bottom-1/4 bg-white/90 backdrop-blur shadow-xl border border-slate-200 p-4 rounded-xl animate-bounce-slow"
              style={{ animationDelay: "1s" }}
            >
              <span className="text-2xl font-bold text-[#1b9e99]">99%</span>
              <div className="text-xs text-slate-500 font-bold">
                {t("stat_accuracy")}
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-16 md:h-24 bg-slate-50"
          style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }}
        ></div>
      </section>

      <FeaturesSection />
      <HowItWorksSection />
      <WhySection />
      <TestimonialSection />
      <FAQSection />
    </main>
  );
};

export default HomePage;
