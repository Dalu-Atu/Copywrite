"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";

const PricingSection = () => {
  const router = useRouter();
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      title: "Starter Plan",
      monthlyPrice: "$8 / month",
      yearlyPrice: "$75 /year (25% off)",
      features: [
        "Auto-charge monthly after trial ends (Cancel anytime)",
        "High Accuracy (Handwriting to text)",
        "Convert up to 100 pages of handwritten notes to documents",
        "Upload, create, and edit documents with our editor",
        "continuous uploads of handwritten pages to create a single document",
        "Upload and transcribe one handwritten image at a time",
        "Save and manage up to 50 documents in the cloud",
        "Priority customer support",
      ],
    },
    {
      title: "Pro Plan",
      monthlyPrice: "$25 / month",
      yearlyPrice: " $225 /year (25% off)",
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
    },
    {
      title: "Enterprise Suite",
      monthlyPrice: "$85 / month",
      yearlyPrice: "$765/year (25% off)",
      features: [
        "Auto-charge monthly after trial ends (Cancel anytime)",
        "All features in the Pro Plan",
        "Convert up to 2,000 pages",
        "Convert between Word, Excel, and PDF",
        "Save up to 1000 documents in the cloud",
        "Document AI Formatter",
        "Batch Upload, convert multiple handwritten pages to  documents at once",
        "Continuous Conversion (Convert a whole book)",
      ],
    },
  ];

  return (
    <section id="pricing" className="text-center py-12 px-5 bg-gray-100">
      <h2 className="text-2xl font-bold leading-snug text-[#00415a] sm:text-3xl md:text-4xl px-2">
        Flexible Plans for Every Need
      </h2>
      <div className="flex justify-center items-center gap-2.5 mt-5">
        <button
          className={`px-5 py-2 rounded-md text-base transition-colors ${
            !isYearly
              ? "bg-[#00415a] text-white hover:bg-[#00415a]"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
          onClick={() => setIsYearly(false)}
        >
          Monthly
        </button>
        <button
          className={`px-5 py-2 rounded-md text-base transition-colors ${
            isYearly
              ? "bg-[#00415a] text-white hover:bg-[#18779d]"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
          onClick={() => setIsYearly(true)}
        >
          Yearly (Save 25%)
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-5 max-w-[1300px] mx-auto mt-5">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl p-5 w-full max-w-[350px] shadow-lg text-left transition-transform hover:translate-y-[-5px]"
          >
            <h3 className="text-2xl text-[#00415a] text-center">
              {plan.title}
            </h3>
            <h4 className="text-base text-[#00415a] text-center mt-2.5">
              <strong>{isYearly ? plan.yearlyPrice : plan.monthlyPrice}</strong>
            </h4>
            <i
              style={{ fontSize: "15px", marginTop: "10px", color: "#706900" }}
            >
              {" "}
              2-Day Free Trial → Includes 10 pages free
            </i>
            <ul className="list-none p-0 mt-2.5">
              {plan.features.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-center text-base text-[#00415a] mt-3"
                >
                  <div className="flex justify-center items-center min-w-[20px] h-5 rounded-full bg-teal-500 text-white text-xs mr-2.5">
                    <FaCheck size={12} />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className="block w-full py-3 bg-[#00415a] text-white rounded-md text-base cursor-pointer text-center mt-3.5 transition-colors hover:bg-blue-800"
              onClick={() => router.push("/signup")}
            >
              Get started
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
