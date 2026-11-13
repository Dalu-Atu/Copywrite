"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { Loader2, Upload, FileWarning, Check, X } from "lucide-react";
import { uploadAndTranscribe } from "../lib/api-service";
import { DocumentViewer } from "./DocumentViewer";

/* -------------------------------------------------------------------------- */
/* Constants                                                                  */
/* -------------------------------------------------------------------------- */

const TRIAL_MAX_PAGES = 1;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const MAX_FILE_SIZE_IN_BYTES = 25 * 1024 * 1024;
const TOAST_VISIBLE_DURATION_MS = 6000;
const TRIAL_USER_ID = "67b746ab6256a6bdb691b18a";
const SIGNUP_CTA_SOURCE = "ocr-preview";

/* -------------------------------------------------------------------------- */
/* Google Analytics                                                           */
/* -------------------------------------------------------------------------- */

const ANALYTICS_EVENTS = {
  UPLOAD_BUTTON_CLICKED: "convert_upload_button_clicked",
  FILE_DROPPED: "convert_file_dropped",
  CONVERSION_STARTED: "convert_started",
  FILE_VALIDATION_FAILED: "convert_file_validation_failed",
  CONVERSION_SUCCEEDED: "convert_succeeded",
  CONVERSION_FAILED: "convert_failed",
  RESULT_VIEWER_OPENED: "convert_result_viewer_opened",
  SIGNUP_CTA_CLICKED: "convert_signup_cta_clicked",
};

/**
 * Sends a custom event to Google Analytics 4 (gtag).
 * Falls back to Google Tag Manager's dataLayer if gtag isn't available.
 * Never throws, so analytics problems can't break the converter.
 */
function sendAnalyticsEvent(eventName, eventParameters = {}) {
  if (typeof window === "undefined") return;

  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, eventParameters);
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: eventName, ...eventParameters });
    }
  } catch {
    // Ignore analytics errors on purpose.
  }
}

/* -------------------------------------------------------------------------- */
/* Context                                                                    */
/* -------------------------------------------------------------------------- */

const ConverterContext = createContext(null);

export function useConverter() {
  const converterContextValue = useContext(ConverterContext);
  if (!converterContextValue) {
    throw new Error("useConverter must be used inside <ConverterProvider>");
  }
  return converterContextValue;
}

/* -------------------------------------------------------------------------- */
/* Provider                                                                   */
/* -------------------------------------------------------------------------- */

export function ConverterProvider({
  children,
  locale,
  authToken,
  conversionType = "imageToWord",
  translationNamespace = "WordPage", // namespace that holds the tool_/toast_/viewer_ keys
}) {
  const translate = useTranslations(translationNamespace);

  const [convertedDocument, setConvertedDocument] = useState(null);
  const [isResultViewerOpen, setIsResultViewerOpen] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [toastState, setToastState] = useState({
    visible: false,
    title: "",
    message: "",
    type: "error",
  });

  const fileInputRef = useRef(null);
  const toastTimerRef = useRef(null);
  const latestProcessSelectedFilesRef = useRef(null);

  /* ------------------------------ URL helpers ------------------------------ */

  const buildAppUrl = (path) => {
    const baseUrl = `https://app.noteocr.com${path}`;
    if (!locale || locale === "en") return baseUrl;
    const querySeparator = path.includes("?") ? "&" : "?";
    return `${baseUrl}${querySeparator}lng=${locale}`;
  };

  const buildDocumentPreviewUrl = (document) => {
    if (!document) return null;
    if (document.previewUrl) return document.previewUrl;

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
    const documentOwnerId = document.userId || TRIAL_USER_ID;
    const documentFolder = encodeURIComponent(document.folder || "Personal");
    const documentName = encodeURIComponent(document.name);

    return `${apiBaseUrl}/users/preview-document/${documentOwnerId}/${documentFolder}/${documentName}`;
  };

  /* -------------------------------- Toasts --------------------------------- */

  const showToast = (title, message, type = "error") => {
    clearTimeout(toastTimerRef.current);
    setToastState({ visible: true, title, message, type });
    toastTimerRef.current = setTimeout(
      () => setToastState((previous) => ({ ...previous, visible: false })),
      TOAST_VISIBLE_DURATION_MS,
    );
  };

  const hideToast = () =>
    setToastState((previous) => ({ ...previous, visible: false }));

  /* ---------------------------- Upload mutation ---------------------------- */

  const { mutate: uploadImageForConversion, isPending: isConverting } =
    useMutation({
      mutationFn: uploadAndTranscribe,
      onSuccess: (response) => {
        if (response.success) {
          sendAnalyticsEvent(ANALYTICS_EVENTS.CONVERSION_SUCCEEDED, {
            conversion_type: conversionType,
          });
          setConvertedDocument(response.document);
          setIsResultViewerOpen(true);
          sendAnalyticsEvent(ANALYTICS_EVENTS.RESULT_VIEWER_OPENED, {
            conversion_type: conversionType,
          });
          showToast(
            translate("tool_complete_status"),
            translate("toast_success"),
            "success",
          );
        } else {
          sendAnalyticsEvent(ANALYTICS_EVENTS.CONVERSION_FAILED, {
            conversion_type: conversionType,
            failure_reason: "server_returned_unsuccessful_response",
          });
        }
      },
      onError: (error) => {
        const errorMessage =
          error?.response?.data?.error ||
          error?.message ||
          translate("toast_error_conversion");

        sendAnalyticsEvent(ANALYTICS_EVENTS.CONVERSION_FAILED, {
          conversion_type: conversionType,
          failure_reason: "request_error",
          http_status: error?.response?.status,
        });
        showToast(translate("toast_title_error"), errorMessage, "error");
      },
    });

  /* ------------------------------ File handling ---------------------------- */

  const generateRandomDocumentName = (prefix = "noteocr_word") =>
    `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;

  const readFileAsBase64 = (file) =>
    new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result.split(",")[1]);
      fileReader.onerror = reject;
    });

  /**
   * @param {File[]} selectedFiles
   * @param {"file_picker" | "drag_and_drop"} selectionMethod how the user provided the file
   */
  const processSelectedFiles = async (
    selectedFiles,
    selectionMethod = "file_picker",
  ) => {
    if (!selectedFiles?.length || isConverting) return;
    if (fileInputRef.current) fileInputRef.current.value = "";

    if (selectedFiles.length > 1) {
      sendAnalyticsEvent(ANALYTICS_EVENTS.FILE_VALIDATION_FAILED, {
        conversion_type: conversionType,
        selection_method: selectionMethod,
        failure_reason: "multiple_files",
        files_count: selectedFiles.length,
      });
      return showToast(
        translate("toast_title_one_image"),
        translate("toast_msg_one_image"),
      );
    }

    const selectedFile = selectedFiles[0];

    if (!ACCEPTED_IMAGE_MIME_TYPES.includes(selectedFile.type)) {
      sendAnalyticsEvent(ANALYTICS_EVENTS.FILE_VALIDATION_FAILED, {
        conversion_type: conversionType,
        selection_method: selectionMethod,
        failure_reason: "invalid_file_type",
        file_type: selectedFile.type || "unknown",
      });
      return showToast(
        translate("toast_title_invalid_file"),
        translate("toast_error_type"),
      );
    }

    if (selectedFile.size > MAX_FILE_SIZE_IN_BYTES) {
      sendAnalyticsEvent(ANALYTICS_EVENTS.FILE_VALIDATION_FAILED, {
        conversion_type: conversionType,
        selection_method: selectionMethod,
        failure_reason: "file_too_large",
        file_size_in_bytes: selectedFile.size,
      });
      return showToast(
        translate("toast_title_file_too_large"),
        translate("toast_error_size"),
      );
    }

    try {
      const imageAsBase64 = await readFileAsBase64(selectedFile);

      sendAnalyticsEvent(ANALYTICS_EVENTS.CONVERSION_STARTED, {
        conversion_type: conversionType,
        selection_method: selectionMethod,
        file_type: selectedFile.type,
        file_size_in_bytes: selectedFile.size,
      });

      uploadImageForConversion({
        images: [imageAsBase64],
        userId: TRIAL_USER_ID,
        conversionType,
        documentName: generateRandomDocumentName(),
        folder: "Personal",
        updating: false,
      });
    } catch {
      sendAnalyticsEvent(ANALYTICS_EVENTS.CONVERSION_FAILED, {
        conversion_type: conversionType,
        selection_method: selectionMethod,
        failure_reason: "file_read_error",
      });
      showToast(
        translate("toast_title_processing_error"),
        translate("toast_msg_processing_error"),
      );
    }
  };

  // Always point at the latest closure so window listeners never go stale
  latestProcessSelectedFilesRef.current = processSelectedFiles;

  /* ------------------------------ Public actions --------------------------- */

  const openFilePicker = () => {
    if (isConverting) return;
    sendAnalyticsEvent(ANALYTICS_EVENTS.UPLOAD_BUTTON_CLICKED, {
      conversion_type: conversionType,
    });
    fileInputRef.current?.click();
  };

  const resetConverter = () => {
    setConvertedDocument(null);
    setIsResultViewerOpen(false);
  };

  const reopenResultViewer = () => setIsResultViewerOpen(true);

  const handleSignupCtaClick = () => {
    sendAnalyticsEvent(ANALYTICS_EVENTS.SIGNUP_CTA_CLICKED, {
      conversion_type: conversionType,
      cta_location: "result_viewer",
    });
  };

  /* --------------------------- Page-wide drag & drop ----------------------- */

  useEffect(() => {
    let dragEnterDepth = 0;

    const eventContainsFiles = (dragEvent) =>
      Array.from(dragEvent.dataTransfer?.types || []).includes("Files");

    const handleDragEnter = (dragEvent) => {
      if (!eventContainsFiles(dragEvent)) return;
      dragEvent.preventDefault();
      dragEnterDepth++;
      setIsDragActive(true);
    };

    const handleDragOver = (dragEvent) => {
      // Required, or the drop event never fires
      if (eventContainsFiles(dragEvent)) dragEvent.preventDefault();
    };

    const handleDragLeave = (dragEvent) => {
      if (!eventContainsFiles(dragEvent)) return;
      dragEnterDepth = Math.max(0, dragEnterDepth - 1);
      if (dragEnterDepth === 0) setIsDragActive(false);
    };

    const handleDrop = (dragEvent) => {
      if (!eventContainsFiles(dragEvent)) return;
      dragEvent.preventDefault(); // stops the browser from opening the image
      dragEnterDepth = 0;
      setIsDragActive(false);

      const droppedFiles = Array.from(dragEvent.dataTransfer.files);
      sendAnalyticsEvent(ANALYTICS_EVENTS.FILE_DROPPED, {
        conversion_type: conversionType,
        files_count: droppedFiles.length,
      });
      latestProcessSelectedFilesRef.current(droppedFiles, "drag_and_drop");
    };

    window.addEventListener("dragenter", handleDragEnter);
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("drop", handleDrop);

    return () => {
      window.removeEventListener("dragenter", handleDragEnter);
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("drop", handleDrop);
    };
  }, [conversionType]);

  // Clear any pending toast timer on unmount
  useEffect(() => () => clearTimeout(toastTimerRef.current), []);

  /* --------------------------------- Render -------------------------------- */

  const signupCtaHref = convertedDocument
    ? buildAppUrl(`/signup?source=${SIGNUP_CTA_SOURCE}`)
    : null;

  const converterContextValue = {
    openPicker: openFilePicker,
    processFiles: processSelectedFiles,
    isProcessing: isConverting,
    dragActive: isDragActive,
    resultDoc: convertedDocument,
    resetTool: resetConverter,
    reopenViewer: reopenResultViewer,
  };

  return (
    <ConverterContext.Provider value={converterContextValue}>
      {children}

      {/* The one and only file input on the page */}
      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_IMAGE_MIME_TYPES.join(",")}
        className="sr-only"
        tabIndex={-1}
        onChange={(changeEvent) =>
          changeEvent.target.files &&
          processSelectedFiles(
            Array.from(changeEvent.target.files),
            "file_picker",
          )
        }
      />

      {/* Full-page drop overlay */}
      {isDragActive && !isConverting && (
        <div className="pointer-events-none fixed inset-0 z-[150] grid place-items-center bg-blue-600/20 backdrop-blur-sm">
          <div className="m-4 flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-blue-500 bg-white px-10 py-12 shadow-2xl">
            <Upload className="h-10 w-10 text-blue-600" />
            <p className="text-lg font-bold text-neutral-900">
              {translate("drop_overlay")}
            </p>
          </div>
        </div>
      )}

      {/* Processing overlay (buttons are all over the page, so this is global) */}
      {isConverting && (
        <div className="fixed inset-0 z-[180] grid place-items-center bg-black/50 px-4">
          <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-2xl bg-white p-8 text-center shadow-2xl">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
            <h3 className="text-lg font-bold text-neutral-900">
              {translate("tool_processing_title")}
            </h3>
            <p className="text-xs leading-relaxed text-neutral-600">
              {translate("tool_processing_desc")}
            </p>
          </div>
        </div>
      )}

      {/* Toast */}
      <div
        className={`fixed left-1/2 top-4 z-[300] -translate-x-1/2 transition-all duration-300 ${
          toastState.visible
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        }`}
      >
        <div
          className={`flex w-[90vw] max-w-[400px] items-start gap-3 rounded-xl border bg-white p-4 shadow-2xl ${
            toastState.type === "error" ? "border-red-200" : "border-blue-200"
          }`}
        >
          {toastState.type === "error" ? (
            <FileWarning className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
          ) : (
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-blue-500" />
          )}
          <div className="flex-1 text-left">
            <h4
              className={`text-sm font-bold ${
                toastState.type === "error" ? "text-red-600" : "text-blue-600"
              }`}
            >
              {toastState.title}
            </h4>
            <p className="text-xs text-neutral-600">{toastState.message}</p>
          </div>
          <button
            onClick={hideToast}
            className="text-neutral-400 hover:text-neutral-900"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Result viewer */}
      {convertedDocument && isResultViewerOpen && (
        <DocumentViewer
          t={translate}
          fileUrl={buildDocumentPreviewUrl(convertedDocument)}
          token={authToken}
          title={convertedDocument.name}
          onClose={() => setIsResultViewerOpen(false)}
          maxPages={TRIAL_MAX_PAGES}
          ctaHref={signupCtaHref}
          onCtaClick={handleSignupCtaClick}
        />
      )}
    </ConverterContext.Provider>
  );
}
