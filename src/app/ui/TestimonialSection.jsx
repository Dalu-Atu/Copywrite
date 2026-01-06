"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Star, Quote, CheckCircle2 } from "lucide-react";

const TestimonialSection = () => {
  const t = useTranslations("Testimonials");

  const testimonials = [
    {
      name: "Erewa Victor",
      initials: "EV",
      color: "bg-blue-100 text-blue-700",
      key: "ev",
    },
    {
      name: "Aya Britany",
      initials: "AB",
      color: "bg-teal-100 text-teal-700",
      key: "ab",
    },
    {
      name: "Gbenedion Cathier",
      initials: "GC",
      color: "bg-purple-100 text-purple-700",
      key: "gc",
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-24 bg-white relative overflow-hidden"
    >
      {/* Background Texture */}
      <div className="absolute inset-0 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="h-px w-8 bg-slate-300"></span>
            <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">
              {t("label")}
            </span>
            <span className="h-px w-8 bg-slate-300"></span>
          </div>
        </div>

        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
            {t("title_main")}{" "}
            <span className="text-teal-600">{t("title_highlight")}</span>
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((item) => (
            <div
              key={item.key}
              className="group flex flex-col justify-between bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/40 hover:-translate-y-1 transition-all duration-300 relative"
            >
              <div className="absolute top-6 right-8 text-slate-100 group-hover:text-teal-50 transition-colors duration-300">
                <Quote className="w-12 h-12 fill-current" />
              </div>

              <div className="relative z-10">
                <div className="flex gap-0.5 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-amber-400 fill-amber-400"
                    />
                  ))}
                </div>
                <blockquote className="text-slate-700 leading-relaxed mb-8 italic">
                  "{t(`items.${item.key}.quote`)}"
                </blockquote>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-slate-50 mt-auto">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${item.color}`}
                >
                  {item.initials}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 text-sm">
                      {item.name}
                    </h4>
                    <CheckCircle2 className="w-3 h-3 text-teal-500" />
                  </div>
                  <p className="text-xs text-slate-500">
                    {t(`items.${item.key}.role`)},{" "}
                    {t(`items.${item.key}.company`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm font-medium text-slate-400">
            {t("trust_footer")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
