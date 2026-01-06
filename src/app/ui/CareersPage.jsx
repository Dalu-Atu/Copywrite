"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Rocket,
  Globe,
  Lightbulb,
  Home,
  HeartPulse,
  BookOpen,
  Calendar,
  UserCheck,
  Users,
  Handshake,
  MapPin,
  Briefcase,
  Layers,
  Sparkles,
  Mail,
  X,
  Send,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

const RECIPIENT_EMAIL = "care.copywrite@gmail.com";

const ApplicationModal = ({ isOpen, onClose, jobTitle }) => {
  const t = useTranslations("CareersPage.modal");
  if (!isOpen) return null;

  const subject = `${t("subject_prefix")} ${jobTitle}`;
  const body = `${t("body_greeting")}\n\n${t("body_intro")} ${jobTitle}.\n\n${t(
    "body_fields"
  )}\n\n${t("body_closing")}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{t("title")}</h3>
            <p className="text-sm text-[#1b9e99] font-medium">{jobTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto">
          <div className="mb-6 bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-3">
            <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 leading-relaxed">
              <strong>{t("note_label")}:</strong> {t("note_text")}
            </p>
          </div>
          <form
            action={`mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(
              subject
            )}&body=${encodeURIComponent(body)}`}
            method="POST"
            encType="text/plain"
            onSubmit={onClose}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                {t("field_name")}
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 outline-none text-sm"
                placeholder="Jane Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                {t("field_email")}
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 outline-none text-sm"
                placeholder="jane@example.com"
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center items-center bg-[#1b9e99] hover:bg-[#158f8a] text-white font-semibold py-3 rounded-lg transition-all group"
            >
              <span>{t("submit")}</span>
              <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const CareerPage = () => {
  const t = useTranslations("CareersPage");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentJobTitle, setCurrentJobTitle] = useState("");

  const openModal = (title) => {
    setCurrentJobTitle(title);
    setIsModalOpen(true);
  };

  // Dynamic content mapping
  const perks = ["remote", "health", "growth", "pto"].map((key) => ({
    icon: { remote: Home, health: HeartPulse, growth: BookOpen, pto: Calendar }[
      key
    ],
    title: t(`perks.${key}.title`),
    desc: t(`perks.${key}.desc`),
  }));

  const process = ["review", "screening", "culture", "onboarding"].map(
    (key) => ({
      icon: {
        review: Layers,
        screening: UserCheck,
        culture: Handshake,
        onboarding: Sparkles,
      }[key],
      title: t(`process.${key}.title`),
      description: t(`process.${key}.desc`),
    })
  );

  const jobs = ["marketing", "campus", "creator"].map((key) => ({
    title: t(`jobs.${key}.title`),
    department: t(`jobs.${key}.dept`),
    type: t(`jobs.${key}.type`),
    location: t(`jobs.${key}.loc`),
    description: t(`jobs.${key}.desc`),
  }));

  return (
    <div className="font-sans text-slate-600 bg-white min-h-screen selection:bg-[#1b9e99]/20">
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        jobTitle={currentJobTitle}
      />

      <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-900">
        <div className="absolute inset-0">
          <img
            src="/images/carrer.png"
            alt="Office"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b9e99]/10 border border-[#1b9e99]/30 text-white mb-6">
            {t("hero.badge")}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
            {t("hero.title_start")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3fe4de] to-[#1b9e99]">
              {t("hero.title_highlight")}
            </span>
          </h1>
          <p className="md:text-xl text-slate-300 max-w-2xl mx-auto mb-10">
            {t("hero.subtitle")}
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="#open-positions"
              className="bg-[#1b9e99] text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-[#178a85] transition-all"
            >
              {t("hero.cta1")}
            </a>
            <a
              href="#culture"
              className="bg-white/10 text-white font-semibold px-8 py-3.5 rounded-lg border border-white/20 hover:bg-white/20 transition-all"
            >
              {t("hero.cta2")}
            </a>
          </div>
        </div>
      </header>

      <main>
        {/* Value Proposition */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                {t("values.title_start")}{" "}
                <span className="text-emerald-600">
                  {t("values.title_highlight")}
                </span>
              </h2>
              <p className="text-slate-600 md:text-lg">
                {t("values.subtitle")}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[Rocket, Globe, Lightbulb].map((Icon, idx) => (
                <div
                  key={idx}
                  className="group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#1b9e99]/30 transition-all"
                >
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 text-[#1b9e99]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {t(`values.v${idx + 1}_t`)}
                  </h3>
                  <p className="text-slate-600">{t(`values.v${idx + 1}_d`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-[#1b9e99]/20 text-[#3fe4de] text-xs font-bold uppercase mb-4">
                {t("benefits.badge")}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                {t("benefits.title")}
              </h2>
              <p className="text-slate-400 mb-8">{t("benefits.desc")}</p>
              <div className="grid sm:grid-cols-2 gap-6">
                {perks.map((perk, idx) => (
                  <div key={idx} className="flex gap-4">
                    <CheckCircle2 className="w-5 h-5 text-[#1b9e99] shrink-0" />
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        {perk.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">{perk.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="aspect-square bg-slate-800/50 rounded-2xl border border-slate-700 p-8 flex items-center justify-center">
              <div className="text-center text-[#1b9e99] italic">
                {t("benefits.visual_label")}
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-center mb-12">
              {t("process.main_title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {process.map((step, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm text-center"
                >
                  <div className="w-12 h-12 mx-auto bg-[#1b9e99] text-white rounded-full flex items-center justify-center mb-4">
                    <step.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-50">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Jobs Section */}
        <section id="open-positions" className="py-24 bg-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold">
                {t("jobs.main_title")}
              </h2>
              <p className="text-slate-600">{t("jobs.main_subtitle")}</p>
            </div>
            <div className="grid gap-6">
              {jobs.map((job, idx) => (
                <div
                  key={idx}
                  className="group bg-white rounded-xl border border-slate-200 p-6 md:p-8 hover:border-[#1b9e99] transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                        {job.department}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                        {job.location}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#1b9e99]">
                      {job.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {job.description}
                    </p>
                  </div>
                  <button
                    onClick={() => openModal(job.title)}
                    className="w-full md:w-auto px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-[#1b9e99] transition-all flex items-center justify-center"
                  >
                    {t("jobs.apply_btn")}{" "}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Culture Section */}
        <section
          id="culture"
          className="py-16 bg-slate-50 border-t border-slate-200"
        >
          <div className="container mx-auto px-6">
            <div className="bg-[#1b9e99] rounded-3xl overflow-hidden relative flex flex-col md:row">
              <div className="p-8 md:p-16 md:w-1/2 text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">
                  {t("culture.title")}
                </h2>
                <p className="text-teal-50 text-lg mb-8">{t("culture.desc")}</p>
                <div className="text-sm font-medium text-teal-50">
                  {t("culture.team_count")}
                </div>
              </div>
              <div className="md:w-1/2 min-h-[400px]">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                  alt="Team"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CareerPage;
