"use client";

import React, { useState, useRef } from "react";
import {
  FileSearch,
  ShieldCheck,
  Zap,
  ArrowRight,
  Upload,
  X,
  FileText,
  Edit3,
  Loader2,
  Check,
  Sparkles,
  Lock,
  AlertCircle,
  Plus,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function PdfClientContent({ locale }) {
  const t = useTranslations("PdfPage");
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const userId = "67b746ab6256a6bdb691b18a";

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
      toast.success(t("toast_success_create"));
      const { document } = data;
      const trialUrl = `https://app.noteocr.com/trial-editor/${document.folder}/${document.name}`;
      window.location.href = trialUrl;
    },
    onError: (error) => {
      console.error("Creation Error:", error);
      toast.error(error?.response?.data?.message || t("toast_error_create"));
    },
  });

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
      toast.success(t("toast_success_upload"));
      const { document } = data;
      const trialUrl = `https://app.noteocr.com/trial-editor/${document.dest}/${document.name}`;
      window.location.href = trialUrl;
    },
    onError: (error) => {
      console.error("Upload error:", error);
      toast.error(error.response?.data?.message || t("toast_error_upload"));
    },
  });

  const generateProfessionalName = () => {
    const prefixes = [
      "Document",
      "Contract",
      "Agreement",
      "Proposal",
      "Draft",
      "Review",
      "Analysis",
    ];
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const date = new Date()
      .toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit" })
      .replace(/\//g, "");
    const randomID = Math.floor(1000 + Math.random() * 9000);
    return `${randomPrefix}_${date}_${randomID}.pdf`;
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

    if (selectedFile.type !== "application/pdf") {
      toast.error(t("toast_error_type"));
      return;
    }

    const maxSize = 25 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      toast.error(t("toast_error_size"));
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("userId", userId);
    formData.append("folderName", "Personal");
    importFile(formData);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        const fakeEvent = { target: { files: [file] } };
        handleFileChange(fakeEvent);
      } else {
        toast.error(t("toast_error_drop"));
      }
    }
  };

  const openModal = (type) => {
    setActionType(type);
    setModalOpen(true);
  };

  const isGlobalLoading = isCreating || isImporting;

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Main Card */}
      <div className="bg-[#0a0a0a] border-2 border-white/10 rounded-2xl p-3 shadow-2xl">
        <div className="border-2 border-dashed rounded-xl min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden transition-all border-white/10 bg-white/[0.02]">
          <div className="text-center p-8 max-w-md">
            <div className="relative mb-8">
              <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto">
                <FileText className="w-12 h-12 text-rose-500" />
              </div>
              <div className="absolute top-0 right-1/2 translate-x-12 -translate-y-2">
                <div className="bg-rose-500/10 border border-rose-500/30 rounded-full p-2">
                  <FileSearch className="w-4 h-4 text-rose-400" />
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-3">{t("tool_main_title")}</h3>
            <p className="text-gray-500 mb-8 leading-relaxed">
              {t("tool_main_desc")}
            </p>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => openModal("upload")}
                className="bg-rose-600 hover:bg-rose-500 text-white font-bold py-4 px-10 rounded-lg transition-all hover:scale-105 shadow-lg shadow-rose-600/20 flex items-center justify-center gap-3"
              >
                <Upload className="w-5 h-5" />
                {t("tool_upload_button")}
              </button>

              <button
                onClick={() => openModal("new")}
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-4 px-10 rounded-lg transition-all flex items-center justify-center gap-3"
              >
                <Plus className="w-5 h-5" />
                {t("tool_new_button")}
              </button>
            </div>

            <div className="flex items-center justify-center gap-6 text-[10px] text-gray-600 font-mono uppercase tracking-wider mt-8">
              <div className="flex items-center gap-1">
                <Check className="w-3 h-3" /> {t("tool_upload_check_1")}
              </div>
              <div className="flex items-center gap-1">
                <Check className="w-3 h-3" /> {t("tool_upload_check_2")}
              </div>
              <div className="flex items-center gap-1">
                <Check className="w-3 h-3" /> {t("tool_upload_check_3")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Cards Below */}
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white/[0.02] border border-white/5 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <FileSearch className="w-5 h-5 text-rose-500" />
            <span className="text-sm font-bold">{t("tool_info_1_title")}</span>
          </div>
          <p className="text-xs text-gray-600">{t("tool_info_1_desc")}</p>
        </div>

        <div className="bg-white/[0.02] border border-white/5 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-5 h-5 text-rose-500" />
            <span className="text-sm font-bold">{t("tool_info_2_title")}</span>
          </div>
          <p className="text-xs text-gray-600">{t("tool_info_2_desc")}</p>
        </div>

        <div className="bg-white/[0.02] border border-white/5 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <Lock className="w-5 h-5 text-rose-500" />
            <span className="text-sm font-bold">{t("tool_info_3_title")}</span>
          </div>
          <p className="text-xs text-gray-600">{t("tool_info_3_desc")}</p>
        </div>
      </div>

      {/* Quality Tips */}
      <div className="mt-6 p-4 bg-rose-500/5 border border-rose-500/20 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="text-sm">
            <span className="font-bold text-rose-400">
              {t("tool_tip_label")}
            </span>
            <span className="text-gray-400 ml-2">{t("tool_tip_text")}</span>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => !isGlobalLoading && setModalOpen(false)}
          />

          <div className="relative bg-[#0a0a0a] border-2 border-white/10 rounded-2xl overflow-hidden max-w-xl w-full shadow-2xl">
            {isGlobalLoading && (
              <div className="absolute inset-0 z-50 bg-black/90 flex flex-col items-center justify-center text-center p-6">
                <Loader2 className="w-12 h-12 text-rose-500 animate-spin mb-4" />
                <h4 className="text-xl font-bold text-white tracking-tight">
                  {isImporting
                    ? t("modal_processing_upload")
                    : t("modal_processing_new")}
                </h4>
                <p className="text-gray-500 text-sm mt-2">
                  {t("modal_processing_desc")}
                </p>
              </div>
            )}

            <div className="h-1 w-full bg-gradient-to-r from-rose-500 via-pink-500 to-orange-500" />

            <div className="p-8 sm:p-12">
              <button
                onClick={() => !isGlobalLoading && setModalOpen(false)}
                disabled={isGlobalLoading}
                className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-all"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>

              <div className="text-center">
                <div className="w-20 h-20 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {actionType === "new" ? (
                    <Edit3 className="w-10 h-10 text-rose-500" />
                  ) : (
                    <Upload className="w-10 h-10 text-rose-500" />
                  )}
                </div>

                <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">
                  {actionType === "new"
                    ? t("modal_new_title")
                    : t("modal_upload_title")}
                </h3>
                <p className="text-gray-400 font-medium mb-10">
                  {actionType === "new"
                    ? t("modal_new_desc")
                    : t("modal_upload_desc")}
                </p>

                {actionType === "new" ? (
                  <button
                    onClick={handleStartScratch}
                    disabled={isGlobalLoading}
                    className="w-full flex items-center justify-center gap-3 bg-rose-600 text-white font-bold py-5 rounded-lg hover:bg-rose-500 transition-all active:scale-[0.98] shadow-xl shadow-rose-600/20 disabled:opacity-50"
                  >
                    <ArrowRight className="w-5 h-5" />
                    {t("modal_new_button")}
                  </button>
                ) : (
                  <div
                    className={`border-2 border-dashed rounded-xl p-10 cursor-pointer transition-all ${
                      dragActive
                        ? "border-rose-500 bg-rose-500/10"
                        : "border-white/10 hover:border-rose-500/50 hover:bg-white/[0.02]"
                    }`}
                    onClick={() =>
                      !isGlobalLoading && fileInputRef.current?.click()
                    }
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf"
                      disabled={isGlobalLoading}
                    />
                    <Upload className="w-10 h-10 text-gray-600 mx-auto mb-4" />
                    <span className="block text-white font-bold text-lg mb-2">
                      {t("modal_upload_placeholder")}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {t("modal_upload_info")}
                    </span>
                  </div>
                )}

                <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mt-8 flex items-center justify-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5" />{" "}
                  {t("modal_security_badge")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
