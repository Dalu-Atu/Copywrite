"use client";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Twitter, Linkedin, Github, ArrowRight } from "lucide-react";

const Footer = () => {
  const t = useTranslations("Footer");
  const locale = useLocale();
  console.log(locale);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#000] border-t border-white/5 pt-20 pb-10 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none [background-image:linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-20 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link href={`/${locale}`} className="group mb-8">
              <div className="relative w-[160px] h-[40px]">
                <Image
                  src="/logo-white.png"
                  alt="NoteOCR Logo"
                  fill
                  sizes="160px"
                  style={{ objectFit: "contain", objectPosition: "left" }}
                  className="opacity-95 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-xs">
              {t("description")}
            </p>

            {/* Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-emerald-500/5 border border-emerald-500/10 rounded-full mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] text-emerald-500/90 font-mono font-medium uppercase tracking-wider">
                {t("systems_ok")}
              </span>
            </div>

            {/* Newsletter */}
            <form
              className="w-full max-w-sm space-y-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <label className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.2em]">
                {t("stay_updated")}
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder={t("email_placeholder")}
                  className="bg-white/[0.03] border border-white/10 text-white text-sm rounded-md px-4 py-2.5 w-full focus:outline-none focus:border-white/20 transition-all"
                />
                <button
                  type="submit"
                  className="bg-white hover:bg-gray-200 text-black px-4 py-2.5 rounded-md flex items-center justify-center transition-all active:scale-95"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Handwriting Tools */}
            <FooterGroup title="Handwriting">
              <FooterLink href={`/${locale}/handwriting-to-docx`}>
                Notes to Word
              </FooterLink>
              <FooterLink href={`/${locale}/handwriting-to-excel`}>
                Notes to Excel
              </FooterLink>
              <FooterLink href={`/${locale}/handwritten-invoice-to-excel`}>
                Invoice to Excel
              </FooterLink>
              <FooterLink href={`/${locale}/handwritten-inventory-to-excel`}>
                Inventory to Excel
              </FooterLink>
              <FooterLink href={`/${locale}/handwritten-timesheet-to-excel`}>
                Timesheet to Excel
              </FooterLink>
            </FooterGroup>

            {/* Image / Scan Tools */}
            <FooterGroup title="Convert">
              <FooterLink href={`/${locale}/jpg-to-word`}>
                JPG to Word
              </FooterLink>
              <FooterLink href={`/${locale}/photo-to-word`}>
                Photo to Word
              </FooterLink>
              <FooterLink href={`/${locale}/pic-to-excel`}>
                Picture to Excel
              </FooterLink>
              <FooterLink href={`/${locale}/scan-to-word`}>
                Scan to Word
              </FooterLink>
              <FooterLink href={`/${locale}/edit-pdf`}>Edit PDF</FooterLink>
              <FooterLink href={`/${locale}/online-editor`}>
                Online Editor
              </FooterLink>
            </FooterGroup>

            {/* Company */}
            <FooterGroup title={t("company")}>
              <FooterLink href={`/${locale}/about`}>
                {t("links.about")}
              </FooterLink>
              <Link
                href={`/${locale}/careers`}
                className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                {t("links.careers")}
                <span className="px-1 py-0.5 rounded-sm text-[8px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {t("hiring")}
                </span>
              </Link>
              <FooterLink href={`/${locale}/blog`}>
                {t("links.blog")}
              </FooterLink>
              <FooterLink href={`/${locale}/contact`}>
                {t("links.contact")}
              </FooterLink>
              <FooterLink href={`/${locale}/pricing`}>
                {t("links.pricing")}
              </FooterLink>
            </FooterGroup>

            {/* Resources */}
            <FooterGroup title={t("resources")}>
              <FooterLink href={`/${locale}/docs`}>
                {t("links.docs")}
              </FooterLink>
              <FooterLink href={`/${locale}/privacy`}>
                {t("links.privacy")}
              </FooterLink>
              <FooterLink href={`/${locale}/terms`}>
                {t("links.terms")}
              </FooterLink>
            </FooterGroup>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[12px] text-gray-500">
            {t("copyright", { year: currentYear })}
          </p>

          <div className="flex gap-3">
            <SocialIcon
              href="https://twitter.com/noteocr"
              icon={<Twitter size={16} />}
              label="Twitter"
            />
            <SocialIcon
              href="https://linkedin.com/company/noteocr"
              icon={<Linkedin size={16} />}
              label="LinkedIn"
            />
            <SocialIcon
              href="https://github.com/noteocr"
              icon={<Github size={16} />}
              label="GitHub"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterGroup = ({ title, children }) => (
  <div className="flex flex-col space-y-4">
    <h4 className="text-white font-semibold text-sm tracking-tight">{title}</h4>
    <ul className="flex flex-col space-y-2.5">{children}</ul>
  </div>
);

const FooterLink = ({ href, children }) => (
  <li>
    <Link
      href={href}
      className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
    >
      {children}
    </Link>
  </li>
);

const SocialIcon = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="w-9 h-9 flex items-center justify-center bg-white/[0.03] border border-white/10 rounded-md text-gray-400 hover:text-white hover:border-white/20 hover:bg-white/[0.08] transition-all"
  >
    {icon}
  </a>
);
export default Footer;
