"use client";

import React, { useState, useRef } from "react";
import {
  FileSearch,
  MessageSquare,
  PenTool,
  ShieldCheck,
  Zap,
  ArrowRight,
  Layers,
  Upload,
  X,
  FileText,
  MousePointer2,
  Edit3,
  Loader2,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function PdfClientContent() {
  const t = useTranslations("PdfPage");
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState(""); // "new" or "upload"
  const userId = "67b746ab6256a6bdb691b18a";

  // --- 1. NEW PDF MUTATION ---
  const { mutate: createBlankPdf, isPending: isCreating } = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/create-document`,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["user"]);
      toast.success("PDF Workspace Ready!");
      const { document } = data;
      // Redirect to trial-editor on the app subdomain
      const trialUrl = `https://app.copywritee.com/trial-editor/${document.folder}/${document.name}`;
      window.location.href = trialUrl;
    },
    onError: (error) => {
      console.error("Creation Error:", error);
      toast.error(error?.response?.data?.message || "Failed to create PDF.");
    },
  });

  // --- 2. IMPORT PDF MUTATION ---
  const { mutate: importFile, isPending: isImporting } = useMutation({
    mutationFn: async (formData) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/upload`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["user"]);
      toast.success("PDF Uploaded successfully!");
      const { document } = data;
      const trialUrl = `https://app.copywritee.com/trial-editor/${document.dest}/${document.name}`;
      window.location.href = trialUrl;
    },
    onError: (error) => {
      console.error("Upload error:", error);
      toast.error(error.response?.data?.message || "Failed to upload PDF");
    },
  });

  // --- 3. HANDLERS ---
  const generateProfessionalName = () => {
    const prefixes = [
      "Legal",
      "Contract",
      "Agreement",
      "Proposal",
      "Draft",
      "Review",
      "Analysis",
    ];
    const adjectives = [
      "Alpha",
      "Corporate",
      "Final",
      "Secure",
      "Internal",
      "Client",
    ];
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const date = new Date()
      .toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit" })
      .replace(/\//g, "");
    const randomID = Math.floor(1000 + Math.random() * 9000);
    return `${randomPrefix}_${randomAdj}_${date}_${randomID}.pdf`;
  };

  const handleStartScratch = () => {
    if (isCreating) return;
    createBlankPdf({
      userId,
      folderName: "Personal",
      documentName: generateProfessionalName(),
      fileType: "pdf",
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Optional: Validate PDF type
    if (selectedFile.type !== "application/pdf") {
      toast.error("Please select a valid PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("userId", userId);
    importFile(formData);
  };

  const openChoice = (type) => {
    setActionType(type);
    setModalOpen(true);
  };

  const isGlobalLoading = isCreating || isImporting;

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="relative pt-20 pb-20 overflow-hidden bg-[#0B1120]">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-500/50 to-transparent shadow-[0_0_20px_rgba(244,63,94,0.3)]" />

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-rose-500/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-wider mb-6">
            <FileSearch className="w-4 h-4" />
            <span>{t("hero_pill")}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
            {t("hero_title_1")} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-orange-400">
              {t("hero_title_2")}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-12">
            {t("hero_subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 relative z-20">
            <button
              onClick={() => openChoice("new")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-rose-600 hover:bg-rose-500 text-white font-bold py-4 px-10 rounded-2xl shadow-xl shadow-rose-600/20 transition-all hover:-translate-y-1 active:scale-95 group"
            >
              <Edit3 className="w-5 h-5" />
              {t("btn_new")}
            </button>
            <button
              onClick={() => openChoice("upload")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 px-10 rounded-2xl border border-slate-700 transition-all hover:-translate-y-1 active:scale-95 group"
            >
              <Upload className="w-5 h-5 text-rose-400" />
              {t("btn_upload")}
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 mt-16 opacity-60">
            <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
              <ShieldCheck className="w-4 h-4 text-rose-500" /> SOC2 Secure
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
              <MessageSquare className="w-4 h-4 text-rose-500" /> AI Insights
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
              <PenTool className="w-4 h-4 text-rose-500" /> eSign Ready
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPS */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className="bg-slate-50 rounded-[32px] p-10 border border-slate-100 group hover:border-rose-100 hover:bg-rose-50/30 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-rose-600 mb-8 shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                  {num === 1 ? (
                    <MessageSquare className="w-7 h-7" />
                  ) : num === 2 ? (
                    <PenTool className="w-7 h-7" />
                  ) : (
                    <Layers className="w-7 h-7" />
                  )}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
                  {t(`feat_${num}_title`)}
                </h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {t(`feat_${num}_desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MODAL UX */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            onClick={() => !isGlobalLoading && setModalOpen(false)}
          />

          <div className="relative bg-white rounded-[32px] overflow-hidden max-w-xl w-full shadow-2xl animate-in fade-in zoom-in duration-300">
            {isGlobalLoading && (
              <div className="absolute inset-0 z-50 bg-white/60 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-6">
                <Loader2 className="w-12 h-12 text-rose-600 animate-spin mb-4" />
                <h4 className="text-xl font-bold text-slate-900 tracking-tight">
                  {isImporting ? "Processing PDF" : "Initializing Workspace"}
                </h4>
                <p className="text-slate-500 text-sm mt-2">
                  Please wait while we set up your secure PDF environment.
                </p>
              </div>
            )}

            <div className="h-1.5 w-full bg-gradient-to-r from-rose-500 via-pink-500 to-orange-500" />

            <div className="p-8 sm:p-12">
              <button
                onClick={() => setModalOpen(false)}
                disabled={isGlobalLoading}
                className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-all"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>

              <div className="text-center">
                <div className="w-20 h-20 bg-rose-50 rounded-3xl flex items-center justify-center text-rose-600 mx-auto mb-6">
                  <FileText className="w-10 h-10" />
                </div>

                <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">
                  {actionType === "new" ? "New PDF" : "Upload PDF"}
                </h3>
                <p className="text-slate-500 font-medium mb-10">
                  {actionType === "new"
                    ? "Start with a clean slate and build your document."
                    : "Import your file to chat, edit, or sign digitally."}
                </p>

                {actionType === "new" ? (
                  <button
                    onClick={handleStartScratch}
                    disabled={isGlobalLoading}
                    className="w-full flex items-center justify-center gap-3 bg-rose-600 text-white font-bold py-5 rounded-2xl hover:bg-rose-500 transition-all active:scale-[0.98] shadow-xl shadow-rose-600/20 disabled:opacity-50"
                  >
                    <ArrowRight className="w-5 h-5" />
                    Create Blank PDF
                  </button>
                ) : (
                  <div
                    onClick={() =>
                      !isGlobalLoading && fileInputRef.current?.click()
                    }
                    className="group border-2 border-dashed border-slate-200 rounded-3xl p-10 cursor-pointer hover:border-rose-400 hover:bg-rose-50/50 transition-all"
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf"
                    />
                    <MousePointer2 className="w-10 h-10 text-slate-300 mx-auto mb-4 group-hover:text-rose-500 transition-colors" />
                    <span className="block text-slate-900 font-bold text-lg">
                      Click to select PDF
                    </span>
                    <span className="text-slate-400 text-sm">
                      Max file size: 25MB
                    </span>
                  </div>
                )}

                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-8 flex items-center justify-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5" /> End-to-End Encrypted
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
