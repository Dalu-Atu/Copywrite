"use client";

import React, { useState, useRef } from "react";
import {
  Edit3,
  Cloud,
  ShieldCheck,
  Zap,
  Upload,
  FileText,
  FileSpreadsheet,
  X,
  Loader2,
  Presentation,
  CheckCircle2,
  Check,
  Globe,
  Sparkles,
  AlertCircle,
  Plus,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

const ACCEPTED_MIME_TYPES = [
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.oasis.opendocument.text",
  "application/rtf",
  "text/plain",
  "application/vnd.ms-works",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.oasis.opendocument.spreadsheet",
  "text/csv",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.oasis.opendocument.presentation",
].join(",");

export default function EditorClientContent({ locale }) {
  const t = useTranslations("EditorPage");
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const userId = "67b746ab6256a6bdb691b18a";

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
      toast.success("Workspace Initialized");
      const { document } = data;
      window.location.href = `https://app.noteocr.com/trial-editor/${document.folder}/${document.name}`;
    },
    onError: (err) =>
      toast.error(err?.response?.data?.message || "Creation failed"),
  });

  const { mutate: importFile, isPending: isImporting } = useMutation({
    mutationFn: async (formData) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/upload`,
        formData
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["user"]);
      toast.success("Document imported");
      const { document } = data;
      window.location.href = `https://app.noteocr.com/trial-editor/${document.dest}/${document.name}`;
    },
    onError: (err) =>
      toast.error(err.response?.data?.message || "Upload failed"),
  });

  const handleSelection = (docType) => {
    if (isCreating) return;
    createBlankDoc({
      userId,
      folderName: "Personal",
      documentName: `UNTITLED_${new Date().getTime()}`,
      fileType:
        docType === "word" ? "docx" : docType === "excel" ? "xlsx" : "pptx",
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Validate file size
    const maxSize = 25 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      toast.error("File size must be under 25MB");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("userId", userId);
    formData.append("folderName", "Personal");
    importFile(formData);
  };

  // Drag and drop handlers
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
      const fakeEvent = { target: { files: [e.dataTransfer.files[0]] } };
      handleFileChange(fakeEvent);
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
          {/* IDLE STATE - Choice Buttons */}
          <div className="text-center p-8 max-w-md">
            <div className="relative mb-8">
              <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto">
                <Cloud className="w-12 h-12 text-purple-500" />
              </div>
              <div className="absolute top-0 right-1/2 translate-x-12 -translate-y-2">
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-full p-2">
                  <Globe className="w-4 h-4 text-purple-400" />
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-3">
              {t("editor_card_title")}
            </h3>
            <p className="text-gray-500 mb-8 leading-relaxed">
              {t("editor_card_subtitle")}
            </p>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => openModal("new")}
                className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 px-10 rounded-lg transition-all hover:scale-105 shadow-lg shadow-purple-600/20 flex items-center justify-center gap-3"
              >
                <Plus className="w-5 h-5" />
                {t("editor_btn_new")}
              </button>

              <button
                onClick={() => openModal("upload")}
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-4 px-10 rounded-lg transition-all flex items-center justify-center gap-3"
              >
                <Upload className="w-5 h-5" />
                {t("editor_btn_upload")}
              </button>
            </div>

            <div className="flex items-center justify-center gap-6 text-[10px] text-gray-600 font-mono uppercase tracking-wider mt-8">
              <div className="flex items-center gap-1">
                <Check className="w-3 h-3" /> {t("editor_info_1")}
              </div>
              <div className="flex items-center gap-1">
                <Check className="w-3 h-3" /> {t("editor_info_2")}
              </div>
              <div className="flex items-center gap-1">
                <Check className="w-3 h-3" /> {t("editor_info_3")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Cards Below */}
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white/[0.02] border border-white/5 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <Globe className="w-5 h-5 text-purple-500" />
            <span className="text-sm font-bold">
              {t("editor_feature_1_title")}
            </span>
          </div>
          <p className="text-xs text-gray-600">{t("editor_feature_1_desc")}</p>
        </div>

        <div className="bg-white/[0.02] border border-white/5 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <span className="text-sm font-bold">
              {t("editor_feature_2_title")}
            </span>
          </div>
          <p className="text-xs text-gray-600">{t("editor_feature_2_desc")}</p>
        </div>

        <div className="bg-white/[0.02] border border-white/5 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <Cloud className="w-5 h-5 text-purple-500" />
            <span className="text-sm font-bold">
              {t("editor_feature_3_title")}
            </span>
          </div>
          <p className="text-xs text-gray-600">{t("editor_feature_3_desc")}</p>
        </div>
      </div>

      {/* Quality Tips */}
      <div className="mt-6 p-4 bg-purple-500/5 border border-purple-500/20 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
          <div className="text-sm">
            <span className="font-bold text-purple-400">
              {t("editor_tip_label")}
            </span>
            <span className="text-gray-400 ml-2">{t("editor_tip_text")}</span>
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

          <div className="relative bg-[#0a0a0a] border-2 border-white/10 rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl">
            {isGlobalLoading && (
              <div className="absolute inset-0 z-50 bg-black/90 flex flex-col items-center justify-center text-center p-6">
                <Loader2 className="w-12 h-12 text-purple-500 animate-spin mb-4" />
                <h4 className="text-xl font-bold text-white tracking-tight">
                  {isImporting ? t("loading_importing") : t("loading_creating")}
                </h4>
                <p className="text-gray-500 text-sm mt-2">
                  {t("loading_subtitle")}
                </p>
              </div>
            )}

            <div className="h-1 w-full bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500" />

            <div className="p-8 sm:p-12">
              <button
                onClick={() => !isGlobalLoading && setModalOpen(false)}
                disabled={isGlobalLoading}
                className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-all"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>

              <div className="text-center">
                <div className="w-20 h-20 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {actionType === "new" ? (
                    <Edit3 className="w-10 h-10 text-purple-500" />
                  ) : (
                    <Upload className="w-10 h-10 text-purple-500" />
                  )}
                </div>

                <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">
                  {actionType === "new"
                    ? t("modal_new_title")
                    : t("modal_upload_title")}
                </h3>
                <p className="text-gray-400 font-medium mb-10">
                  {actionType === "new"
                    ? t("modal_new_subtitle")
                    : t("modal_upload_subtitle")}
                </p>

                {actionType === "new" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <DocOption
                      onClick={() => handleSelection("word")}
                      icon={<FileText className="w-6 h-6 text-blue-500" />}
                      label={t("modal_doc_word")}
                      sub={t("modal_doc_word_sub")}
                    />
                    <DocOption
                      onClick={() => handleSelection("excel")}
                      icon={
                        <FileSpreadsheet className="w-6 h-6 text-emerald-500" />
                      }
                      label={t("modal_doc_excel")}
                      sub={t("modal_doc_excel_sub")}
                    />
                    <DocOption
                      onClick={() => handleSelection("powerpoint")}
                      icon={
                        <Presentation className="w-6 h-6 text-orange-500" />
                      }
                      label={t("modal_doc_powerpoint")}
                      sub={t("modal_doc_powerpoint_sub")}
                    />
                  </div>
                ) : (
                  <div
                    className={`border-2 border-dashed rounded-xl p-10 cursor-pointer transition-all ${
                      dragActive
                        ? "border-purple-500 bg-purple-500/10"
                        : "border-white/10 hover:border-purple-500/50 hover:bg-white/[0.02]"
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
                      accept={ACCEPTED_MIME_TYPES}
                      disabled={isGlobalLoading}
                    />
                    <Upload className="w-10 h-10 text-gray-600 mx-auto mb-4" />
                    <span className="block text-white font-bold text-lg mb-2">
                      {t("modal_upload_text")}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {t("modal_upload_formats")}
                    </span>
                  </div>
                )}

                <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mt-8 flex items-center justify-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5" /> {t("modal_security")}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DocOption({ onClick, icon, label, sub }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center p-6 rounded-xl border border-white/10 bg-white/[0.02] hover:border-purple-500/50 hover:bg-white/[0.04] hover:shadow-lg transition-all text-center group"
    >
      <div className="p-3 bg-white/5 rounded-lg group-hover:bg-purple-500/10 transition-colors mb-4">
        {icon}
      </div>
      <span className="font-bold text-white text-sm mb-1">{label}</span>
      <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">
        {sub}
      </span>
    </button>
  );
}
