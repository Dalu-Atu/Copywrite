"use client";
import { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const faqs = [
  {
    question: "What file formats do you support?",
    answer:
      "We support JPG, PNG, PDF, and handwritten images for OCR conversion. Future updates may include more formats.",
  },
  {
    question: "How accurate is the OCR technology?",
    answer:
      "Our AI-powered OCR achieves over 97% accuracy and supports multiple handwriting styles.",
  },
  {
    question: "Do I need to install any software?",
    answer:
      "No, CopyWrite+ is 100% web-based and runs directly in your browser—no installation required.",
  },
  {
    question: "Can I edit the extracted text?",
    answer:
      "Yes! Our built-in editor allows you to refine, format, and export extracted text. Your documents are automatically saved in the cloud.",
  },
  {
    question: "Can you transcribe handwritten tables?",
    answer:
      "Yes! We accurately recognize handwritten tables and convert them into structured formats like MS Excel.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use end-to-end encryption, and files are not stored on our servers after processing.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-2xl mx-auto my-12 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-center text-2xl font-bold text-teal-700 mb-6">
        Frequently Asked Questions (FAQs) About OCR & Text Extraction
      </h2>
      <div
        className="space-y-4"
        itemscope
        itemtype="https://schema.org/FAQPage"
      >
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md cursor-pointer transition-transform transform hover:scale-105"
            onClick={() => toggleFAQ(index)}
            itemscope
            itemprop="mainEntity"
            itemtype="https://schema.org/Question"
          >
            <div className="flex justify-between items-center text-lg font-semibold">
              <span itemprop="name">{faq.question}</span>
              {openIndex === index ? <FaArrowUp /> : <FaArrowDown />}
            </div>
            <p
              className={`mt-2 text-gray-600 text-sm overflow-hidden transition-all duration-300 ${
                openIndex === index
                  ? "max-h-40 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
              itemscope
              itemprop="acceptedAnswer"
              itemtype="https://schema.org/Answer"
            >
              <span itemprop="text">{faq.answer}</span>
            </p>
          </div>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(faqs)),
        }}
      />
    </section>
  );
};

export default FAQSection;

const generateFAQSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});
