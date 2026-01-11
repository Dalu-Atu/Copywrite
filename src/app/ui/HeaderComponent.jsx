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
  ArrowRight, // Added for the banner
} from "lucide-react";

// Import your new component
import LanguageSwitcher from "./LanguageSwitcher";

const HeaderComponent = () => {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBanner, setShowBanner] = useState(true); // Banner State
  const dropdownRefs = useRef({});

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

  // Navigation Items (kept from your original)
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
          name: t("academic"),
          href: lLink("/solutions/education"),
          icon: <BookOpen className="w-4 h-4" />,
          desc: t("desc_academic"),
        },
        {
          name: t("enterprise"),
          href: lLink("/solutions/business"),
          icon: <Users className="w-4 h-4" />,
          desc: t("desc_enterprise"),
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
      {/* --- MIGRATION BANNER --- */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="fixed top-0 left-0 right-0 z-[51] bg-[#015979] text-white overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-center gap-4 text-xs sm:text-sm font-medium">
              <span className="opacity-90">
                Copywritee is now <strong>NoteOCR</strong>. smarter features, new
                home!
              </span>
              <button
                onClick={() => setShowBanner(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header
        className={`fixed left-0 right-0 z-[40] transition-all duration-300 ${
          showBanner ? "top-8 sm:top-9" : "top-0"
        } ${
          isScrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-zinc-200 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href={lLink("/")}
              className="flex items-center gap-2 relative z-[50]"
            >
              <img src="/logo.png" alt="Logo" className="h-8 w-auto" />
              <span className="text-xl font-bold text-zinc-900">NoteOcr</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1 bg-zinc-100/50 p-1 rounded-full">
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
                        : "text-zinc-500 hover:text-zinc-800"
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
                className="px-4 py-2 text-[13px] font-semibold text-zinc-500 hover:text-zinc-800 transition-colors"
              >
                {t("pricing")}
              </Link>
            </nav>

            {/* Desktop CTA & Language Switcher */}
            <div className="hidden lg:flex items-center gap-3">
              <LanguageSwitcher />
              <div className="w-px h-4 bg-zinc-200 mx-1" />
              <a
                href="https://app.noteocr.com/"
                className="px-4 py-2 text-[13px] font-semibold text-zinc-600 hover:text-zinc-900 transition-colors"
              >
                {t("login")}
              </a>
              <a
                href="https://app.noteocr.com/signup"
                className="px-5 py-2.5 text-[13px] font-bold text-white bg-[#015979] rounded-full hover:bg-[#014a66] transition-all shadow-sm"
              >
                {t("get_started")}
              </a>
            </div>

            {/* Mobile Toggle */}
            <div className="flex items-center gap-3 lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 bg-zinc-100 rounded-full relative z-[50]"
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

      {/* Mobile Menu (kept from original) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[45] bg-white flex flex-col"
          >
            {/* ... (rest of your mobile menu code) ... */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HeaderComponent;
