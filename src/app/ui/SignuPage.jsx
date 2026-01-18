"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  Globe,
  Check,
} from "lucide-react";

const SignupPage = () => {
  const t = useTranslations("Signup");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
  });

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("Registered:", formData);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex w-full bg-white">
      {/* 1. LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 bg-[#0B1120] relative overflow-hidden flex-col justify-between p-12 text-white">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="flex items-center gap-2">
          <img src="/logo-white.png" className="h-12" alt="Logo" />
          <span className="font-bold text-2xl">NoteOCR</span>
        </div>

        <div className="relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-slate-300 text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm">
            <Globe className="w-3 h-3" />
            <span>{t("hero.badge")}</span>
          </div>
          <h2 className="text-4xl font-bold mb-6 leading-tight">
            {t("hero.title")}
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400">
                  <Check className="w-4 h-4" />
                </div>
                <p className="text-slate-300">{t(`hero.check_${i}`)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 border-t border-white/10 pt-8">
          <p className="text-xs text-slate-400 uppercase tracking-wider mb-4">
            {t("hero.trusted_by")}
          </p>
          <div className="flex gap-6 opacity-60 font-bold text-lg grayscale">
            <span>Google</span>
            <span>Linear</span>
            <span>Stripe</span>
            <span>Vercel</span>
          </div>
        </div>
      </div>

      {/* 2. RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-slate-100 shadow-2xl relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              {t("form.title")}
            </h1>
            <p className="text-slate-500 text-sm">{t("form.subtitle")}</p>
          </div>

          <button
            onClick={() => setIsGoogleLoading(true)}
            className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium py-2.5 px-4 rounded-xl transition-all"
          >
            {isGoogleLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <span>{t("form.google_btn")}</span>
            )}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-400 font-medium">
                {t("form.divider")}
              </span>
            </div>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                {t("form.label_name")}
              </label>
              <div className="relative group">
                <User className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2.5 border rounded-xl text-sm"
                  placeholder={t("form.placeholder_name")}
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                {t("form.label_email")}
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <input
                  type="email"
                  className="block w-full pl-10 pr-3 py-2.5 border rounded-xl text-sm"
                  placeholder={t("form.placeholder_email")}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                {t("form.label_password")}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="block w-full pl-10 pr-10 py-2.5 border rounded-xl text-sm"
                  placeholder={t("form.placeholder_password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p className="mt-1 text-xs text-slate-400">
                {t("form.password_hint")}
              </p>
            </div>

            {/* Terms */}
            <div className="flex items-start pt-2">
              <input
                type="checkbox"
                required
                className="h-4 w-4 text-teal-600 rounded"
              />
              <label className="ml-2 text-sm text-slate-500">
                {t("form.terms_prefix")}{" "}
                <a href="#" className="text-teal-600 hover:underline">
                  {t("form.terms_link")}
                </a>{" "}
                {t("Pricing.and_label") || "&"}{" "}
                <a href="#" className="text-teal-600 hover:underline">
                  {t("form.privacy_link")}
                </a>
                .
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center bg-teal-600 hover:bg-teal-500 text-white font-semibold py-2.5 px-4 rounded-xl transition-all"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <div className="flex items-center gap-2">
                  {t("form.submit_btn")} <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500">
            {t("form.footer_text")}{" "}
            <Link
              href="/login"
              className="font-semibold text-teal-600 hover:underline"
            >
              {t("form.login_link")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
