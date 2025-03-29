"use client";
import { useState, useEffect, useRef } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
// utils/analytics.js

/**
 * Simple analytics utility for tracking user interactions with the FAQ section
 * This can be integrated with popular analytics tools like Google Analytics,
 * Mixpanel, Amplitude, or a custom analytics solution
 */

// Configuration - replace with your actual analytics settings
const ANALYTICS_CONFIG = {
  enableConsoleLogging: true, // For development debugging
  sendToServer: true, // Set to true to send events to your backend
  apiEndpoint: "/api/analytics", // Your backend analytics endpoint
  sessionId: generateSessionId(),
  appVersion: "1.0.0",
};

/**
 * Generate a unique session ID
 * @returns {string} A unique session identifier
 */
function generateSessionId() {
  return (
    "session_" +
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

/**
 * Track a user event
 * @param {string} eventName - Name of the event to track
 * @param {Object} properties - Additional properties to include with the event
 */
export function trackEvent(eventName, properties = {}) {
  if (!eventName) {
    console.error("Event name is required for tracking");
    return;
  }

  const eventData = {
    event: eventName,
    timestamp: new Date().toISOString(),
    sessionId: ANALYTICS_CONFIG.sessionId,
    location: typeof window !== "undefined" ? window.location.href : "",
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
    appVersion: ANALYTICS_CONFIG.appVersion,
    ...properties,
  };

  // Log to console in development
  if (ANALYTICS_CONFIG.enableConsoleLogging) {
    console.log("📊 Analytics Event:", eventData);
  }

  // Send to server if enabled
  if (ANALYTICS_CONFIG.sendToServer) {
    sendToAnalyticsServer(eventData);
  }

  // If using Google Analytics
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, properties);
  }
}

/**
 * Send analytics data to the server
 * @param {Object} data - The event data to send
 */
async function sendToAnalyticsServer(data) {
  try {
    // Only run on client side
    if (typeof window === "undefined") return;

    const response = await fetch(ANALYTICS_CONFIG.apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      // Don't block the UI for analytics
      keepalive: true,
    });

    if (!response.ok) {
      console.error("Failed to send analytics data:", response.statusText);
    }
  } catch (error) {
    console.error("Error sending analytics data:", error);
  }
}

/**
 * Initialize analytics with custom settings
 * @param {Object} config - Custom configuration options
 */
export function initAnalytics(config = {}) {
  Object.assign(ANALYTICS_CONFIG, config);

  // Track page view on initialization
  trackEvent("page_view", {
    page: typeof window !== "undefined" ? window.location.pathname : "",
    referrer: typeof document !== "undefined" ? document.referrer : "",
  });

  // Listen for visibility changes to track engagement time
  if (typeof document !== "undefined") {
    let startTime = Date.now();

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        trackEvent("page_exit", { timeSpentSeconds: timeSpent });
      } else {
        startTime = Date.now();
        trackEvent("page_return");
      }
    });
  }

  console.log("Analytics initialized successfully");
  return ANALYTICS_CONFIG;
}

/**
 * Track specific FAQ-related events
 */
export const FAQAnalytics = {
  trackSearch: (query, resultCount) => {
    trackEvent("faq_search", { query, resultCount });
  },

  trackFAQOpen: (questionId, questionText) => {
    trackEvent("faq_opened", { questionId, questionText });
  },

  trackFAQClose: (questionId, timeOpenMs) => {
    trackEvent("faq_closed", { questionId, timeOpenMs });
  },

  trackSupport: (fromFaqId) => {
    trackEvent("support_request", { fromFaqId });
  },
};

const faqs = [
  {
    question: "What file formats does CopyWrite support for OCR conversion?",
    answer:
      "CopyWrite supports a wide range of formats including JPG, PNG, and handwritten images for high-quality OCR conversion. Our technology works with both digital and analog documents, ensuring versatility for all your text extraction needs. Future updates may include TIFF, WebP, and multi-page document support.",
    tags: ["formats", "conversion", "file types", "documents", "ocr"],
  },
  {
    question:
      "How accurate is CopyWrite's OCR technology for handwritten text?",
    answer:
      "Our AI-powered OCR technology achieves over 99% accuracy for typed text and 98% for handwritten content. The system supports multiple handwriting styles and continuously improves through machine learning. For best results, ensure documents are well-lit and clearly written. Our technology excels even with cursive writing and various pen types.",
    tags: ["accuracy", "handwriting", "AI", "machine learning", "cursive"],
  },
  {
    question:
      "Do I need to install any software to use CopyWrite OCR services?",
    answer:
      "No, CopyWrite is 100% web-based and runs directly in your browser—no installation required. Our cloud-based solution works on all modern browsers including Chrome, Firefox, Safari, and Edge, and is fully responsive across desktop, tablet, and mobile devices. This zero-installation approach means you can start converting handwriting to text documents instantly.",
    tags: ["installation", "browser", "cloud", "compatibility"],
  },
  {
    question: "Can I edit and format the extracted text after OCR conversion?",
    answer:
      "Yes! CopyWrite includes a comprehensive built-in editor that allows you to refine, format, and export extracted text in multiple formats (DOCX, TXT, PDF). Your documents are automatically saved in the cloud. The editor includes spell-check, formatting tools, and collaboration features.",
    tags: ["editing", "formatting", "export", "cloud storage"],
  },
  {
    question:
      "Does CopyWrite accurately transcribe handwritten tables and structured data?",
    answer:
      "Yes! CopyWrite excels at recognizing handwritten tables and converts them into structured formats like MS Excel, Google Sheets, or CSV files. Our AI can identify column and row structures even in complex layouts and maintains formatting integrity. This is particularly useful for financial documents, research notes, and data collection forms.",
    tags: ["tables", "excel", "structured data", "spreadsheets"],
  },
  {
    question:
      "How does CopyWrite ensure my data remains secure during OCR processing?",
    answer:
      "Your security is our priority. CopyWrite uses end-to-end 256-bit encryption, and files are automatically deleted from our servers immediately after processing unless you choose to save them to your account. We're GDPR and CCPA compliant, never share your data with third parties, and offer enterprise-grade security features for business users. Our servers are SOC 2 certified for maximum data protection.",
    tags: [
      "security",
      "encryption",
      "privacy",
      "data protection",
      "compliance",
    ],
  },
  {
    question: "What languages does CopyWrite's OCR technology support?",
    answer:
      "CopyWrite supports over 100 languages for OCR processing, including all major European languages, Asian languages like Chinese, Japanese, and Korean, as well as right-to-left scripts such as Arabic and Hebrew. Our multilingual capabilities make CopyWrite the perfect solution for international businesses and researchers working with documents in various languages.",
    tags: ["languages", "international", "multilingual", "translation"],
  },
  // {
  //   question: "What pricing plans does CopyWrite offer for OCR services?",
  //   answer:
  //     "CopyWrite offers flexible pricing to meet diverse needs. Our Free plan includes 50 pages per month with basic editing. The Professional plan ($9.99/month) offers 500 pages with advanced editing and priority processing. The Business plan ($24.99/month) includes unlimited pages, team collaboration, and API access. Enterprise solutions with custom features are available for large organizations. All paid plans come with a 14-day free trial.",
  //   tags: ["pricing", "plans", "subscription", "features"],
  // },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFaqs, setFilteredFaqs] = useState(faqs);
  const faqRefs = useRef([]);

  useEffect(() => {
    // Initialize refs
    faqRefs.current = faqRefs.current.slice(0, filteredFaqs.length);

    // Track page view for analytics
    trackEvent("faq_section_viewed", {
      page: window.location.pathname,
      timestamp: new Date().toISOString(),
    });

    // Add schema to head if not present
    if (!document.querySelector("script[data-faq-schema]")) {
      const script = document.createElement("script");
      script.setAttribute("type", "application/ld+json");
      script.setAttribute("data-faq-schema", "true");
      script.textContent = JSON.stringify(generateFAQSchema(faqs));
      document.head.appendChild(script);
    }

    // Highlight FAQ from URL hash if present
    const hash = window.location.hash;
    if (hash) {
      const faqIndex = parseInt(hash.replace("#faq-", ""));
      if (!isNaN(faqIndex) && faqIndex >= 0 && faqIndex < faqs.length) {
        setTimeout(() => {
          setOpenIndex(faqIndex);
          faqRefs.current[faqIndex]?.scrollIntoView({ behavior: "smooth" });
        }, 500);
      }
    }
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredFaqs(faqs);
    } else {
      const term = searchTerm.toLowerCase();
      setFilteredFaqs(
        faqs.filter(
          (faq) =>
            faq.question.toLowerCase().includes(term) ||
            faq.answer.toLowerCase().includes(term) ||
            faq.tags.some((tag) => tag.toLowerCase().includes(term))
        )
      );
    }
  }, [searchTerm]);

  const toggleFAQ = (index) => {
    // Track user interaction
    trackEvent("faq_toggled", {
      question: filteredFaqs[index].question,
      action: openIndex === index ? "closed" : "opened",
    });

    // Update URL with hash for shareable links
    if (openIndex !== index) {
      const originalIndex = faqs.findIndex(
        (faq) => faq.question === filteredFaqs[index].question
      );
      window.history.replaceState(null, null, `#faq-${originalIndex}`);
    }

    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faqs"
      className="max-w-3xl mx-auto my-16 p-8 bg-white rounded-xl shadow-xl"
      aria-labelledby="faq-heading"
    >
      <h2
        id="faq-heading"
        className="text-center text-3xl font-bold text-teal-700 mb-8"
      >
        Frequently Asked Questions About OCR & Text Extraction
      </h2>

      <div className="mb-6 relative">
        <input
          type="search"
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-teal-500"
          aria-label="Search frequently asked questions"
        />
        <svg
          className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {filteredFaqs.length === 0 ? (
        <p className="text-center py-8 text-gray-600">
          No FAQs match your search. Try different keywords or{" "}
          <button
            onClick={() => setSearchTerm("")}
            className="text-teal-600 underline focus:outline-none"
          >
            view all FAQs
          </button>
          .
        </p>
      ) : (
        <div
          className="space-y-4"
          itemScope
          itemType="https://schema.org/FAQPage"
        >
          {filteredFaqs.map((faq, index) => (
            <div
              key={index}
              ref={(el) => (faqRefs.current[index] = el)}
              className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3
                  className="text-lg font-semibold text-gray-800"
                  itemProp="name"
                >
                  {faq.question}
                </h3>
                <span className="text-teal-600 flex-shrink-0 ml-4">
                  {openIndex === index ? (
                    <FaArrowUp aria-hidden="true" />
                  ) : (
                    <FaArrowDown aria-hidden="true" />
                  )}
                </span>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    id={`faq-answer-${index}`}
                    className="px-6 pb-4"
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <div
                      itemScope
                      itemProp="acceptedAnswer"
                      itemType="https://schema.org/Answer"
                    >
                      <p className="text-gray-700" itemProp="text">
                        {faq.answer}
                      </p>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {faq.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="inline-block bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <p className="text-gray-700 mb-4">
          Still have questions? We're here to help!
        </p>
        <a
          href="/contact"
          className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
        >
          Contact Our Support Team
        </a>
      </div>
    </section>
  );
};

export default FAQSection;

const generateFAQSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs
    .filter((faq) => faq.question && faq.answer) // Ensure both fields exist
    .map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer.trim(),
      },
    })),
});
