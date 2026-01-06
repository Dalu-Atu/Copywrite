"use client";
import React from "react";
import { useTranslations } from "next-intl";

const TrustSection = () => {
  const t = useTranslations("Trust");

  return (
    <section className="bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left Side: Context */}
          <div className="w-full md:w-1/3 text-center md:text-left">
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              {t("title")}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              {t("description")}
            </p>
          </div>

          {/* Right Side: Logo Row */}
          <div className="w-full md:w-2/3">
            <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-12 opacity-80">
              <img
                src="/ois-logo.png"
                alt="Partner"
                className="h-10 md:h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500 hover:opacity-100 opacity-50"
              />
              <img
                src="/sapele-logo.png"
                alt="Partner"
                className="h-10 md:h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500 hover:opacity-100 opacity-50"
              />
              <img
                src="/our-saviour.png"
                alt="Partner"
                className="h-10 md:h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500 hover:opacity-100 opacity-50"
              />
              <img
                src="/sim-tech.png"
                alt="Partner"
                className="h-10 md:h-12 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-500 hover:opacity-100 opacity-50"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
