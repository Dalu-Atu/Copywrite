"use client";

import React, { useState } from "react";
import {
  Upload,
  CheckCircle2,
  Clock,
  FileSpreadsheet,
  ArrowRight,
  Star,
  Send,
  ChevronDown,
} from "lucide-react";

// ─── Drop this section into your PricingPage.jsx, right after the PRICING CARDS section ───

const CONCIERGE_PLANS = [
  {
    name: "Starter",
    pages: "Up to 50 pages",
    price: 19,
    turnaround: "24 hours",
    badge: null,
  },
  {
    name: "Project",
    pages: "Up to 200 pages",
    price: 59,
    turnaround: "48 hours",
    badge: "Most Popular",
  },
  {
    name: "Archive",
    pages: "Up to 500 pages",
    price: 130,
    turnaround: "4 business days",
    badge: null,
  },
];

const STEPS = [
  {
    icon: Upload,
    label: "You upload",
    desc: "Send us your photos, scans, or PDFs — any quality.",
  },
  {
    icon: FileSpreadsheet,
    label: "We convert",
    desc: "Our team converts them to a perfect editable document.",
  },
  {
    icon: CheckCircle2,
    label: "You receive",
    desc: "A clean, formatted Word or Excel file lands in your inbox.",
  },
];

export function ConciergeSection() {
  const [selected, setSelected] = useState(1); // default to "Project"

  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      {/* ── Header ── */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[11px] font-bold uppercase tracking-widest mb-6">
          <Star className="w-3 h-3 fill-amber-400" />
          New · Done-For-You Service
        </div>
        <h2 className="text-2xl md:text-4xl font-bold mb-4 text-white">
          Not a tech person?{" "}
          <span className="text-amber-400">We'll handle it.</span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
          Upload your handwritten notes or logs and walk away. Our team
          converts, verifies, and delivers a clean Word/Excel file — you don't
          touch a single setting.
        </p>
      </div>

      {/* ── How it works ── */}
      <div className="grid md:grid-cols-3 gap-4 mb-16 relative">
        {/* connector line */}
        <div className="hidden md:block absolute top-8 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

        {STEPS.map((step, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center p-6 rounded-xl bg-white/[0.02] border border-white/8 hover:border-amber-500/20 transition-colors group"
          >
            <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors relative z-10">
              <step.icon className="w-6 h-6 text-amber-400" />
            </div>
            <div className="text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-1">
              Step {i + 1}
            </div>
            <h3 className="text-white font-semibold mb-2">{step.label}</h3>
            <p className="text-gray-500 text-sm leading-snug">{step.desc}</p>
          </div>
        ))}
      </div>

      {/* ── Plan Selector ── */}
      <div className="max-w-3xl mx-auto">
        <p className="text-center text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-6">
          Choose your project size
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {CONCIERGE_PLANS.map((plan, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`relative flex flex-col p-5 rounded-xl text-left border transition-all duration-200 ${
                selected === i
                  ? "border-amber-500/60 bg-amber-500/5 shadow-lg shadow-amber-500/5"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-2.5 left-4 bg-amber-500 text-black text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                  {plan.badge}
                </span>
              )}

              {/* selection indicator */}
              <div
                className={`w-4 h-4 rounded-full border-2 mb-4 transition-colors ${
                  selected === i
                    ? "border-amber-400 bg-amber-400"
                    : "border-white/20 bg-transparent"
                }`}
              />

              <div className="text-white font-bold text-base mb-0.5">
                {plan.name}
              </div>
              <div className="text-gray-500 text-xs mb-4">{plan.pages}</div>

              <div className="mt-auto">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-2xl font-extrabold text-white">
                    ${plan.price}
                  </span>
                  <span className="text-gray-500 text-xs">one-time</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-gray-500">
                  <Clock className="w-3 h-3" />
                  Delivered within {plan.turnaround}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* ── What's included ── */}
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 mb-6">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">
            Every concierge order includes
          </p>
          <div className="grid grid-cols-2 gap-x-8 gap-y-3">
            {[
              "Accurate handwriting to text",
              "Row-by-row accuracy check",
              "Manual human verification",
              "Excel (.xlsx) delivery",
              "One free revision round",
              "Word (.docx) delivery",
              "Any scan quality accepted",
              "Email status updates",
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="text-sm text-gray-400">{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <a
          href={`mailto:support@noteocr.com?subject=Concierge%20Request%20–%20${encodeURIComponent(
            CONCIERGE_PLANS[selected].name
          )}&body=Hi%2C%20I%E2%80%99d%20like%20to%20order%20the%20${encodeURIComponent(
            CONCIERGE_PLANS[selected].name
          )}%20concierge%20plan%20(%24${
            CONCIERGE_PLANS[selected].price
          }).%0A%0ANumber%20of%20pages%3A%20%0AFile%20format%3A%20%0ASpecial%20instructions%3A`}
          className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-colors shadow-lg shadow-amber-500/20"
        >
          <Send className="w-4 h-4" />
          Order {CONCIERGE_PLANS[selected].name} Concierge — $
          {CONCIERGE_PLANS[selected].price}
          <ArrowRight className="w-4 h-4" />
        </a>

        <p className="text-center text-[11px] text-gray-600 mt-4">
          Need 500+ pages?{" "}
          <a
            href="mailto:support@noteocr.com?subject=Bulk%20Concierge%20Quote"
            className="text-amber-500 hover:underline"
          >
            Contact us for a volume quote →
          </a>
        </p>
      </div>
    </section>
  );
}

// ─── PREVIEW (remove this export default in production, use the named export above) ───
export default function Preview() {
  return (
    <div className="min-h-screen bg-[#000] text-white font-sans">
      <ConciergeSection />
    </div>
  );
}
