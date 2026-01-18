"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Twitter, Linkedin, Github, ArrowRight } from "lucide-react";

const Footer = () => {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0B1120] border-t border-white/5 pt-20 pb-10 overflow-hidden">
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute -top-[200px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-16">
          {/* 1. Brand & Newsletter */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/noteocr-full-logo-white.png"
                alt="NoteOCR"
                width={160}
                height={40}
                className="opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>

            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              {t("description")}
            </p>

            <div className="flex flex-col gap-3">
              <label className="text-xs font-semibold text-white uppercase tracking-wider">
                {t("stay_updated")}
              </label>
              <div className="relative max-w-sm group">
                <input
                  type="email"
                  placeholder={t("email_placeholder")}
                  className="bg-white/5 border border-white/10 text-slate-200 text-sm rounded-full pl-4 pr-12 py-3 w-full focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/50 transition-all placeholder:text-slate-600"
                />
                <button className="absolute right-1 top-1 bottom-1 bg-teal-600 hover:bg-teal-500 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-lg">
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs text-emerald-400 font-medium">
                {t("systems_ok")}
              </span>
            </div>
          </div>

          {/* 2. Links Section */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10">
            {/* Column 1: Product */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-6">
                {t("product")}
              </h4>
              <ul className="space-y-4">
                <li>
                  <FooterLink href="/handwriting-to-docx">
                    {t("links.notes_to_word")}
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="/handwriting-to-excel">
                    {t("links.table_to_excel")}
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="/online-editor">
                    {t("links.online_editor")}
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="/pricing">{t("links.pricing")}</FooterLink>
                </li>
              </ul>
            </div>

            {/* Column 2: Company */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-6">
                {t("company")}
              </h4>
              <ul className="space-y-4">
                <li>
                  <FooterLink href="/about">{t("links.about")}</FooterLink>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="group flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {t("links.careers")}
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-white/10 text-slate-300 border border-white/20 group-hover:bg-white group-hover:text-black transition-colors">
                      {t("hiring")}
                    </span>
                  </Link>
                </li>
                <li>
                  <FooterLink href="/contact">{t("links.contact")}</FooterLink>
                </li>
              </ul>
            </div>

            {/* Column 3: Resources */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-6">
                {t("resources")}
              </h4>
              <ul className="space-y-4">
                <li>
                  <FooterLink href="/docs">{t("links.docs")}</FooterLink>
                </li>
                <li>
                  <FooterLink href="/privacy">{t("links.privacy")}</FooterLink>
                </li>
                <li>
                  <FooterLink href="/terms">{t("links.terms")}</FooterLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-slate-500">
            {/* Add a check or a default string if t fails */}
            {t.rich("copyright", {
              year: (chunks) => currentYear,
            }) || `© ${currentYear} NoteOCR Inc.`}
          </p>

          <div className="flex gap-6 items-center">
            <SocialIcon href="#" icon={<Twitter size={18} />} />
            <SocialIcon href="#" icon={<Linkedin size={18} />} />
            <SocialIcon href="#" icon={<Github size={18} />} />
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, children }) => (
  <Link
    href={href}
    className="text-sm text-slate-400 hover:text-teal-400 transition-colors duration-200 block w-fit"
  >
    {children}
  </Link>
);

const SocialIcon = ({ href, icon }) => (
  <a
    href={href}
    className="text-slate-500 hover:text-white transition-colors duration-200 hover:scale-110 transform"
  >
    {icon}
  </a>
);

export default Footer;
