"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { Loader2, Upload, FileWarning, Check, X } from "lucide-react";
import { uploadAndTranscribe } from "../lib/api-service";
import { DocumentViewer } from "./DocumentViewer";

const TRIAL_MAX_PAGES = 1;
const VALID_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_SIZE = 25 * 1024 * 1024;

const ConverterContext = createContext(null);

export function useConverter() {
  const ctx = useContext(ConverterContext);
  if (!ctx)
    throw new Error("useConverter must be used inside <ConverterProvider>");
  return ctx;
}

export function ConverterProvider({
  children,
  locale,
  authToken,
  conversionType = "imageToWord",
  translation = "WordPage", // namespace that holds the tool_/toast_/viewer_ keys
}) {
  const t = useTranslations(translation);

  const [resultDoc, setResultDoc] = useState(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [toast, setToast] = useState({
    visible: false,
    title: "",
    message: "",
    type: "error",
  });

  const inputRef = useRef(null);
  const toastTimer = useRef(null);
  const processRef = useRef(null);

  const getAppUrl = (path) => {
    const base = `https://app.noteocr.com${path}`;
    if (!locale || locale === "en") return base;
    return `${base}${path.includes("?") ? "&" : "?"}lng=${locale}`;
  };

  const showToast = (title, message, type = "error") => {
    clearTimeout(toastTimer.current);
    setToast({ visible: true, title, message, type });
    toastTimer.current = setTimeout(
      () => setToast((p) => ({ ...p, visible: false })),
      6000,
    );
  };

  const { mutate: handleUpload, isPending: isProcessing } = useMutation({
    mutationFn: uploadAndTranscribe,
    onSuccess: (data) => {
      if (data.success) {
        setResultDoc(data.document);
        setViewerOpen(true);
        showToast(t("tool_complete_status"), t("toast_success"), "success");
      }
    },
    onError: (error) => {
      const msg =
        error?.response?.data?.error ||
        error?.message ||
        t("toast_error_conversion");
      showToast(t("toast_title_error"), msg, "error");
    },
  });

  const generateRandomDocName = (base = "noteocr_word") =>
    `${base}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

  const processFiles = async (selectedFiles) => {
    if (!selectedFiles?.length || isProcessing) return;
    if (inputRef.current) inputRef.current.value = "";

    if (selectedFiles.length > 1) {
      return showToast(t("toast_title_one_image"), t("toast_msg_one_image"));
    }

    const file = selectedFiles[0];
    if (!VALID_TYPES.includes(file.type)) {
      return showToast(t("toast_title_invalid_file"), t("toast_error_type"));
    }
    if (file.size > MAX_SIZE) {
      return showToast(t("toast_title_file_too_large"), t("toast_error_size"));
    }

    try {
      const base64 = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = reject;
      });

      handleUpload({
        images: [base64],
        userId: "67b746ab6256a6bdb691b18a",
        conversionType,
        documentName: generateRandomDocName(),
        folder: "Personal",
        updating: false,
      });
    } catch {
      showToast(
        t("toast_title_processing_error"),
        t("toast_msg_processing_error"),
      );
    }
  };

  // Always point at the latest closure so window listeners never go stale
  processRef.current = processFiles;

  const openPicker = () => {
    if (!isProcessing) inputRef.current?.click();
  };

  const resetTool = () => {
    setResultDoc(null);
    setViewerOpen(false);
  };

  // Page-wide drag & drop
  useEffect(() => {
    let depth = 0;
    const hasFiles = (e) =>
      Array.from(e.dataTransfer?.types || []).includes("Files");

    const onEnter = (e) => {
      if (!hasFiles(e)) return;
      e.preventDefault();
      depth++;
      setDragActive(true);
    };
    const onOver = (e) => {
      if (hasFiles(e)) e.preventDefault(); // required, or the drop never fires
    };
    const onLeave = (e) => {
      if (!hasFiles(e)) return;
      depth = Math.max(0, depth - 1);
      if (depth === 0) setDragActive(false);
    };
    const onDrop = (e) => {
      if (!hasFiles(e)) return;
      e.preventDefault(); // stops the browser from opening the image
      depth = 0;
      setDragActive(false);
      processRef.current(Array.from(e.dataTransfer.files));
    };

    window.addEventListener("dragenter", onEnter);
    window.addEventListener("dragover", onOver);
    window.addEventListener("dragleave", onLeave);
    window.addEventListener("drop", onDrop);
    return () => {
      window.removeEventListener("dragenter", onEnter);
      window.removeEventListener("dragover", onOver);
      window.removeEventListener("dragleave", onLeave);
      window.removeEventListener("drop", onDrop);
    };
  }, []);

  const ctaHref = resultDoc ? getAppUrl("/signup?source=ocr-preview") : null;

  const getPreviewUrl = (doc) => {
    if (!doc) return null;
    if (doc.previewUrl) return doc.previewUrl;
    const api = process.env.NEXT_PUBLIC_API_URL;
    return `${api}/users/preview-document/${
      doc.userId || "67b746ab6256a6bdb691b18a"
    }/${encodeURIComponent(doc.folder || "Personal")}/${encodeURIComponent(doc.name)}`;
  };

  const value = {
    openPicker,
    processFiles,
    isProcessing,
    dragActive,
    resultDoc,
    resetTool,
    reopenViewer: () => setViewerOpen(true),
  };

  return (
    <ConverterContext.Provider value={value}>
      {children}

      {/* The one and only file input on the page */}
      <input
        ref={inputRef}
        type="file"
        accept={VALID_TYPES.join(",")}
        className="sr-only"
        tabIndex={-1}
        onChange={(e) =>
          e.target.files && processFiles(Array.from(e.target.files))
        }
      />

      {/* Full-page drop overlay */}
      {dragActive && !isProcessing && (
        <div className="pointer-events-none fixed inset-0 z-[150] grid place-items-center bg-blue-600/20 backdrop-blur-sm">
          <div className="m-4 flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-blue-500 bg-white px-10 py-12 shadow-2xl">
            <Upload className="h-10 w-10 text-blue-600" />
            <p className="text-lg font-bold text-neutral-900">
              {t("drop_overlay")}
            </p>
          </div>
        </div>
      )}

      {/* Processing overlay (buttons are all over the page, so this is global) */}
      {isProcessing && (
        <div className="fixed inset-0 z-[180] grid place-items-center bg-black/50 px-4">
          <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-2xl bg-white p-8 text-center shadow-2xl">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            <h3 className="text-lg font-bold text-neutral-900">
              {t("tool_processing_title")}
            </h3>
            <p className="text-xs leading-relaxed text-neutral-600">
              {t("tool_processing_desc")}
            </p>
          </div>
        </div>
      )}

      {/* Toast */}
      <div
        className={`fixed left-1/2 top-4 z-[300] -translate-x-1/2 transition-all duration-300 ${
          toast.visible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <div
          className={`flex w-[90vw] max-w-[400px] items-start gap-3 rounded-xl border bg-white p-4 shadow-2xl ${
            toast.type === "error" ? "border-red-200" : "border-blue-200"
          }`}
        >
          {toast.type === "error" ? (
            <FileWarning className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
          ) : (
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />
          )}
          <div className="flex-1 text-left">
            <h4
              className={`text-sm font-bold ${toast.type === "error" ? "text-red-600" : "text-blue-600"}`}
            >
              {toast.title}
            </h4>
            <p className="text-xs text-neutral-600">{toast.message}</p>
          </div>
          <button
            onClick={() => setToast((p) => ({ ...p, visible: false }))}
            className="text-neutral-400 hover:text-neutral-900"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Result viewer */}
      {resultDoc && viewerOpen && (
        <DocumentViewer
          t={t}
          fileUrl={getPreviewUrl(resultDoc)}
          token={authToken}
          title={resultDoc.name}
          onClose={() => setViewerOpen(false)}
          maxPages={TRIAL_MAX_PAGES}
          ctaHref={ctaHref}
        />
      )}
    </ConverterContext.Provider>
  );
}
