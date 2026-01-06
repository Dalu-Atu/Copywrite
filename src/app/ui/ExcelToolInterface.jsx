"use client";
import React, { useState, useRef } from "react";
import {
  UploadCloud,
  FileSpreadsheet,
  Loader2,
  Download,
  RefreshCw,
  ShieldCheck,
  Grid,
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { uploadAndTranscribe, downloadDocument } from "../lib/api-service";
import { toast } from "react-hot-toast";

export default function ExcelToolInterface() {
  const [file, setFile] = useState(null);
  const [resultDoc, setResultDoc] = useState(null);

  // Create a ref to target the hidden file input
  const fileInputRef = useRef(null);

  // 1. Mutation for Uploading
  const { mutate: handleUpload, isPending: isProcessing } = useMutation({
    mutationFn: uploadAndTranscribe,
    onSuccess: (data) => {
      if (data.success) {
        setResultDoc(data.document);
        toast.success("Table extracted successfully!");
      }
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Extraction failed.");
      setFile(null);
    },
  });
  const generateRandomDocName = (baseName = "copywritee_transcription") => {
    const timestamp = Date.now(); // unique
    const random = Math.random().toString(36).substring(2, 8); // short random
    return `${baseName}_${timestamp}_${random}`;
  };
  // 2. Helper: Convert File to Base64 and trigger mutation
  const processFile = async (selectedFile) => {
    setFile(selectedFile);
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
      const base64String = reader.result.split(",")[1];

      handleUpload({
        images: [base64String],
        userId: "67b746ab6256a6bdb691b18a",
        conversionType: "imageToExcel", // Specifically for Excel processing
        documentName: generateRandomDocName(), // ✅ unique name
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

  // 3. Download Logic
  const handleDownload = async () => {
    try {
      await downloadDocument({
        userId: resultDoc.userId,
        folder: resultDoc.folder,
        fileName: resultDoc.name,
      });
    } catch (err) {
      toast.error("Download failed.");
    }
  };

  const resetTool = () => {
    setFile(null);
    setResultDoc(null);
    // Reset the input value so the same file can be uploaded twice if needed
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-3xl p-2 shadow-2xl shadow-black/20 ring-1 ring-white/10">
        <div className="border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 min-h-[340px] flex flex-col items-center justify-center relative overflow-hidden transition-all">
          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={onFileChange}
            accept="image/*,.pdf"
            className="hidden"
          />

          {/* STATE: IDLE (Upload) */}
          {!file && !isProcessing && (
            <div className="text-center p-8 animate-in fade-in zoom-in duration-300">
              <div
                onClick={() => fileInputRef.current.click()}
                className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-slate-100 group cursor-pointer hover:border-emerald-400 hover:scale-105 transition-all"
              >
                <UploadCloud className="w-10 h-10 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Drop your table image
              </h3>
              <p className="text-slate-500 mb-8 max-w-xs mx-auto">
                We support images with grids, lines, or structured lists.
              </p>

              <button
                onClick={() => fileInputRef.current.click()}
                className="bg-slate-900 text-white font-bold py-3 px-8 rounded-xl hover:bg-slate-800 transition-colors shadow-lg"
              >
                Select File
              </button>
            </div>
          )}

          {/* STATE: PROCESSING */}
          {isProcessing && (
            <div className="text-center p-8 w-full max-w-md animate-in fade-in zoom-in duration-300">
              <div className="mb-8 relative">
                <div className="w-16 h-16 bg-white rounded-2xl mx-auto flex items-center justify-center shadow-md border border-slate-100 z-10 relative">
                  <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-emerald-400/20 rounded-full animate-ping"></div>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Detecting Columns & Rows...
              </h3>
              <p className="text-slate-500 text-sm">{file?.name}</p>
            </div>
          )}

          {/* STATE: COMPLETE */}
          {resultDoc && !isProcessing && (
            <div className="text-center p-8 w-full animate-in fade-in zoom-in duration-300">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-100 relative">
                <FileSpreadsheet className="w-10 h-10 text-emerald-600" />
                <div className="absolute top-0 right-0 bg-green-600 text-[8px] font-bold text-white px-1.5 py-0.5 rounded shadow-sm transform translate-x-2 -translate-y-2">
                  XLSX
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Table Extracted!
              </h3>
              <p className="text-slate-500 mb-8">
                Your spreadsheet is ready for download.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleDownload}
                  className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-emerald-600/20 transition-all hover:-translate-y-1"
                >
                  <Download className="w-5 h-5" /> Download Excel
                </button>
                <button
                  onClick={resetTool}
                  className="flex items-center justify-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3 px-6 rounded-xl transition-all"
                >
                  <RefreshCw className="w-4 h-4" /> New Table
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
