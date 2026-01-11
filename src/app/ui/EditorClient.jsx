"use client";

import React, { useState, useRef } from "react";
import {
  Edit3,
  MonitorPlay,
  Cloud,
  ShieldCheck,
  Zap,
  Globe,
  FileType,
  Upload,
  FileText,
  FileSpreadsheet,
  X,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function EditorClientContent({ locale }) {
  const t = useTranslations("EditorPage");
  const router = useRouter();
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState(""); // "new" or "upload"
  const userId = "67b746ab6256a6bdb691b18a"; // Static UID as per your requirement

  // --- 1. NEW DOCUMENT MUTATION ---
  const { mutate: createBlankDoc, isPending: isCreating } = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/create-document`,
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["user"]);
      toast.success("Workspace Initialized!");
      const { document } = data;
      const trialUrl = `https://app.noteocr.com/trial-editor/${document.folder}/${document.name}`;
      window.location.href = trialUrl;
    },
    onError: (error) => {
      console.error("Creation Error:", error);
      toast.error(
        error?.response?.data?.message || "Failed to create document."
      );
    },
  });

  // --- 2. IMPORT/UPLOAD MUTATION ---
  const { mutate: importFile, isPending: isImporting } = useMutation({
    mutationFn: async (formData) => {
      console.log(formData);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/upload`,
        formData
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["user"]);
      toast.success("File Uploaded successfully!");
      const { document } = data;
      // Redirect to editor with the uploaded file
      console.log(data);

      const trialUrl = `https://app.noteocr.com/trial-editor/${document.dest}/${document.name}`;
      window.location.href = trialUrl;
    },
    onError: (error) => {
      console.error("Upload error:", error);
      toast.error(
        error.response?.data?.message || "Something went wrong during upload"
      );
    },
  });

  // --- 3. LOGIC HANDLERS ---
  const generateProfessionalName = (docType) => {
    const prefixes = {
      word: [
        "Project",
        "Draft",
        "Report",
        "Analysis",
        "Summary",
        "Legal",
        "Contract",
      ],
      excel: [
        "Data",
        "Budget",
        "Audit",
        "Inventory",
        "Stats",
        "Metrics",
        "Forecast",
      ],
    };
    const adjectives = [
      "Alpha",
      "Corporate",
      "Final",
      "Quarterly",
      "Secure",
      "Internal",
    ];
    const typeSet = prefixes[docType];
    const randomPrefix = typeSet[Math.floor(Math.random() * typeSet.length)];
    const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const date = new Date()
      .toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit" })
      .replace(/\//g, "");
    const randomID = Math.floor(1000 + Math.random() * 9000);
    return `${randomPrefix}_${randomAdj}_${date}_${randomID}`;
  };

  const handleSelection = (docType) => {
    if (isCreating) return;
    const generatedName = generateProfessionalName(docType);
    createBlankDoc({
      userId,
      folderName: "Personal",
      documentName: generatedName,
      fileType: docType === "word" ? "docx" : "xlsx",
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    console.log(selectedFile);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("userId", userId);
    formData.append("folderName", "Personal");
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
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent shadow-[0_0_20px_rgba(59,130,246,0.3)]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
            <Cloud className="w-3 h-3" />
            <span>{t("hero_pill")}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            {t("hero_title_1")} <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              {t("hero_title_2")}
            </span>
          </h1>

          <p className="md:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10">
            {t("hero_subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 relative z-20">
            <button
              onClick={() => openChoice("new")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all hover:-translate-y-1"
            >
              <Edit3 className="w-5 h-5" /> {t("btn_new")}
            </button>
            <button
              onClick={() => openChoice("upload")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 px-8 rounded-xl border border-slate-700 transition-all hover:-translate-y-1"
            >
              <Upload className="w-5 h-5 text-blue-400" /> {t("btn_upload")}
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 mt-16 opacity-60">
            <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
              <ShieldCheck className="w-4 h-4 text-blue-500" />{" "}
              {t("trust_secure")}
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
              <MonitorPlay className="w-4 h-4 text-blue-500" /> {t("trust_os")}
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
              <FileType className="w-4 h-4 text-blue-500" /> {t("trust_office")}
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-slate-50 rounded-2xl p-8 border border-slate-100 transition-all hover:border-blue-100 hover:shadow-sm"
              >
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 mb-6 shadow-sm">
                  {n === 1 ? <Globe /> : n === 2 ? <Edit3 /> : <Zap />}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {t(`feat_${n}_title`)}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {t(`feat_${n}_desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FORMATS SECTION */}
      <section className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              {t("formats_title")}
            </h2>
            <p className="text-slate-600 mb-8">{t("formats_subtitle")}</p>
            <div className="grid grid-cols-2 gap-4">
              {["docx", "xlsx", "txt", "csv"].map((ext) => (
                <div
                  key={ext}
                  className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm"
                >
                  <span className="text-xs font-bold bg-slate-100 px-2 py-1 rounded text-slate-600 uppercase">
                    {ext}
                  </span>
                  <span className="text-sm font-medium text-slate-900">
                    {t(`format_${ext}`)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="aspect-square bg-white rounded-2xl border border-slate-200 shadow-xl p-8 relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-64 bg-blue-50 border border-blue-100 rounded-lg shadow-sm -rotate-6"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-64 bg-white border border-slate-200 rounded-lg shadow-lg rotate-3 p-6 flex flex-col gap-3">
                <div className="w-1/3 h-4 bg-slate-100 rounded"></div>
                <div className="w-full h-2 bg-slate-50 rounded"></div>
                <div className="w-full h-2 bg-slate-50 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MODAL SELECTION */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            onClick={() => !isGlobalLoading && setModalOpen(false)}
          />

          <div className="relative bg-white rounded-[24px] sm:rounded-[32px] overflow-hidden max-w-xl w-full shadow-2xl animate-in fade-in zoom-in duration-300">
            {isGlobalLoading && (
              <div className="absolute inset-0 z-50 bg-white/60 backdrop-blur-[2px] flex flex-col items-center justify-center text-center p-6">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
                <h4 className="text-xl font-bold text-slate-900">
                  {isImporting ? "Uploading File" : "Provisioning Workspace"}
                </h4>
                <p className="text-slate-500 text-sm">
                  Please wait while we initialize your secure editor
                  environment.
                </p>
              </div>
            )}

            <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500" />

            <div className="p-6 sm:p-10">
              <button
                onClick={() => setModalOpen(false)}
                disabled={isGlobalLoading}
                className="absolute top-5 right-5 p-2 hover:bg-slate-100 rounded-full transition-all active:scale-95"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>

              <div className="mb-8 pr-8">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2 tracking-tight">
                  {actionType === "new" ? "New Workspace" : "Import Document"}
                </h3>
                <p className="text-slate-500 text-sm font-medium">
                  {actionType === "new"
                    ? "Select your preferred format to get started."
                    : "Upload an existing file to continue editing online."}
                </p>
              </div>

              {actionType === "new" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* WORD */}
                  <button
                    disabled={isGlobalLoading}
                    onClick={() => handleSelection("word")}
                    className="relative flex flex-row sm:flex-col items-center sm:items-start p-5 sm:p-8 rounded-2xl border-2 border-slate-100 bg-white hover:border-blue-500 hover:shadow-2xl transition-all group active:scale-[0.98] disabled:opacity-50"
                  >
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-0 sm:mb-6 mr-4 sm:mr-0 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <span className="block font-bold text-slate-900 text-base sm:text-xl">
                        Word Editor
                      </span>
                      <span className="mt-2 inline-block px-2 py-0.5 bg-blue-50 text-[10px] font-mono text-blue-600 rounded border border-blue-100 uppercase font-bold">
                        DOC_AUTO_GEN
                      </span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-blue-500 sm:opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all ml-auto sm:ml-0 sm:mt-4" />
                  </button>

                  {/* EXCEL */}
                  <button
                    disabled={isGlobalLoading}
                    onClick={() => handleSelection("excel")}
                    className="relative flex flex-row sm:flex-col items-center sm:items-start p-5 sm:p-8 rounded-2xl border-2 border-slate-100 bg-white hover:border-emerald-500 hover:shadow-2xl transition-all group active:scale-[0.98] disabled:opacity-50"
                  >
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mb-0 sm:mb-6 mr-4 sm:mr-0 shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                      <FileSpreadsheet className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <span className="block font-bold text-slate-900 text-base sm:text-xl">
                        Excel Editor
                      </span>
                      <span className="mt-2 inline-block px-2 py-0.5 bg-emerald-50 text-[10px] font-mono text-emerald-600 rounded border border-emerald-100 uppercase font-bold">
                        XLS_AUTO_GEN
                      </span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-emerald-500 sm:opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all ml-auto sm:ml-0 sm:mt-4" />
                  </button>
                </div>
              ) : (
                /* UPLOAD ZONE */
                <div
                  onClick={() =>
                    !isGlobalLoading && fileInputRef.current?.click()
                  }
                  className="group relative border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center hover:border-blue-500 hover:bg-blue-50/30 transition-all cursor-pointer"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".docx,.xlsx,.txt,.csv"
                  />
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-1">
                    Click to browse files
                  </h4>
                  <p className="text-slate-500 text-sm">
                    Supports DOCX, XLSX, TXT and CSV
                  </p>
                </div>
              )}
            </div>

            <div className="bg-slate-50/80 backdrop-blur-sm p-4 border-t border-slate-100 flex items-center justify-center gap-6">
              <div className="flex items-center gap-1.5 opacity-40">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-900">
                  Encrypted Workspace
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
