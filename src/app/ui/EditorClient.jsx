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
  FileCode,
  CheckCircle2,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

const ALLOWED_EXTENSIONS = [
  ".doc",
  ".docx",
  ".odt",
  ".rtf",
  ".txt",
  ".wps",
  ".xls",
  ".xlsx",
  ".ods",
  ".csv",
  ".ppt",
  ".pptx",
  ".odp",
];

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
  const router = useRouter();
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState("");
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
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("userId", userId);
    formData.append("folderName", "Personal");
    importFile(formData);
  };

  const isGlobalLoading = isCreating || isImporting;

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* PROFESSIONAL HERO SECTION */}
      <section className="relative pt-32 pb-24 bg-[#0F172A] border-b border-slate-800">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 text-slate-300 text-xs font-semibold tracking-wide mb-8 animate-fade-in">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            Enterprise Document Protocol
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Advanced Document <span className="text-blue-500">Workspace</span>
          </h1>

          <p className="md:text-lg text-slate-400 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
            Professional Online Editor for Word, Excel & PowerPoint." Securely
            create, edit, and share all your documents in one place. Full
            compatibility with DOCX, XLSX, and PDF.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <button
              onClick={() => {
                setActionType("new");
                setModalOpen(true);
              }}
              className="group w-full sm:w-auto flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-lg font-bold transition-all shadow-xl shadow-blue-900/20"
            >
              <Edit3 className="w-5 h-5" /> Create Blank Document
            </button>
            <button
              onClick={() => {
                setActionType("upload");
                setModalOpen(true);
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-3 bg-slate-800 hover:bg-slate-700 text-white px-10 py-4 rounded-lg font-bold border border-slate-600 transition-all"
            >
              <Upload className="w-5 h-5 text-slate-400" /> Import Local File
            </button>
          </div>
        </div>
      </section>

      {/* COMPATIBILITY GRID */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div className="max-w-xl">
              <h2 className="text-sm font-bold text-blue-600 uppercase tracking-[0.2em] mb-3">
                Compatibility
              </h2>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">
                Universal Format Support
              </h3>
              <p className="text-slate-600">
                Our engine supports legacy and modern extensions across the
                complete Microsoft Office and OpenOffice suites.
              </p>
            </div>
            <div className="flex gap-4">
              {["DOCX", "XLSX", "PPTX", "ODT", "CSV"].map((ext) => (
                <span
                  key={ext}
                  className="px-3 py-1 bg-white border border-slate-200 rounded text-[11px] font-bold text-slate-500 shadow-sm"
                >
                  {ext}
                </span>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Globe className="w-6 h-6" />}
              title="Cloud Sync"
              desc="Instant synchronization across global nodes for zero-latency document updates."
            />
            <FeatureCard
              icon={<ShieldCheck className="w-6 h-6" />}
              title="AES-256 Security"
              desc="End-to-end encryption on all document buffers and transient file storage."
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6" />}
              title="Native Performance"
              desc="Browser-optimized rendering engine for large spreadsheets and complex documents."
            />
          </div>
        </div>
      </section>

      {/* SELECTION MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm bg-slate-950/40">
          <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200">
            {isGlobalLoading && (
              <div className="absolute inset-0 z-50 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
                <p className="text-sm font-bold text-slate-700 tracking-wide uppercase">
                  Processing Request...
                </p>
              </div>
            )}

            <div className="p-8">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                    {actionType === "new"
                      ? "New Asset Creation"
                      : "System Import"}
                  </h3>
                  <p className="text-slate-500 text-sm mt-1">
                    Select the protocol for your new document environment.
                  </p>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {actionType === "new" ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <DocOption
                    onClick={() => handleSelection("word")}
                    icon={<FileText className="text-blue-600" />}
                    label="Document"
                    sub="Word / ODT"
                  />
                  <DocOption
                    onClick={() => handleSelection("excel")}
                    icon={<FileSpreadsheet className="text-emerald-600" />}
                    label="Spreadsheet"
                    sub="Excel / CSV"
                  />
                  <DocOption
                    onClick={() => handleSelection("powerpoint")}
                    icon={<FileCode className="text-orange-600" />}
                    label="Presentation"
                    sub="PPTX / ODP"
                  />
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="group border-2 border-dashed border-slate-200 rounded-xl p-12 text-center hover:border-blue-500 hover:bg-blue-50/20 transition-all cursor-pointer"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept={ACCEPTED_MIME_TYPES}
                  />
                  <Upload className="w-10 h-10 text-slate-400 group-hover:text-blue-600 mx-auto mb-4 transition-colors" />
                  <h4 className="text-lg font-bold text-slate-900">
                    Drag & drop or browse
                  </h4>
                  <p className="text-slate-500 text-xs mt-2 max-w-xs mx-auto">
                    Supports Microsoft Office, OpenDocument, RTF, and Plain Text
                    formats.
                  </p>
                </div>
              )}
            </div>

            <div className="bg-slate-50 px-8 py-4 border-t border-slate-200 flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                Ready for secure session
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="p-8 bg-white border border-slate-200 rounded-xl hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-6">
        {icon}
      </div>
      <h4 className="text-xl font-bold mb-3">{title}</h4>
      <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function DocOption({ onClick, icon, label, sub }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-start p-6 rounded-xl border border-slate-200 bg-white hover:border-blue-500 hover:shadow-lg transition-all text-left group"
    >
      <div className="p-3 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors mb-4">
        {React.cloneElement(icon, { className: "w-6 h-6" })}
      </div>
      <span className="font-bold text-slate-900 text-sm">{label}</span>
      <span className="text-[10px] text-slate-400 font-medium uppercase mt-1 tracking-tighter">
        {sub}
      </span>
    </button>
  );
}
