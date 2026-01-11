"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  Sparkles,
} from "lucide-react";

const LoginPage = () => {
  const t = useTranslations("Login");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("Logged in:", formData);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex w-full bg-white">
      {/* 1. LEFT SIDE: Brand & Trust */}
      <div className="hidden lg:flex w-1/2 bg-[#0B1120] relative overflow-hidden flex-col justify-between p-12 text-white">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="flex items-center gap-2">
          <img src="/logo-white.png" className="h-12" alt="Logo" />
          <span className="font-bold text-2xl">NoteOcr</span>
        </div>

        <div className="relative z-10 max-w-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-3 h-3" />
            <span>{t("hero.badge")}</span>
          </div>
          <h2 className="text-4xl font-bold mb-6 leading-tight">
            {t("hero.testimonial")}
          </h2>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white font-bold">
              JS
            </div>
            <div>
              <p className="font-semibold text-white">{t("hero.author")}</p>
              <p className="text-slate-400 text-sm">{t("hero.role")}</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex gap-8 border-t border-white/10 pt-8">
          <div>
            <p className="text-2xl font-bold text-white">99.2%</p>
            <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">
              {t("hero.stat_accuracy")}
            </p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">200M+</p>
            <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">
              {t("hero.stat_scanned")}
            </p>
          </div>
        </div>
      </div>

      {/* 2. RIGHT SIDE: Form */}
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

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-400 font-medium">
                {t("form.divider")}
              </span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                {t("form.label_email")}
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <input
                  type="email"
                  required
                  className="block w-full pl-10 pr-3 py-2.5 border rounded-xl text-sm"
                  placeholder={t("form.placeholder_email")}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-slate-700">
                  {t("form.label_password")}
                </label>
                <a
                  href="#"
                  className="text-sm font-medium text-teal-600 hover:underline"
                >
                  {t("form.forgot_password")}
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="block w-full pl-10 pr-10 py-2.5 border rounded-xl text-sm"
                  placeholder="••••••••"
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
            </div>

            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 text-teal-600 rounded cursor-pointer"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-slate-600 cursor-pointer"
              >
                {t("form.remember_me")}
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
              href="/signup"
              className="font-semibold text-teal-600 hover:underline"
            >
              {t("form.signup_link")}
            </Link>
          </div>
        </div>
        <div className="absolute bottom-6 text-xs text-slate-400 text-center w-full">
          © {new Date().getFullYear()} NoteOcr Inc. {t("form.copyright")}.
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
