"use client";
import { useRouter } from "next/navigation";
import { FaCheck } from "react-icons/fa";

import React, { useState } from "react";

const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(false);
  const router = useRouter();

  const plans = [
    // {
    //   title: "Starter Plan",
    //   monthlyPrice: 8,
    //   yearlyPrice: 75,
    //   features: [
    //     "Auto-charge monthly after trial ends (Cancel anytime)",
    //     "High Accuracy (Handwriting to text)",
    //     "Convert up to 100 pages of handwritten notes to documents",
    //     "Upload, create, and edit documents with our editor",
    //     "Continuous uploads of handwritten pages to create a single document",
    //     "Upload and transcribe one handwritten image at a time",
    //     "Save and manage up to 50 documents in the cloud",
    //     "Priority customer support",
    //   ],
    //   recommended: false,
    //   color: "bg-blue-50",
    // },
    {
      title: "Free Plan",
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        "High Accuracy (Handwriting to text)",
        "Convert up to 50 pages of handwritten notes to documents",
        "Upload, create, and edit documents with our editor",

        "Upload and transcribe one handwritten image at a time",
        "Save and manage up to 50 documents in the cloud",
        "Priority customer support",
      ],
      recommended: false,
      color: "bg-blue-50",
    },
    {
      title: "Pro Plan",
      monthlyPrice: 25,
      yearlyPrice: 225,
      features: [
        "Auto-charge monthly after trial ends (Cancel anytime)",
        "All features in the Starter Plan",
        "Convert up to 500 pages",
        "Save up to 200 documents in the cloud",
        "Export in multiple formats (Docx, Xlsx, Pdf, html, odt and many more)",
        "Full workflow automation",
        "Priority customer support",
        "Continuous Conversion (Keep transcribing different image on one documents)",
        "Upload and transcribe four (4) handwritten image at a time",
      ],
      recommended: true,
      color: "bg-indigo-50",
    },
    {
      title: "Enterprise Suite",
      monthlyPrice: 85,
      yearlyPrice: 765,
      features: [
        "Auto-charge monthly after trial ends (Cancel anytime)",
        "All features in the Pro Plan",
        "Convert up to 2,000 pages",
        "Convert between Word, Excel, and PDF",
        "Save up to 1000 documents in the cloud",
        "Document AI Formatter",
        "Batch Upload, convert multiple handwritten pages to documents at once",
        "Continuous Conversion (Convert a whole book)",
      ],
      recommended: false,
      color: "bg-green-50",
    },
  ];

  const calculateSavings = (monthlyPrice, yearlyPrice) => {
    const monthlyCost = monthlyPrice * 12;
    const yearlyCost = yearlyPrice;
    const savingsPercentage = Math.round(
      ((monthlyCost - yearlyCost) / monthlyCost) * 100
    );
    return savingsPercentage || 100;
  };

  return (
    <section id="pricing" className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
            Pricing Plans
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan that fits your document conversion needs.
            Flexible, scalable, and designed to boost your productivity.
          </p>
        </div>

        {/* Yearly/Monthly Toggle */}
        <div className="flex justify-center items-center mb-12">
          <span className="mr-4 text-gray-700 font-semibold">Monthly</span>
          <div
            className="relative inline-block w-14 h-8 bg-gray-200 rounded-full cursor-pointer"
            onClick={() => setIsYearly(!isYearly)}
          >
            <div
              className={`
                absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300
                ${isYearly ? "translate-x-full right-0.99" : "left-1"}
              `}
            ></div>
          </div>
          <span className="ml-4 text-gray-700 font-semibold">
            Yearly
            {isYearly && (
              <span className="ml-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                Save 25%
              </span>
            )}
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className={`
                ${plan.color} 
                rounded-2xl shadow-lg overflow-hidden 
                transform transition-all duration-300 
                hover:scale-105 hover:shadow-xl
                ${plan.recommended ? "border-2 border-[#0280ae]" : ""}
              `}
            >
              {plan.recommended && (
                <div className="bg-[#015979] text-white text-center py-2 font-bold">
                  Most Popular
                </div>
              )}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {plan.title}
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold text-gray-900">
                    ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-gray-600 ml-2">
                    {isYearly ? "/ year" : "/ month"}
                  </span>
                  {isYearly && (
                    <div className="text-green-600 font-semibold mt-2">
                      Save{" "}
                      {calculateSavings(plan.monthlyPrice, plan.yearlyPrice)}%
                    </div>
                  )}
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-gray-700">
                      <svg
                        className="w-5 h-5 text-green-500 mr-2 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() =>
                    router.push("https://app.copywritee.com/signup")
                  }
                  className={`
                    w-full py-3 rounded-lg font-bold transition-all duration-300
                    ${
                      plan.recommended
                        ? "bg-[#015979] text-white hover:bg-[#05678b]"
                        : "bg-white text-[#015979] border-2 border-[#015979] hover:bg-indigo-50"
                    }
                  `}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
