"use client";
import { useState, useEffect, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

// List of all keys matching the JSON structure above
const faqKeys = [
  "what_is",
  "who_benefit",
  "how_work",
  "accuracy",
  "cursive",
  "formats",
  "how_to_word",
  "limits",
  "math",
  "phone_scan",
  "quality",
  "history",
  "low_accuracy",
  "pdf_edit",
  "cloud_save",
  "sharing",
  "storage_limit",
  "languages",
  "messy_writing",
  "security",
  "install",
  "offline",
  "batch",
  "is_free",
  "pricing_diff",
  "cancel",
  "why_manual",
  "diff_others",
  "digitize_free",
];

export default function FAQSection() {
  const t = useTranslations("FAQ");
  const [openIndex, setOpenIndex] = useState(null);

  // Generate localized JSON-LD for Google Search Results
  const faqSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqKeys.map((key) => ({
        "@type": "Question",
        name: t(`items.${key}.q`),
        acceptedAnswer: {
          "@type": "Answer",
          text: t(`items.${key}.a`),
        },
      })),
    };
  }, [t]);

  // Inject JSON-LD Schema into <head>
  useEffect(() => {
    const existingScript = document.querySelector('script[data-json-ld="faq"]');
    if (existingScript) existingScript.remove();

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-json-ld", "faq");
    script.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.querySelector(
        'script[data-json-ld="faq"]'
      );
      if (scriptToRemove) scriptToRemove.remove();
    };
  }, [faqSchema]);

  return (
    <section id="faq" className="bg-white py-24 px-6 border-t border-gray-100">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight">
            {t("title_main")}{" "}
            <span className="text-teal-600">{t("title_highlight")}</span>
          </h2>
        </div>

        {/* FAQ List */}
        <div className="grid gap-4">
          {faqKeys.map((key, i) => (
            <motion.div
              key={key}
              className="border border-slate-200 rounded-2xl overflow-hidden bg-white hover:border-teal-200 transition-colors shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.02 }}
            >
              <button
                className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span className="text-base md:text-lg font-bold text-slate-800 pr-4">
                  {t(`items.${key}.q`)}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "circOut" }}
                >
                  <ChevronDown
                    className={`h-5 w-5 ${
                      openIndex === i ? "text-teal-600" : "text-slate-400"
                    }`}
                  />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.04, 0.62, 0.23, 0.98],
                    }}
                  >
                    <div className="px-6 pb-6 text-slate-600 leading-relaxed text-sm md:text-base border-t border-slate-50 pt-4">
                      {t(`items.${key}.a`)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
