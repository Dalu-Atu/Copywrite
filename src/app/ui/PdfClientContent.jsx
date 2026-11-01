"use client";

import React, { useState, useRef } from "react";
import {
  FileSearch,
  ShieldCheck,
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
  PenLine,
  Table2,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { DocumentViewer } from "../ui/ToolInterface";

// ───────────────────────── config ─────────────────────────
const TRIAL_PAGES = 1; // pages converted free for the preview (raise carefully: each costs OCR)
const MAX_FILE_BYTES = 25 * 1024 * 1024;
const MAX_IMAGE_SIDE = 2000; // px, longest side sent to the OCR endpoint
const TEXT_CHARS_PER_PAGE = 40; // below this average => treat the PDF as scanned
const API = process.env.NEXT_PUBLIC_API_URL;

// ───────────────────────── helpers ─────────────────────────
const track = (name, params = {}) => {
  try {
    window.gtag?.("event", name, { source: "edit_pdf", ...params });
  } catch {
    /* never let analytics break the flow */
  }
};

const randomString = (length) => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join("");
};

// All visitors share one account, so two people uploading "contract.pdf"
// would collide. A random prefix keeps each file name unique.
const uniqueName = (name) =>
  `${randomString(6)}_${name.replace(/[#?%/\\\s]+/g, "_")}`;

const PDFJS_VERSION = "3.11.174";
let pdfjsPromise = null;

// Loaded from the CDN at runtime so the bundler never sees pdf.js
// (this also removes the need for the `canvas` alias in next.config.mjs)
function loadPdfjs() {
  if (typeof window === "undefined") return Promise.reject();
  const ready = (lib) => {
    lib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.worker.min.js`;
    return lib;
  };
  if (window.pdfjsLib) return Promise.resolve(ready(window.pdfjsLib));
  if (!pdfjsPromise) {
    pdfjsPromise = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.min.js`;
      s.onload = () => resolve(ready(window.pdfjsLib));
      s.onerror = () => {
        pdfjsPromise = null;
        reject(new Error("Failed to load pdf.js"));
      };
      document.head.appendChild(s);
    });
  }
  return pdfjsPromise;
}

async function openPdf(file) {
  const pdfjs = await loadPdfjs();
  const data = new Uint8Array(await file.arrayBuffer());
  return pdfjs.getDocument({ data }).promise;
}

// Does the PDF contain real, selectable text? (checks the first 3 pages)
async function inspectPdf(file) {
  const pdf = await openPdf(file);
  const pages = pdf.numPages;
  const check = Math.min(pages, 3);
  let chars = 0;
  for (let i = 1; i <= check; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    chars += content.items.reduce(
      (sum, item) => sum + (item.str?.trim().length || 0),
      0,
    );
  }
  pdf.destroy?.();
  return { pages, isScanned: chars / check < TEXT_CHARS_PER_PAGE };
}

// Render the first `count` pages to JPEG data URLs
async function pdfToImages(file, count) {
  const pdf = await openPdf(file);
  const total = Math.min(pdf.numPages, count);
  const images = [];
  for (let i = 1; i <= total; i++) {
    const page = await pdf.getPage(i);
    const base = page.getViewport({ scale: 1 });
    const scale = Math.min(
      2.5,
      MAX_IMAGE_SIDE / Math.max(base.width, base.height),
    );
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    canvas.width = Math.floor(viewport.width);
    canvas.height = Math.floor(viewport.height);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#fff"; // JPEG has no transparency
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvasContext: ctx, viewport }).promise;
    images.push(canvas.toDataURL("image/jpeg", 0.85));
    page.cleanup?.();
  }
  pdf.destroy?.();
  return images;
}

// Downscale a phone photo to something the OCR endpoint handles well
function imageToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(
        1,
        MAX_IMAGE_SIDE / Math.max(img.width, img.height),
      );
      const canvas = document.createElement("canvas");
      canvas.width = Math.floor(img.width * scale);
      canvas.height = Math.floor(img.height * scale);
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read image"));
    };
    img.src = url;
  });
}

// ───────────────────────── component ─────────────────────────
export default function PdfClientContent({ locale }) {
  const t = useTranslations("PdfPage");
  // Viewer and paywall strings already exist in the WordPage namespace
  const tViewer = useTranslations("WordPage");
  const fileInputRef = useRef(null);
  const [result, setResult] = useState(null); // converted document, if any
  const [viewerOpen, setViewerOpen] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  // "upload" = drop a file | "scanned" = scan detected, pick Word/Excel | "new" = blank doc
  const [modalStep, setModalStep] = useState("upload");
  const [pending, setPending] = useState(null); // { file, kind: "pdf" | "image", pages? }
  const [isChecking, setIsChecking] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const userId = "67b746ab6256a6bdb691b18a";

  const getAppUrl = (path) => {
    const base = `https://app.noteocr.com${path}`;
    if (!locale || locale === "en") return base;
    return `${base}${path.includes("?") ? "&" : "?"}lng=${locale}`;
  };

  // Same preview endpoint the /handwriting-to-docx page uses
  const getPreviewUrl = (doc) => {
    if (!doc) return null;
    if (doc.previewUrl) return doc.previewUrl;
    return `${API}/users/preview-document/${doc.userId || userId}/${encodeURIComponent(
      doc.folder || "Personal",
    )}/${encodeURIComponent(doc.name)}`;
  };

  const goToTrialEditor = (folder, name) => {
    window.location.href = getAppUrl(
      `/trial-editor/${encodeURIComponent(folder)}/${encodeURIComponent(name)}`,
    );
  };

  // ── Blank document ──
  const { mutate: createBlankPdf, isPending: isCreating } = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(`${API}/users/create-document`, data);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(t("toast_success_create"));
      track("editpdf_blank_doc_created");
      goToTrialEditor(data.document.folder, data.document.name);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || t("toast_error_create"));
    },
  });

  // ── Digital PDF -> editor (unchanged behaviour) ──
  const { mutate: importFile, isPending: isImporting } = useMutation({
    mutationFn: async (formData) => {
      const response = await axios.post(`${API}/users/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(t("toast_success_upload"));
      track("editpdf_editor_opened");
      goToTrialEditor(data.document.dest, data.document.name);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || t("toast_error_upload"));
    },
  });

  // ── Scanned PDF / photo -> free converted preview (existing trial pipeline) ──
  const { mutate: convert, isPending: isConverting } = useMutation({
    mutationFn: async ({ file, kind, format }) => {
      const images =
        kind === "pdf"
          ? await pdfToImages(file, TRIAL_PAGES)
          : [await imageToDataUrl(file)];

      const response = await axios.post(
        `${API}/transcribe/process-image`,
        {
          images,
          userId,
          conversionType: format === "word" ? "imageToWord" : "imageToExcel",
          documentName: randomString(7),
          folder: "Personal",
          updating: false,
        },
        { headers: { "Content-Type": "application/json" }, timeout: 240000 },
      );
      return response.data;
    },
    onSuccess: (data, vars) => {
      if (data?.success && data.document) {
        track("editpdf_conversion_done", {
          format: vars.format,
          kind: vars.kind,
        });
        track(`editpdf_${vars.format}_conversion_done`, { kind: vars.kind });
        setResult(data.document);
        setPending(null);
        setModalOpen(false);
        setViewerOpen(true);
      } else {
        toast.error(t("toast_error_convert"));
      }
    },
    onError: (error, vars) => {
      track("editpdf_conversion_failed", {
        format: vars?.format,
        kind: vars?.kind,
      });
      toast.error(
        error?.response?.data?.message ||
          error?.response?.data?.error ||
          t("toast_error_convert"),
      );
    },
  });

  const uploadToEditor = (file) => {
    const renamed = new File([file], uniqueName(file.name), {
      type: file.type,
    });
    const formData = new FormData();
    formData.append("file", renamed);
    formData.append("userId", userId);
    formData.append("folderName", "Personal");
    importFile(formData);
  };

  const handleFile = async (file) => {
    if (!file) return;

    const isPdf = file.type === "application/pdf" || /\.pdf$/i.test(file.name);
    const isImage = file.type.startsWith("image/");

    if (!isPdf && !isImage) {
      toast.error(t("toast_error_type"));
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      toast.error(t("toast_error_size"));
      return;
    }

    track("editpdf_file_chosen", { kind: isPdf ? "pdf" : "image" });

    // Photos are always "scans": go straight to the Word/Excel choice
    if (isImage) {
      setPending({ file, kind: "image" });
      setModalStep("scanned");
      return;
    }

    setIsChecking(true);
    try {
      const { pages, isScanned } = await inspectPdf(file);
      track(
        isScanned
          ? "editpdf_scanned_pdf_detected"
          : "editpdf_digital_pdf_detected",
        { pages },
      );
      if (isScanned) {
        setPending({ file, kind: "pdf", pages });
        setModalStep("scanned");
      } else {
        uploadToEditor(file);
      }
    } catch (err) {
      // Encrypted or unreadable in the browser: fall back to the editor
      track("editpdf_pdf_check_failed");
      uploadToEditor(file);
    } finally {
      setIsChecking(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow picking the same file again
    handleFile(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const handleStartScratch = () => {
    if (isCreating) return;
    const prefixes = ["Document", "Contract", "Agreement", "Proposal", "Draft"];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    createBlankPdf({
      userId,
      folderName: "Personal",
      documentName: `${prefix}_${Math.floor(1000 + Math.random() * 9000)}`,
      fileType: "pdf",
    });
  };

  const handleConvert = (format) => {
    if (!pending) return;
    track("editpdf_convert_button_clicked", { format, kind: pending.kind });
    track(`editpdf_${format}_button_clicked`, { kind: pending.kind });
    convert({ ...pending, format });
  };

  const openModal = (type) => {
    track(
      type === "upload"
        ? "editpdf_upload_window_opened"
        : "editpdf_blank_window_opened",
    );
    setPending(null);
    setModalStep(type === "upload" ? "upload" : "new");
    setModalOpen(true);
  };

  const isGlobalLoading =
    isCreating || isImporting || isChecking || isConverting;

  const closeModal = () => {
    if (isGlobalLoading) return;
    setModalOpen(false);
    setPending(null);
  };

  const loadingTitle = isChecking
    ? t("modal_analyzing_title")
    : isConverting
      ? t("modal_converting_title")
      : isImporting
        ? t("modal_processing_upload")
        : t("modal_processing_new");
  const loadingDesc = isChecking
    ? t("modal_analyzing_desc")
    : isConverting
      ? t("modal_converting_desc")
      : t("modal_processing_desc");

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* ── Main Card ── */}
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

      {/* ── Converted preview (scanned PDFs / photos) ── */}
      {result && !viewerOpen && (
        <button
          onClick={() => {
            track("editpdf_preview_reopened");
            setViewerOpen(true);
          }}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-lg shadow-lg active:scale-[0.98] transition-all"
        >
          {tViewer("tool_view_preview")}
        </button>
      )}

      {result && viewerOpen && (
        <DocumentViewer
          t={tViewer}
          fileUrl={getPreviewUrl(result)}
          title={result.name}
          onClose={() => setViewerOpen(false)}
          maxPages={TRIAL_PAGES}
          ctaHref={getAppUrl("/signup?source=edit-pdf-preview")}
          onCtaClick={() => track("editpdf_signup_button_clicked")}
        />
      )}

      {/* ── Info Cards ── */}
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {[
          { Icon: FileSearch, key: "1" },
          { Icon: Sparkles, key: "2" },
          { Icon: Lock, key: "3" },
        ].map(({ Icon, key }) => (
          <div
            key={key}
            className="bg-white/[0.02] border border-white/5 rounded-lg p-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <Icon className="w-5 h-5 text-rose-500" />
              <span className="text-sm font-bold">
                {t(`tool_info_${key}_title`)}
              </span>
            </div>
            <p className="text-xs text-gray-600">
              {t(`tool_info_${key}_desc`)}
            </p>
          </div>
        ))}
      </div>

      {/* ── Tip ── */}
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

      {/* ══════════════════ MODAL ══════════════════ */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-6">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={closeModal}
          />

          <div className="relative bg-[#0a0a0a] border-2 border-white/10 rounded-t-2xl sm:rounded-2xl overflow-hidden w-full sm:max-w-xl shadow-2xl">
            {/* Loading overlay */}
            {isGlobalLoading && (
              <div className="absolute inset-0 z-50 bg-black/90 flex flex-col items-center justify-center text-center p-6">
                <Loader2 className="w-12 h-12 text-rose-500 animate-spin mb-4" />
                <h4 className="text-xl font-bold text-white tracking-tight">
                  {loadingTitle}
                </h4>
                <p className="text-gray-500 text-sm mt-2">{loadingDesc}</p>
              </div>
            )}

            <div className="h-1 w-full bg-gradient-to-r from-rose-500 via-pink-500 to-orange-500" />

            <div className="sm:hidden flex justify-center pt-3">
              <div className="w-9 h-1 rounded-full bg-zinc-700" />
            </div>

            <div
              className="overflow-y-auto px-5 py-5 sm:p-10"
              style={{ maxHeight: "90dvh" }}
            >
              <button
                onClick={closeModal}
                disabled={isGlobalLoading}
                className="absolute top-5 right-5 p-2 hover:bg-white/10 rounded-full transition-all"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>

              {/* ══ STEP: FILE UPLOAD ══ */}
              {modalStep === "upload" && (
                <div className="text-center">
                  <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <Upload className="w-8 h-8 text-rose-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                    {t("modal_upload_title")}
                  </h3>
                  <p className="text-gray-400 font-medium mb-8">
                    {t("modal_upload_desc")}
                  </p>

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
                      accept=".pdf,application/pdf,image/*"
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

                  <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mt-6 flex items-center justify-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5" />{" "}
                    {t("modal_security_badge")}
                  </p>
                </div>
              )}

              {/* ══ STEP: SCAN DETECTED -> CONVERT ══ */}
              {modalStep === "scanned" && pending && (
                <div>
                  <div className="text-center mb-7">
                    <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
                      <PenLine className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                      {t("scanned_title")}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {t("scanned_desc")}
                    </p>
                    <p className="text-[11px] text-zinc-500 mt-3 truncate">
                      {pending.file.name}
                      {pending.kind === "pdf" && pending.pages
                        ? ` · ${pending.pages} ${pending.pages === 1 ? "page" : "pages"}`
                        : ""}
                    </p>
                  </div>

                  <div className="space-y-3 mb-3">
                    <button
                      onClick={() => handleConvert("word")}
                      className="w-full flex items-center justify-between px-5 py-4 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 transition-all active:scale-[0.98] shadow-xl group text-left"
                    >
                      <span className="flex items-center gap-3">
                        <FileText className="w-5 h-5 shrink-0" />
                        <span>
                          <span className="block font-black text-[15px]">
                            {t("scanned_word")}
                          </span>
                          <span className="block text-[11px] text-emerald-100/80">
                            {t("scanned_word_desc")}
                          </span>
                        </span>
                      </span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <button
                      onClick={() => handleConvert("excel")}
                      className="w-full flex items-center justify-between px-5 py-4 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-all active:scale-[0.98] shadow-xl group text-left"
                    >
                      <span className="flex items-center gap-3">
                        <Table2 className="w-5 h-5 shrink-0" />
                        <span>
                          <span className="block font-black text-[15px]">
                            {t("scanned_excel")}
                          </span>
                          <span className="block text-[11px] text-blue-100/80">
                            {t("scanned_excel_desc")}
                          </span>
                        </span>
                      </span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {pending.kind === "pdf" && pending.pages > TRIAL_PAGES && (
                    <p className="text-[11px] text-zinc-500 text-center mb-3">
                      {t("scanned_pages_note", { count: TRIAL_PAGES })}
                    </p>
                  )}

                  <div className="flex flex-col items-center gap-2 mt-4">
                    {pending.kind === "pdf" && (
                      <button
                        onClick={() => {
                          track("editpdf_chose_editor_instead");
                          uploadToEditor(pending.file);
                        }}
                        className="text-[12px] text-zinc-400 hover:text-white underline underline-offset-4 transition-colors"
                      >
                        {t("scanned_open_editor")}
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setPending(null);
                        setModalStep("upload");
                      }}
                      className="text-[11px] text-zinc-600 hover:text-zinc-400 transition-colors"
                    >
                      ← {t("scanned_back")}
                    </button>
                  </div>
                </div>
              )}

              {/* ══ STEP: NEW BLANK DOC ══ */}
              {modalStep === "new" && (
                <div className="text-center">
                  <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
                    <Edit3 className="w-8 h-8 text-rose-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                    {t("modal_new_title")}
                  </h3>
                  <p className="text-gray-400 font-medium mb-8">
                    {t("modal_new_desc")}
                  </p>
                  <button
                    onClick={handleStartScratch}
                    disabled={isGlobalLoading}
                    className="w-full flex items-center justify-center gap-3 bg-rose-600 text-white font-bold py-5 rounded-lg hover:bg-rose-500 transition-all active:scale-[0.98] shadow-xl shadow-rose-600/20 disabled:opacity-50"
                  >
                    <ArrowRight className="w-5 h-5" />
                    {t("modal_new_button")}
                  </button>
                  <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mt-6 flex items-center justify-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5" />{" "}
                    {t("modal_security_badge")}
                  </p>
                </div>
              )}

              {/* iOS safe area */}
              <div
                className="sm:hidden"
                style={{ height: "env(safe-area-inset-bottom, 12px)" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
