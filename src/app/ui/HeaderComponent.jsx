"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Table,
  Edit3,
  FileSearch,
  BookOpen,
  Users,
  Mail,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

import LanguageSwitcher from "./LanguageSwitcher";

const HeaderComponent = () => {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const dropdownRefs = useRef({});

  const getAppUrl = (path) => {
    const base = `https://app.noteocr.com${path}`;
    return locale && locale !== "en" ? `${base}?lng=${locale}` : base;
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    const handleClickOutside = (event) => {
      if (
        activeDropdown &&
        !dropdownRefs.current[activeDropdown]?.contains(event.target)
      ) {
        setActiveDropdown(null);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDropdown]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
  }, [isMobileMenuOpen]);

  const toggleDropdown = (dropdown) =>
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);

  const closeAll = () => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  };

  const lLink = (path) => `/${locale}${path}`;

  const navItems = {
    features: {
      title: t("product"),
      items: [
        {
          name: t("notes_to_word"),
          href: lLink("/handwriting-to-docx"),
          icon: <FileText className="w-4 h-4" />,
          desc: t("desc_word"),
        },
        {
          name: t("table_to_excel"),
          href: lLink("/handwriting-to-excel"),
          icon: <Table className="w-4 h-4" />,
          desc: t("desc_excel"),
        },
        {
          name: t("online_editor"),
          href: lLink("/online-editor"),
          icon: <Edit3 className="w-4 h-4" />,
          desc: t("desc_editor"),
        },
        {
          name: t("pdf_tools"),
          href: lLink("/edit-pdf"),
          icon: <FileSearch className="w-4 h-4" />,
          desc: t("desc_pdf"),
        },
      ],
    },
    solutions: {
      title: t("solutions"),
      items: [
        {
          name: "Docs",
          href: lLink("/docs"),
          icon: <BookOpen className="w-4 h-4" />,
          desc: "Docs",
        },
      ],
    },
    resources: {
      title: t("company"),
      items: [
        {
          name: t("support"),
          href: lLink("/contact"),
          icon: <Mail className="w-4 h-4" />,
          desc: t("desc_support"),
        },
      ],
    },
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[100] flex flex-col w-full">
        {/* --- HEADER --- */}
        <header className="w-full bg-white border-b border-zinc-200 py-3 shadow-sm transition-all duration-300">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <Link href={lLink("/")} className="flex items-center gap-2">
                <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
                <span className="text-xl font-bold text-zinc-900">NoteOCR</span>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-1 bg-zinc-100/80 p-1 rounded-full">
                {Object.entries(navItems).map(([key, item]) => (
                  <div
                    key={key}
                    className="relative"
                    ref={(el) => (dropdownRefs.current[key] = el)}
                  >
                    <button
                      onClick={() => toggleDropdown(key)}
                      className={`flex items-center gap-1 px-4 py-2 text-[13px] font-semibold rounded-full transition-all ${
                        activeDropdown === key
                          ? "bg-white shadow-sm text-zinc-900"
                          : "text-zinc-600 hover:text-zinc-900"
                      }`}
                    >
                      {item.title}
                      <ChevronDown
                        className={`w-3 h-3 transition-transform ${
                          activeDropdown === key ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {activeDropdown === key && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          className="absolute top-full left-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-zinc-100 p-2"
                        >
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              onClick={closeAll}
                              className="flex items-center gap-4 p-3 rounded-xl hover:bg-zinc-50 transition-all"
                            >
                              <div className="w-8 h-8 flex items-center justify-center bg-zinc-50 rounded-lg text-zinc-400">
                                {subItem.icon}
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-zinc-900">
                                  {subItem.name}
                                </div>
                                <p className="text-xs text-zinc-400">
                                  {subItem.desc}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
                <Link
                  href={lLink("/pricing")}
                  className="px-4 py-2 text-[13px] font-semibold text-zinc-600 hover:text-zinc-900 transition-colors"
                >
                  {t("pricing")}
                </Link>
              </nav>

              <div className="hidden lg:flex items-center gap-3">
                <LanguageSwitcher />
                <div className="w-px h-4 bg-zinc-200 mx-1" />
                <a
                  href={getAppUrl("/")}
                  className="px-4 py-2 text-[13px] font-semibold text-zinc-600 hover:text-zinc-900 transition-colors"
                >
                  {t("login")}
                </a>
                <a
                  href={getAppUrl("/signup")}
                  className="px-5 py-2.5 text-[13px] font-bold text-white bg-[#015979] rounded-full hover:bg-[#014a66] transition-all shadow-sm"
                >
                  {t("get_started")}
                </a>
              </div>

              {/* Mobile Toggle */}
              <div className="lg:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 bg-zinc-100 rounded-full text-zinc-900"
                >
                  {isMobileMenuOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* --- MOBILE MENU --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[110] bg-white flex flex-col"
          >
            <div className="sticky top-0 z-[120] bg-white px-6 py-5 flex items-center justify-between border-b border-zinc-100">
              <div className="flex items-center gap-2">
                <img src="/logo.png" className="h-7" alt="Logo" />
                <span className="font-bold text-zinc-900 uppercase tracking-tight">
                  NoteOCR
                </span>
              </div>
              <div className="flex items-center gap-3">
                <LanguageSwitcher />
                <button
                  onClick={closeAll}
                  className="p-2 bg-zinc-100 rounded-full"
                >
                  <X className="w-6 h-6 text-zinc-900" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pt-5 pb-40">
              <Link
                href={lLink("/pricing")}
                onClick={closeAll}
                className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl border border-zinc-100 mb-8"
              >
                <span className="text-lg font-bold text-zinc-900">
                  {t("pricing")}
                </span>
                <ChevronDown className="w-4 h-4 -rotate-90 text-zinc-400" />
              </Link>

              <div className="space-y-10">
                {Object.entries(navItems).map(([key, item]) => (
                  <div key={key}>
                    <p className="text-[11px] font-black text-zinc-400 uppercase tracking-widest mb-4 ml-1">
                      {item.title}
                    </p>
                    <div className="grid gap-6">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          onClick={closeAll}
                          className="flex items-start gap-4 group"
                        >
                          <div className="w-10 h-10 flex-none flex items-center justify-center bg-zinc-50 rounded-xl text-zinc-400 group-active:text-[#015979]">
                            {subItem.icon}
                          </div>
                          <div className="flex-1 pt-1">
                            <span className="font-bold text-zinc-900 text-base block mb-1">
                              {subItem.name}
                            </span>
                            <p className="text-xs text-zinc-500 line-clamp-1">
                              {subItem.desc}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-zinc-100 pb-8 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
              <div className="grid grid-cols-2 gap-4">
                <a
                  href={getAppUrl("/")}
                  onClick={closeAll}
                  className="flex items-center justify-center py-3.5 text-base font-bold text-zinc-700 bg-zinc-100 rounded-xl"
                >
                  {t("login")}
                </a>
                <a
                  href={getAppUrl("/signup")}
                  onClick={closeAll}
                  className="flex items-center justify-center py-3.5 text-base font-bold text-white bg-[#015979] rounded-xl"
                >
                  {t("get_started")}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HeaderComponent;
