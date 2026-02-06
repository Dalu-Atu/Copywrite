"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Upload,
  FileSpreadsheet,
  Loader2,
  Download,
  RefreshCw,
  Check,
  X,
  Sparkles,
  Grid3X3,
  Table,
  AlertCircle,
  FileWarning, // Icon for file type errors
  AlertTriangle,
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { uploadAndTranscribe, downloadDocument } from "../lib/api-service";
// import { toast } from "react-hot-toast"; <--- Removed this
import { useTranslations } from "next-intl";

export default function ExcelToolInterface({ locale, translation }) {
  const t = useTranslations(translation);
  const [file, setFile] = useState(null);
  const [resultDoc, setResultDoc] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // --- CUSTOM TOASTER STATE ---
  const [toastState, setToastState] = useState({
    visible: false,
    title: "",
    message: "",
    type: "error", // 'success' or 'error'
  });

  // Helper to show the custom toast
  const showToast = (title, message, type = "error") => {
    setToastState({ visible: true, title, message, type });

    // Auto hide after 4 seconds
    setTimeout(() => {
      setToastState((prev) => ({ ...prev, visible: false }));
    }, 6000);
  };

  const closeToast = () => {
    setToastState((prev) => ({ ...prev, visible: false }));
  };
  // ---------------------------

  // Mutation for uploading
  const { mutate: handleUpload, isPending: isProcessing } = useMutation({
    mutationFn: uploadAndTranscribe,
    onSuccess: (data) => {
      if (data.success) {
        setResultDoc(data.document);
        showToast("Success", t("toast_success"), "success");
      }
    },
    onError: (error) => {
      showToast(
        "Extraction Failed",
        error?.response?.data?.message || t("toast_error_extraction"),
        "error"
      );
      setFile(null);
    },
  });

  const generateRandomDocName = (baseName = "noteocr_table") => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `${baseName}_${timestamp}_${random}`;
  };

  const processFile = async (selectedFile) => {
    // Validate file type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!validTypes.includes(selectedFile.type)) {
      // TRIGGER CUSTOM TOASTER HERE
      showToast(
        "Invalid File Type",
        "Only image files are allowed. Please upload a JPG, PNG, or WEBP.",
        "error"
      );
      return;
    }

    // Validate file size (25MB limit)
    const maxSize = 25 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      showToast("File Too Large", t("toast_error_size"), "error");
      return;
    }

    setFile(selectedFile);
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
      const base64String = reader.result.split(",")[1];

      handleUpload({
        images: [base64String],
        userId: "67b746ab6256a6bdb691b18a",
        conversionType: "imageToExcel",
        documentName: generateRandomDocName(),
        folder: "Personal",
        updating: false,
      });
    };
  };

  const onFileChange = (e) => {
    if (e.target.files?.[0]) {
      processFile(e.target.files[0]);
    }
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
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleDownload = async () => {
    try {
      await downloadDocument({
        userId: resultDoc.userId,
        folder: resultDoc.folder,
        fileName: resultDoc.name,
      });
      showToast("Downloaded", t("toast_download_success"), "success");
    } catch (err) {
      showToast("Error", t("toast_download_error"), "error");
    }
  };

  const resetTool = () => {
    setFile(null);
    setResultDoc(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="w-full max-w-3xl mx-auto relative">
      {/* --- CUSTOM TOASTER COMPONENT UI --- */}
      <div
        className={`fixed top-16 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ease-in-out ${
          toastState.visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div
          className={`
          flex items-start gap-4 p-4 rounded-xl shadow-2xl border backdrop-blur-md w-[350px] sm:w-[400px]
          ${
            toastState.type === "error"
              ? "bg-red-500/10 border-red-500/20 shadow-[0_0_30px_-10px_rgba(239,68,68,0.3)]"
              : "bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_30px_-10px_rgba(16,185,129,0.3)]"
          }
        `}
        >
          {/* Icon Box */}
          <div
            className={`
            w-10 h-10 rounded-full flex items-center justify-center shrink-0 border
            ${
              toastState.type === "error"
                ? "bg-red-500/20 border-red-500/30"
                : "bg-emerald-500/20 border-emerald-500/30"
            }
          `}
          >
            {toastState.type === "error" ? (
              <FileWarning className="w-5 h-5 text-red-500" />
            ) : (
              <Check className="w-5 h-5 text-emerald-500" />
            )}
          </div>

          {/* Text Content */}
          <div className="flex-1 pt-0.5">
            <h4
              className={`text-sm font-bold mb-1 ${
                toastState.type === "error"
                  ? "text-red-400"
                  : "text-emerald-400"
              }`}
            >
              {toastState.title}
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              {toastState.message}
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={closeToast}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      {/* ----------------------------------- */}

      {/* Main Card */}
      <div className="bg-[#0a0a0a] border-2 border-white/10 rounded-2xl p-3 shadow-2xl">
        <div
          className={`
            border-2 border-dashed rounded-xl min-h-[400px] 
            flex flex-col items-center justify-center 
            relative overflow-hidden transition-all
            ${
              dragActive
                ? "border-emerald-500 bg-emerald-500/5"
                : "border-white/10 bg-white/[0.02]"
            }
            ${isProcessing ? "pointer-events-none" : ""}
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={onFileChange}
            accept="image/*"
            className="hidden"
            disabled={isProcessing}
          />

          {/* STATE: IDLE (Upload) */}
          {!file && !isProcessing && (
            <div className="text-center p-8 max-w-md">
              <div className="relative mb-8">
                <div
                  onClick={() => fileInputRef.current.click()}
                  className="w-24 h-24 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto cursor-pointer hover:bg-white/10 hover:border-emerald-500/50 hover:scale-105 transition-all group"
                >
                  <Upload className="w-12 h-12 text-emerald-500 group-hover:text-emerald-400 transition-colors" />
                </div>
                <div className="absolute top-0 right-1/2 translate-x-12 -translate-y-2">
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-full p-2">
                    <Grid3X3 className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-3">
                {t("tool_upload_title")}
              </h3>
              <p className="text-gray-500 mb-8 leading-relaxed">
                {t("tool_upload_desc")}
              </p>

              <button
                onClick={() => fileInputRef.current.click()}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-10 rounded-lg transition-all hover:scale-105 shadow-lg shadow-emerald-600/20 mb-6"
              >
                {t("tool_upload_button")}
              </button>

              <div className="flex items-center justify-center gap-6 text-[10px] text-gray-600 font-mono uppercase tracking-wider">
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
          )}

          {/* STATE: PROCESSING */}
          {isProcessing && (
            <div className="text-center p-8">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-white/5 border border-emerald-500/30 rounded-2xl mx-auto flex items-center justify-center">
                  <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 border-2 border-emerald-500/20 rounded-full animate-ping"></div>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2">
                {t("tool_processing_title")}
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                {t("tool_processing_desc")}
              </p>

              <div className="max-w-xs mx-auto">
                <div className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/5 rounded-lg mb-2">
                  <div className="w-8 h-8 bg-emerald-500/10 rounded flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="text-left text-xs">
                    <div className="font-bold text-white">{file?.name}</div>
                    <div className="text-gray-600">
                      {(file?.size / 1024).toFixed(0)} KB
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STATE: COMPLETE */}
          {resultDoc && !isProcessing && (
            <div className="text-center p-8 max-w-md">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto">
                  <FileSpreadsheet className="w-12 h-12 text-emerald-500" />
                </div>
                <div className="absolute -top-2 -right-2 bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
                  {t("tool_complete_status")}
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-2">
                {t("tool_complete_title")}
              </h3>
              <p className="text-gray-500 mb-8">{t("tool_complete_desc")}</p>

              {/* File Info Card */}
              <div className="bg-white/[0.02] border border-white/5 rounded-lg p-4 mb-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500/10 rounded flex items-center justify-center">
                      <Table className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div className="text-left text-sm">
                      <div className="font-bold">{resultDoc.name}</div>
                      <div className="text-gray-600 text-xs">
                        {t("tool_complete_file_type")}
                      </div>
                    </div>
                  </div>
                  <Check className="w-6 h-6 text-emerald-500" />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleDownload}
                  className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-6 rounded-lg shadow-lg shadow-emerald-600/20 transition-all hover:scale-105"
                >
                  <Download className="w-5 h-5" /> {t("tool_download_button")}
                </button>
                <button
                  onClick={resetTool}
                  className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-4 px-6 rounded-lg transition-all"
                >
                  <RefreshCw className="w-4 h-4" /> {t("tool_new_button")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info Cards Below */}
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white/[0.02] border border-white/5 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <Grid3X3 className="w-5 h-5 text-emerald-500" />
            <span className="text-sm font-bold">{t("tool_info_1_title")}</span>
          </div>
          <p className="text-xs text-gray-600">{t("tool_info_1_desc")}</p>
        </div>

        <div className="bg-white/[0.02] border border-white/5 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-5 h-5 text-emerald-500" />
            <span className="text-sm font-bold">{t("tool_info_2_title")}</span>
          </div>
          <p className="text-xs text-gray-600">{t("tool_info_2_desc")}</p>
        </div>

        <div className="bg-white/[0.02] border border-white/5 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-2">
            <FileSpreadsheet className="w-5 h-5 text-emerald-500" />
            <span className="text-sm font-bold">{t("tool_info_3_title")}</span>
          </div>
          <p className="text-xs text-gray-600">{t("tool_info_3_desc")}</p>
        </div>
      </div>

      {/* Quality Tips */}
      <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <div className="text-sm">
            <span className="font-bold text-blue-400">
              {t("tool_tip_label")}
            </span>
            <span className="text-gray-400 ml-2">{t("tool_tip_text")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
