"use client";

import { useState } from "react";
import { useTranslations } from "next-intl"; // Added for localization
import {
  Mail,
  MapPin,
  ArrowRight,
  MessageSquare,
  CheckCircle2,
  Loader2,
  Globe,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";

export default function ContactPage() {
  const t = useTranslations("ContactPage"); // Hook to access JSON keys

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const subject = encodeURIComponent(
      `Inquiry from ${formData.firstName} ${formData.lastName} - NoteOCR Support`
    );
    const body = encodeURIComponent(
      `Name: ${formData.firstName} ${formData.lastName}\n` +
        `Email: ${formData.email}\n` +
        `Company: ${formData.company || "N/A"}\n\n` +
        `Message:\n${formData.message}`
    );

    const mailtoLink = `mailto:care.copywrite@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      window.location.href = mailtoLink;
      setStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        message: "",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFB] font-sans text-slate-900 selection:bg-[#1b9e99]/20">
      {/* HERO SECTION */}
      <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1b9e990a_1px,transparent_1px),linear-gradient(to_bottom,#1b9e990a_1px,transparent_1px)] bg-[size:32px_32px]"></div>
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-gradient-to-b from-[#1b9e9915] to-transparent blur-[120px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 text-center z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1b9e99] mb-8 shadow-sm ring-4 ring-[#1b9e99]/5">
            {t("hero.badge")}
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[#00415a] mb-6">
            {t("hero.title_start")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1b9e99] to-[#39f8f2]">
              {t("hero.title_highlight")}
            </span>
          </h1>

          <p className="max-w-2xl mx-auto md:text-lg text-slate-500 mb-10 leading-relaxed font-medium">
            {t("hero.subtitle")}
          </p>
        </div>
      </section>

      {/* MAIN CONTENT GRID */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 pb-32 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* LEFT COLUMN: Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[2rem] border border-slate-200/60 shadow-[0_20px_50px_rgba(0,0,0,0.04)] p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[100px] -z-10"></div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                      {t("form.first_name")}
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      placeholder="Jane"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-[#1b9e99]/10 focus:border-[#1b9e99] transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                      {t("form.last_name")}
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-[#1b9e99]/10 focus:border-[#1b9e99] transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                    {t("form.email")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="jane@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-[#1b9e99]/10 focus:border-[#1b9e99] transition-all outline-none"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                    {t("form.needs")}
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    placeholder={t("form.placeholder_msg")}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-4 focus:ring-[#1b9e99]/10 focus:border-[#1b9e99] transition-all outline-none resize-none"
                  />
                </div>

                {status === "success" && (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span className="text-emerald-700 font-bold text-sm">
                      {t("form.success")}
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full inline-flex items-center justify-center gap-3 bg-[#00415a] hover:bg-[#002f41] text-white px-10 py-5 rounded-xl font-bold transition-all transform active:scale-[0.98] shadow-xl shadow-[#00415a]/20 group"
                >
                  {status === "loading" ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      {t("form.submit_btn")}
                      <ExternalLink className="w-4 h-4 opacity-50 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT COLUMN: Sidebar */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#00415a] rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#1b9e99] opacity-10 blur-[80px] -mr-32 -mt-32"></div>

              <div className="relative z-10">
                <div className="inline-flex p-3 rounded-2xl bg-white/10 border border-white/20 mb-8">
                  <MapPin className="w-6 h-6 text-[#39f8f2]" />
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  {t("sidebar.hq_title")}
                </h3>
                <p className="text-slate-300 leading-relaxed mb-8 font-medium whitespace-pre-line">
                  {t("sidebar.hq_address")}
                </p>
                <div className="flex items-center gap-3 text-[#39f8f2] font-bold text-sm">
                  <Globe className="w-4 h-4" />
                  <span>{t("sidebar.timezone")}</span>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              {[
                { label: t("sidebar.support"), icon: MessageSquare },
                { label: t("sidebar.sales"), icon: ShieldCheck },
                { label: t("sidebar.press"), icon: Mail },
              ].map((item, i) => (
                <a
                  key={i}
                  href="mailto:care.copywrite@gmail.com"
                  className="flex items-center justify-between p-6 bg-white rounded-2xl border border-slate-200 hover:border-[#1b9e99] hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-[#e6f9f8] transition-colors">
                      <item.icon className="w-5 h-5 text-[#00415a]" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 leading-none mb-1">
                        {item.label}
                      </p>
                      <p className="text-xs text-slate-400 font-medium tracking-wide">
                        care.copywrite@gmail.com
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#1b9e99] transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
