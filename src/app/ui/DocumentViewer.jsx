"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Loader2, X, FileWarning, Lock } from "lucide-react";

const PDFJS_VERSION = "3.11.174";

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

export function DocumentViewer({
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
                      </div>

                      <div className="shrink-0 text-center sm:text-right">
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
