"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Upload,
  Loader2,
  RefreshCw,
  Check,
  X,
  Sparkles,
  Layout,
  FileType,
  FileWarning,
  Hourglass,
  Lock,
  Eye,
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { uploadAndTranscribe } from "../lib/api-service";
import { useTranslations } from "next-intl";

const PDFJS_VERSION = "3.11.174";
const TRIAL_MAX_PAGES = 1;

// Load pdf.js from the CDN at runtime so the bundler never sees it
let pdfjsPromise = null;

const loadPdfJs = () => {
  if (typeof window === "undefined") return Promise.reject();
  if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);

  if (!pdfjsPromise) {
    pdfjsPromise = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.min.js`;
      s.onload = () => resolve(window.pdfjsLib);
      s.onerror = () => {
        pdfjsPromise = null;
        reject(new Error("Failed to load pdf.js"));
      };
      document.head.appendChild(s);
    });
  }

  return pdfjsPromise;
};

/* ------------------------------------------------------------------ */
/* One PDF page: lazy-rendered, fitted to the given width              */
/* ------------------------------------------------------------------ */

function PdfPage({ pdf, pageNum, width, root }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const [near, setNear] = useState(false);
  const [ratio, setRatio] = useState(1.414);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || !root) return;

    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setNear(true),
      { root, rootMargin: "1000px 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [root]);

  useEffect(() => {
    if (!near || !width) return;

    let task;
    let cancelled = false;

    (async () => {
      const page = await pdf.getPage(pageNum);
      if (cancelled) return;

      const base = page.getViewport({ scale: 1 });
      const viewport = page.getViewport({ scale: width / base.width });
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = Math.floor(viewport.width * dpr);
      canvas.height = Math.floor(viewport.height * dpr);
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;

      setRatio(viewport.height / viewport.width);

      const ctx = canvas.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      task = page.render({ canvasContext: ctx, viewport });

      try {
        await task.promise;
      } catch {
        /* render cancelled */
      }
    })();

    return () => {
      cancelled = true;
      task?.cancel();
    };
  }, [near, pdf, pageNum, width]);

  return (
    <div
      ref={wrapRef}
      data-page={pageNum}
      className="bg-white shadow-[0_1px_6px_rgba(0,0,0,0.18)] mx-auto"
      style={{ width, height: width * ratio }}
    >
      <canvas ref={canvasRef} className="block" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Full-screen document viewer                                         */
/* ------------------------------------------------------------------ */

function DocumentViewer({
  t,
  fileUrl,
  token,
  title,
  onClose,
  maxPages,
  ctaHref,
}) {
  const scrollRef = useRef(null);
  const closeRef = useRef(onClose);

  closeRef.current = onClose;

  const [mounted, setMounted] = useState(false);
  const [pdf, setPdf] = useState(null);
  const [status, setStatus] = useState("loading");
  const [pageWidth, setPageWidth] = useState(0);
  const [current, setCurrent] = useState(1);
  const [root, setRoot] = useState(null);

  // Portal target + lock page scroll + Esc to close
  useEffect(() => {
    setMounted(true);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") closeRef.current?.();
    };

    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  // Load the PDF
  useEffect(() => {
    let cancelled = false;
    let loadingTask;

    setStatus("loading");

    (async () => {
      try {
        if (!fileUrl) throw new Error("No preview URL");

        const pdfjs = await loadPdfJs();

        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.worker.min.js`;

        loadingTask = pdfjs.getDocument({
          url: fileUrl,
          httpHeaders: token ? { Authorization: `Bearer ${token}` } : undefined,
        });

        const doc = await loadingTask.promise;
        if (cancelled) return;

        setPdf(doc);
        setStatus("ready");
      } catch (e) {
        console.error("Preview load failed:", e);
        if (!cancelled) setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
      loadingTask?.destroy();
    };
  }, [fileUrl, token]);

  // Responsive: page width follows the container
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    setRoot(el);

    let timer;

    const measure = () => {
      const pad = window.innerWidth < 640 ? 24 : 48;
      setPageWidth(Math.max(200, Math.min(el.clientWidth - pad, 900)));
    };

    measure();

    const ro = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(measure, 120);
    });

    ro.observe(el);

    return () => {
      ro.disconnect();
      clearTimeout(timer);
    };
  }, [status, mounted]);

  const total = pdf ? pdf.numPages : 0;

  // Free preview intentionally shows only one page.
  const shown = pdf ? Math.min(total, maxPages || total) : 0;

  // Page X / Y badge
  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    const line = el.getBoundingClientRect().top + el.clientHeight / 3;
    let active = 1;

    el.querySelectorAll("[data-page]").forEach((p) => {
      if (p.getBoundingClientRect().top <= line) {
        active = Number(p.dataset.page);
      }
    });

    setCurrent(active);
  };

  if (!mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-[200] flex flex-col bg-[#e5e7eb] animate-in fade-in duration-200"
      style={{ height: "100dvh" }}
    >
      {/* Header */}
      <div
        className="shrink-0 bg-[#1f1f21] text-white"
        style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
      >
        <div className="flex items-center gap-2 h-14 px-4">
          <p className="flex-1 min-w-0 truncate text-[15px] font-medium">
            {title}
          </p>

          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-semibold text-white/60 mr-1">
            <Lock className="w-3.5 h-3.5" />
            {t("viewer_preview_only")}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 active:bg-white/15 transition-colors"
            aria-label={t("viewer_close")}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="relative flex-1 min-h-0">
        {status === "loading" && (
          <div className="absolute inset-0 grid place-items-center text-neutral-600 text-sm">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-7 h-7 animate-spin" />
              {t("viewer_loading")}
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="absolute inset-0 grid place-items-center text-neutral-700 text-sm px-6 text-center">
            <div className="flex flex-col items-center gap-3">
              <FileWarning className="w-7 h-7 text-red-500" />
              {t("viewer_error")}
              <button
                onClick={onClose}
                className="mt-1 px-4 py-2 rounded-lg bg-neutral-900 text-white text-sm font-semibold"
              >
                {t("viewer_close")}
              </button>
            </div>
          </div>
        )}

        {status === "ready" && (
          <>
            <div
              ref={scrollRef}
              onScroll={onScroll}
              className="h-full overflow-y-auto overflow-x-hidden overscroll-contain py-4 sm:py-6 space-y-4"
            >
              {Array.from({ length: shown }, (_, i) => (
                <PdfPage
                  key={i + 1}
                  pdf={pdf}
                  pageNum={i + 1}
                  width={pageWidth}
                  root={root}
                />
              ))}

              {/* Space for the conversion paywall */}
              <div className="h-44 sm:h-40" />
            </div>

            {/* Conversion paywall */}
            <div className="absolute inset-x-0 bottom-0 z-20 pointer-events-none">
              <div className="h-24 bg-gradient-to-t from-[#e5e7eb] via-[#e5e7eb]/95 to-transparent" />

              <div className="px-3 pb-3 sm:px-5 sm:pb-5">
                <div className="pointer-events-auto mx-auto w-full max-w-[900px] rounded-2xl border border-black/10 bg-white/95 shadow-[0_8px_35px_rgba(0,0,0,0.18)] backdrop-blur-md">
                  <div className="p-4 sm:p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex-1 min-w-0 text-center sm:text-left">
                        <div className="flex items-center justify-center sm:justify-start gap-2 mb-1.5">
                          <div className="w-7 h-7 rounded-full bg-blue-600/10 grid place-items-center">
                            <Lock className="w-3.5 h-3.5 text-emerald-600" />
                          </div>

                          <h4 className="text-sm sm:text-base font-bold text-neutral-900">
                            {t("paywall_title")}
                          </h4>
                        </div>

                        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                          {t("paywall_desc")}
                        </p>

                        {/* <p className="mt-1.5 text-[11px] sm:text-xs font-medium text-neutral-500">
                          {t("paywall_subtext")}
                        </p> */}
                      </div>

                      <div className="shrink-0 text-center sm:text-right">
                        <div className="mb-2">
                          {/* <span className="text-lg font-extrabold text-neutral-900">
                            {t("paywall_price")}
                          </span> */}

                          {/* <span className="text-[11px] font-medium text-neutral-500 ml-1">
                            {t("paywall_price_suffix")}
                          </span> */}
                        </div>

                        {ctaHref && (
                          <a
                            href={ctaHref}
                            className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold py-3 px-6 rounded-lg shadow-lg shadow-blue-600/20 transition-colors"
                          >
                            {t("paywall_button")}
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-neutral-100 text-center text-[10px] sm:text-[11px] font-medium text-neutral-500">
                      {t("paywall_footer")}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview badge */}
            <div className="pointer-events-none absolute top-4 right-4 rounded-lg bg-black/65 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur">
              {t("viewer_preview_badge")}
            </div>

            {/* Page badge */}
            <div className="pointer-events-none absolute bottom-[190px] right-4 hidden sm:block rounded-lg bg-black/65 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur">
              {t("viewer_page_of", { current, total })}
            </div>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}

/* ------------------------------------------------------------------ */
/* Main tool                                                           */
/* ------------------------------------------------------------------ */

export default function WordToolInterface({ locale, translation, authToken }) {
  const t = useTranslations(translation); // translation should be "WordPage"

  const [files, setFiles] = useState([]);
  const [resultDoc, setResultDoc] = useState(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef(null);

  const getAppUrl = (path) => {
    const base = `https://app.noteocr.com${path}`;

    if (!locale || locale === "en") return base;

    const separator = path.includes("?") ? "&" : "?";
    return `${base}${separator}lng=${locale}`;
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

  // Mutation for uploading
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
      const backendMessage =
        error?.response?.data?.error ||
        error?.message ||
        t("toast_error_conversion");

      showToast(t("toast_title_error"), backendMessage, "error");

      setFiles([]);

      if (fileInputRef.current) fileInputRef.current.value = "";
    },
  });

  const generateRandomDocName = (baseName = "noteocr_word") => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `${baseName}_${timestamp}_${random}`;
  };

  const processFiles = async (selectedFiles) => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    // Clear input immediately so re-uploading the same file works
    if (fileInputRef.current) fileInputRef.current.value = "";

    // The free web preview processes one image at a time.
    // Batch processing is reserved for paid plans.
    if (selectedFiles.length > 1) {
      showToast(t("toast_title_one_image"), t("toast_msg_one_image"), "error");
      return;
    }

    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    const maxSize = 25 * 1024 * 1024;
    const validatedFiles = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const currentFile = selectedFiles[i];

      if (!validTypes.includes(currentFile.type)) {
        showToast(
          t("toast_title_invalid_file"),
          t("toast_error_type"),
          "error",
        );
        return;
      }

      if (currentFile.size > maxSize) {
        showToast(
          t("toast_title_file_too_large"),
          t("toast_error_size"),
          "error",
        );
        return;
      }

      validatedFiles.push(currentFile);
    }

    setFiles(validatedFiles);

    try {
      const base64Strings = await Promise.all(
        validatedFiles.map(
          (file) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => resolve(reader.result.split(",")[1]);
              reader.onerror = (error) => reject(error);
            }),
        ),
      );

      handleUpload({
        images: base64Strings,
        userId: "67b746ab6256a6bdb691b18a",
        conversionType: "imageToWord",
        documentName: generateRandomDocName(),
        folder: "Personal",
        updating: false,
      });
    } catch (err) {
      showToast(
        t("toast_title_processing_error"),
        t("toast_msg_processing_error"),
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
    setViewerOpen(false);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /*
   * PDF preview URL.
   * Uses resultDoc.previewUrl if your API returns it,
   * otherwise falls back to the same endpoint your
   * mobile app uses.
   */
  const getPreviewUrl = (doc) => {
    if (!doc) return null;

    if (doc.previewUrl) return doc.previewUrl;

    const api = process.env.NEXT_PUBLIC_API_URL;

    return `${api}/users/preview-document/${
      doc.userId || "67b746ab6256a6bdb691b18a"
    }/${encodeURIComponent(
      doc.folder || "Personal",
    )}/${encodeURIComponent(doc.name)}`;
  };

  /*
   * The free preview proves the OCR result first.
   * The actual document becomes usable after the
   * visitor continues into the NoteOCR platform.
   */
  const ctaHref = resultDoc ? getAppUrl("/signup?source=ocr-preview") : null;

  return (
    <div className="w-full max-w-3xl mx-auto relative px-2">
      {/* FULL-SCREEN VIEWER */}
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

      {/* TOASTER UI */}
      <div
        className={`fixed top-13 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 ${
          toastState.visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div
          className={`flex items-start gap-3 p-4 rounded-xl shadow-2xl border backdrop-blur-md w-[90vw] max-w-[400px] ${
            toastState.type === "error"
              ? "bg-red-500/10 border-red-500/20"
              : "bg-blue-500/10 border-blue-500/20 shadow-blue-900/20"
          }`}
        >
          <div className="shrink-0 pt-0.5">
            {toastState.type === "error" ? (
              <FileWarning className="w-5 h-5 text-red-500" />
            ) : (
              <Check className="w-5 h-5 text-blue-500" />
            )}
          </div>

          <div className="flex-1 text-left">
            <h4
              className={`text-sm font-bold ${
                toastState.type === "error" ? "text-red-400" : "text-blue-400"
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
              ? "border-blue-500 bg-blue-500/5"
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

            if (e.dataTransfer.files) {
              processFiles(Array.from(e.dataTransfer.files));
            }
          }}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={onFileChange}
            accept="image/jpeg,image/jpg,image/png,image/webp"
            className="hidden"
          />

          {/* 1. IDLE STATE */}
          {files.length === 0 && !isProcessing && !resultDoc && (
            <div className="text-center p-6 animate-in fade-in duration-500">
              <div
                onClick={() => fileInputRef.current.click()}
                className="w-20 h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 cursor-pointer hover:border-blue-500/50 transition-all group"
              >
                <Upload className="w-10 h-10 text-blue-500 group-hover:scale-110 transition-transform" />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold mb-2">
                {t("tool_upload_title")}
              </h3>

              <p className="text-gray-500 text-sm mb-8 px-4 leading-relaxed">
                {t("tool_upload_desc")}
              </p>

              <button
                onClick={() => fileInputRef.current.click()}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-10 rounded-lg shadow-lg active:scale-95 transition-all"
              >
                {t("tool_upload_button")}
              </button>

              <p className="mt-3 text-[11px] text-gray-600">
                {t("tool_upload_hint")}
              </p>
            </div>
          )}

          {/* 2. PROCESSING STATE */}
          {isProcessing && (
            <div className="text-center p-6 w-full max-w-sm animate-in fade-in duration-300">
              <div className="relative w-20 h-20 mx-auto mb-8">
                <Loader2 className="w-full h-full text-blue-500 animate-spin" />
              </div>

              <h3 className="text-lg font-bold mb-6 text-white">
                {t("tool_processing_title")}
              </h3>

              <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 text-left backdrop-blur-sm">
                <div className="flex gap-3">
                  <Hourglass className="w-5 h-5 text-blue-500 shrink-0 animate-pulse mt-0.5" />

                  <div>
                    <p className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-1">
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

          {/* 3. SUCCESS STATE */}
          {resultDoc && !isProcessing && (
            <div className="text-center p-6 w-full max-w-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-20 h-20 bg-blue-500/10 border-2 border-blue-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-blue-500" />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold mb-2">
                {t("tool_complete_title")}
              </h3>

              <p className="text-gray-500 text-sm mb-8">
                {t("tool_complete_desc")}
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setViewerOpen(true)}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-lg shadow-lg active:scale-95 transition-all"
                >
                  <Eye className="w-5 h-5" />
                  {t("tool_view_preview")}
                </button>

                <button
                  onClick={resetTool}
                  className="text-xs text-gray-500 hover:text-white transition-colors"
                >
                  <RefreshCw className="w-3 h-3 inline mr-1" />
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
            icon: Layout,
            title: t("tool_info_1_title"),
            desc: t("tool_info_1_desc"),
          },
          {
            icon: Sparkles,
            title: t("tool_info_2_title"),
            desc: t("tool_info_2_desc"),
          },
          {
            icon: FileType,
            title: t("tool_info_3_title"),
            desc: t("tool_info_3_desc"),
          },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white/[0.03] border border-white/5 rounded-xl p-4"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <item.icon className="w-4 h-4 text-blue-500" />

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
