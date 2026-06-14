"use client";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Upload,
  FileSpreadsheet,
  Loader2,
  RefreshCw,
  Check,
  X,
  Sparkles,
  Grid3X3,
  Table,
  FileWarning,
  Hourglass,
  ExternalLink,
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { uploadAndTranscribe } from "../lib/api-service";
import { useTranslations } from "next-intl";

export default function ExcelToolInterface({ locale, translation }) {
  const t = useTranslations(translation); // translation should be "ExcelPage"
  const router = useRouter();
  const [files, setFiles] = useState([]); // Changed from single file to array
  const [resultDoc, setResultDoc] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const getAppUrl = (path) => {
    const base = `https://app.noteocr.com${path}`;
    return locale && locale !== "en" ? `${base}&lng=${locale}` : base;
  };

  // --- CUSTOM TOASTER STATE ---
  const [toastState, setToastState] = useState({
    visible: false,
    title: "",
    message: "",
    type: "error",
  });

  const showToast = (title, message, type = "error") => {
    setToastState({ visible: true, title, message, type });
    setTimeout(() => {
      setToastState((prev) => ({ ...prev, visible: false }));
    }, 6000);
  };

  const closeToast = () => {
    setToastState((prev) => ({ ...prev, visible: false }));
  };

  // --- SUCCESS REDIRECT LOGIC ---
  const redirectToTrial = (document) => {
    const folder = encodeURIComponent(document.folder || "Personal");
    const fileName = encodeURIComponent(document.name);

    // Point to your main React app subdomain
    window.location.href = getAppUrl(
      `/trial-preview?folder=${folder}&file=${fileName}`,
    );
  };

  // Mutation for uploading
  const { mutate: handleUpload, isPending: isProcessing } = useMutation({
    mutationFn: uploadAndTranscribe,
    onSuccess: (data) => {
      if (data.success) {
        setResultDoc(data.document);
        showToast(
          t("tool_complete_status"), // "READY"
          t("toast_success"), // "Table extracted successfully!"
          "success",
        );

        // Auto-redirect after a short delay so they see the success state
        setTimeout(() => {
          redirectToTrial(data.document);
        }, 1200);
      }
    },
    onError: (error) => {
      showToast(
        "Error",
        error?.response?.data?.message || t("toast_error_extraction"),
        "error",
      );
      setFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
  });

  const generateRandomDocName = (baseName = "noteocr_table") => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `${baseName}_${timestamp}_${random}`;
  };

  const processFiles = async (selectedFiles) => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    // Clear input immediately so re-uploading same files works
    if (fileInputRef.current) fileInputRef.current.value = "";

    // --- 10 IMAGE MAX LIMIT CHECK ---
    if (selectedFiles.length > 10) {
      showToast(
        "Limit Exceeded",
        "You cannot transcribe more than 10 images at once.",
        "error",
      );
      return; // ← never reaches backend
    }

    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const maxSize = 25 * 1024 * 1024;
    const validatedFiles = [];

    // Validate all items in batch
    for (let i = 0; i < selectedFiles.length; i++) {
      const currentFile = selectedFiles[i];

      if (!validTypes.includes(currentFile.type)) {
        showToast("Invalid File", t("toast_error_type"), "error");
        return;
      }

      if (currentFile.size > maxSize) {
        showToast("File Too Large", t("toast_error_size"), "error");
        return;
      }

      validatedFiles.push(currentFile);
    }

    setFiles(validatedFiles);

    // Convert all validated images to base64 strings asynchronously
    try {
      const base64Promises = validatedFiles.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result.split(",")[1]);
          reader.onerror = (error) => reject(error);
        });
      });

      const base64Strings = await Promise.all(base64Promises);

      // Fire off backend upload sequence
      handleUpload({
        images: base64Strings,
        userId: "67b746ab6256a6bdb691b18a",
        conversionType: "imageToExcel",
        documentName: generateRandomDocName(),
        folder: "Personal",
        updating: false,
      });
    } catch (err) {
      showToast(
        "Processing Error",
        "Failed to compile your files for upload.",
        "error",
      );
      setFiles([]);
    }
  };

  const onFileChange = (e) => {
    if (e.target.files) processFiles(Array.from(e.target.files));
  };

  const resetTool = () => {
    setFiles([]);
    setResultDoc(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="w-full max-w-3xl mx-auto relative px-2">
      {/* TOASTER UI */}
      <div
        className={`fixed top-11 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 ${
          toastState.visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div
          className={`flex items-start gap-3 p-4 rounded-xl shadow-2xl border backdrop-blur-md w-[90vw] max-w-[400px] ${
            toastState.type === "error"
              ? "bg-red-500/10 border-red-500/20"
              : "bg-emerald-500/10 border-emerald-500/20 shadow-emerald-900/20"
          }`}
        >
          <div className="shrink-0 pt-0.5">
            {toastState.type === "error" ? (
              <FileWarning className="w-5 h-5 text-red-500" />
            ) : (
              <Check className="w-5 h-5 text-emerald-500" />
            )}
          </div>
          <div className="flex-1 text-left">
            <h4
              className={`text-sm font-bold ${
                toastState.type === "error"
                  ? "text-red-400"
                  : "text-emerald-400"
              }`}
            >
              {toastState.title}
            </h4>
            <p className="text-xs text-gray-300">{toastState.message}</p>
          </div>
          <button
            onClick={closeToast}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-[#0a0a0a] border-2 border-white/10 rounded-2xl p-2 sm:p-3 shadow-2xl min-h-[550px] flex flex-col overflow-hidden">
        <div
          className={`flex-1 border-2 border-dashed rounded-xl flex flex-col items-center justify-center relative transition-colors duration-300 ${
            dragActive
              ? "border-emerald-500 bg-emerald-500/5"
              : "border-white/10 bg-white/[0.02]"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            if (e.dataTransfer.files)
              processFiles(Array.from(e.dataTransfer.files));
          }}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={onFileChange}
            accept="image/*"
            multiple // Native browser multi-select hook flag
            className="hidden"
          />

          {/* 1. IDLE STATE */}
          {files.length === 0 && !isProcessing && (
            <div className="text-center p-6 animate-in fade-in duration-500">
              <div
                onClick={() => fileInputRef.current.click()}
                className="w-20 h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 cursor-pointer hover:border-emerald-500/50 transition-all group"
              >
                <Upload className="w-10 h-10 text-emerald-500 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2">
                {t("tool_upload_title")}
              </h3>
              <p className="text-gray-500 text-sm mb-8 px-4 leading-relaxed">
                {t("tool_upload_desc")}
              </p>
              <button
                onClick={() => fileInputRef.current.click()}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-10 rounded-lg shadow-lg active:scale-95 transition-all"
              >
                {t("tool_upload_button")}
              </button>
            </div>
          )}

          {/* 2. PROCESSING STATE */}
          {isProcessing && (
            <div className="text-center p-6 w-full max-w-sm animate-in fade-in duration-300">
              <div className="relative w-20 h-20 mx-auto mb-8">
                <Loader2 className="w-full h-full text-emerald-500 animate-spin" />
              </div>
              <h3 className="text-lg font-bold mb-6 text-white">
                {t("tool_processing_title")}
              </h3>
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 text-left backdrop-blur-sm">
                <div className="flex gap-3">
                  <Hourglass className="w-5 h-5 text-emerald-500 shrink-0 animate-pulse mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1">
                      NoteOCR Engine
                    </p>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {t("tool_processing_desc")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. REDIRECT STATE (Success) */}
          {resultDoc && !isProcessing && (
            <div className="text-center p-6 w-full max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-20 h-20 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-emerald-500" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2">
                {t("tool_complete_title")}
              </h3>
              <p className="text-gray-500 text-sm mb-8">
                {t("tool_complete_desc")}
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => redirectToTrial(resultDoc)}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-lg shadow-lg active:scale-95 transition-all"
                >
                  <ExternalLink className="w-5 h-5" />{" "}
                  {t("tool_download_button")}
                </button>
                <button
                  onClick={resetTool}
                  className="text-xs text-gray-500 hover:text-white transition-colors"
                >
                  <RefreshCw className="w-3 h-3 inline mr-1" />{" "}
                  {t("tool_new_button")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FOOTER INFO CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
        {[
          {
            icon: Grid3X3,
            title: t("tool_info_1_title"),
            desc: t("tool_info_1_desc"),
          },
          {
            icon: Sparkles,
            title: t("tool_info_2_title"),
            desc: t("tool_info_2_desc"),
          },
          {
            icon: FileSpreadsheet,
            title: t("tool_info_3_title"),
            desc: t("tool_info_3_desc"),
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white/[0.03] border border-white/5 rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <item.icon className="w-4 h-4 text-emerald-500" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                {item.title}
              </span>
            </div>
            <p className="text-[11px] text-gray-500 leading-normal">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
