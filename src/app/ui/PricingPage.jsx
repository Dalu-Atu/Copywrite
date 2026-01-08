"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Check,
  X,
  Minus,
  Plus,
  Star,
  Building,
  ArrowRight,
  MessageSquare,
  Mail,
} from "lucide-react";

const PricingPage = () => {
  const t = useTranslations("PricingUI");
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [openFaq, setOpenFaq] = useState(null);

 const plans = [
   {
     name: t("plans.free.name"),
     description: t("plans.free.description"),
     price: { oneTime: 0 },
     pages: t("plans.free.pages"), // "7 pages (one-time)"
     highlight: false,
     buttonText: t("plans.free.buttonText"),
     buttonVariant: "outline",
     features: t.raw("plans.free.features"),
     missing: t.raw("plans.free.missing"),
   },

   {
     name: t("plans.starter.name"),
     description: t("plans.starter.description"),
     price: { oneTime: 8 },
     pages: t("plans.starter.pages"), // "200 pages"
     highlight: false,
     badge: t("plans.starter.badge"),
     buttonText: t("plans.starter.buttonText"),
     buttonVariant: "primary",
     features: t.raw("plans.starter.features"),
     missing: t.raw("plans.starter.missing"),
   },

   {
     name: t("plans.plus.name"),
     description: t("plans.plus.description"),
     price: { oneTime: 15 },
     pages: t("plans.plus.pages"), // "500 pages"
     highlight: false,
     badge: t("plans.plus.badge"),
     buttonText: t("plans.plus.buttonText"),
     buttonVariant: "secondary",
     features: t.raw("plans.plus.features"),
     missing: t.raw("plans.plus.missing"),
     badge: t("plans.plus.badge"),
     highlight: true,
   },

   {
     name: t("plans.pro.name"),
     description: t("plans.pro.description"),
     price: { oneTime: 25 },
     pages: t("plans.pro.pages"), // "1,000 pages"
     buttonText: t("plans.pro.buttonText"),
     buttonVariant: "dark",
     features: t.raw("plans.pro.features"),
     missing: [],
   },
 ];


  const faqs = t.raw("faqs");
  const comparisonRows = t.raw("comparison.rows");

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* --- Header / Hero --- */}
      <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-white">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-emerald-400 opacity-20 blur-[100px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-5">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-6">
            {t("hero.title_start")}
            <span className="text-emerald-600">
              {" "}
              {t("hero.title_highlight")}
            </span>
          </h1>
          <p className="max-w-2xl mx-auto md:text-xl text-slate-600 mb-10 leading-relaxed">
            {t("hero.subtitle")}
          </p>
        </div>
      </section>

      {/* --- Pricing Cards --- */}
      <section className="relative -mt-8 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col p-8 bg-white rounded-3xl transition-all duration-300 ${
                plan.highlight
                  ? "shadow-2xl ring-2 ring-emerald-600 scale-100 md:scale-105 z-10"
                  : "shadow-xl border border-slate-200"
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-4 py-1.5 text-sm font-semibold text-white shadow-sm">
                    <Star className="w-3 h-3 fill-current" /> {plan.badge}
                  </span>
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900">
                  {plan.name}
                </h3>
                <p className="text-sm text-slate-500 mt-2 min-h-[40px]">
                  {plan.description}
                </p>
              </div>
              <div className="mb-6 flex items-baseline text-slate-900">
                <span className="text-5xl font-extrabold tracking-tight">
                  ${plan.price.oneTime}
                </span>{" "}
                <span className="text-gray-400 text-xs font-normal">
                  /one-time
                </span>
              </div>

              <div className="mb-8 p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                <span className="block text-sm font-bold text-slate-700 uppercase tracking-wide">
                  {t("labels.capacity")}
                </span>
                <span className="text-lg font-bold text-emerald-700">
                  {plan.pages}
                </span>
              </div>
              <a
                href="https://app.copywritee.com/signup"
                className={`text-center w-full py-3.5 px-4 rounded-xl text-sm font-semibold transition-all ${
                  plan.buttonVariant === "primary"
                    ? "bg-emerald-600 text-white"
                    : plan.buttonVariant === "dark"
                    ? "bg-slate-900 text-white"
                    : "border-2 border-slate-200 text-slate-700"
                }`}
              >
                {plan.buttonText}
              </a>
              <div className="mt-8 space-y-4 flex-1">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {t("labels.features")}
                </p>
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start">
                    <Check className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                    <p className="ml-3 text-sm text-slate-600 leading-5">
                      {feature}
                    </p>
                  </div>
                ))}
                {plan.missing.map((feature, idx) => (
                  <div key={idx} className="flex items-start opacity-50">
                    <X className="h-5 w-5 text-slate-400 flex-shrink-0" />
                    <p className="ml-3 text-sm text-slate-500 leading-5">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Enterprise Strip */}
        <div className="mt-12 bg-slate-900 rounded-2xl p-8 md:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 transform translate-x-1/3 -translate-y-1/2">
            <Building className="w-64 h-64 text-white" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {t("enterprise.title")}
              </h3>
              <p className="text-slate-300 max-w-xl">{t("enterprise.desc")}</p>
            </div>
            <a
              href="/contact"
              className="whitespace-nowrap bg-white text-slate-900 px-8 py-4 rounded-xl font-bold flex items-center"
            >
              {t("enterprise.cta")} <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">
              {t("comparison.title")}
            </h2>
            <p className="text-slate-500 mt-4">{t("comparison.subtitle")}</p>
          </div>
          <div className="overflow-x-auto border rounded-2xl shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-500">
                <tr>
                  <th className="p-6">{t("comparison.header_feature")}</th>
                  <th className="p-6 text-center text-slate-900">
                    {t("plans.free.name")}
                  </th>
                  <th className="p-6 text-center text-emerald-600">
                    {t("plans.pro.name")}
                  </th>
                  <th className="p-6 text-center text-slate-900">
                    {t("plans.business.name")}
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-600 divide-y divide-slate-100">
                {comparisonRows.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 px-6 font-medium text-slate-700">
                      {row.name}
                    </td>
                    <td className="p-4 text-center">
                      {row.free === "x" ? (
                        <X className="w-4 h-4 mx-auto text-slate-300" />
                      ) : (
                        row.free
                      )}
                    </td>
                    <td className="p-4 text-center bg-emerald-50/30 text-emerald-900 font-medium">
                      {row.pro === "x" ? (
                        <X className="w-4 h-4 mx-auto text-slate-300" />
                      ) : (
                        row.pro
                      )}
                    </td>
                    <td className="p-4 text-center font-medium text-slate-900">
                      {row.bus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            {t("faq_title")}
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full text-left px-6 py-5 flex justify-between items-center"
                >
                  <span className="font-semibold text-slate-800">{faq.q}</span>
                  {openFaq === index ? (
                    <Minus className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <Plus className="w-5 h-5 text-slate-400" />
                  )}
                </button>
                <div
                  className={`px-6 overflow-hidden transition-all duration-300 ${
                    openFaq === index ? "max-h-48 pb-6" : "max-h-0"
                  }`}
                >
                  <p className="text-slate-600">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Support */}
      <section className="bg-white border-t py-16 text-center">
        <h3 className="text-xl font-bold mb-8">{t("support.title")}</h3>
        <div className="flex flex-col md:flex-row justify-center gap-12">
          <div className="flex items-center gap-3">
            <Mail className="w-6 h-6 text-slate-400" />
            <div className="text-left">
              <div className="font-bold">{t("support.email_label")}</div>
              <div className="text-sm">care.copywrite@gmail.com</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MessageSquare className="w-6 h-6 text-slate-400" />
            <div className="text-left">
              <div className="font-bold">{t("support.chat_label")}</div>
              <div className="text-sm">{t("support.chat_time")}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
