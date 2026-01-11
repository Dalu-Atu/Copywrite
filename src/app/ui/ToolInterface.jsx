"use client";
import React, { useState } from "react";
import {
  UploadCloud,
  FileType,
  Download,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { uploadAndTranscribe, downloadDocument } from "../lib/api-service";
import { toast } from "react-hot-toast";

export default function ToolInterface() {
  const [file, setFile] = useState(null);
  const [resultDoc, setResultDoc] = useState(null);

  // 1. Mutation for Uploading
  const { mutate: handleUpload, isPending: isProcessing } = useMutation({
    mutationFn: uploadAndTranscribe,
    onSuccess: (data) => {
      if (data.success) {
        setResultDoc(data.document);
        toast.success("Transcription complete!");
      }
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Upload failed. Try again."
      );
      setFile(null);
    },
  });
  const generateRandomDocName = (baseName = "noteocr_transcription") => {
    const timestamp = Date.now(); // unique
    const random = Math.random().toString(36).substring(2, 8); // short random
    return `${baseName}_${timestamp}_${random}`;
  };

  // 2. Helper: Convert File to Base64
  const processFile = async (selectedFile) => {
    setFile(selectedFile);
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
      const base64String = reader.result.split(",")[1];

      handleUpload({
        images: [base64String], // API expects array
        userId: "67b746ab6256a6bdb691b18a",
        conversionType: "imageToWord",
        documentName: generateRandomDocName(), // ✅ unique name
        folder: "Personal",
        updating: false,
      });
    };
  };

  const onFileChange = (e) => {
    if (e.target.files?.[0]) processFile(e.target.files[0]);
  };

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

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-3xl p-2 shadow-2xl ring-1 ring-black/5">
        <div className="border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 min-h-[320px] flex flex-col items-center justify-center relative overflow-hidden">
          {/* STATE: IDLE */}
          {!file && !isProcessing && (
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border group cursor-pointer hover:border-blue-400 transition-all">
                <UploadCloud className="w-10 h-10 text-blue-500" />
                <input
                  type="file"
                  onChange={onFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept="image/*"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Upload Handwriting
              </h3>
              <p className="text-slate-500 mb-8">
                Click or drag to convert image to Word
              </p>
            </div>
          )}

          {/* STATE: PROCESSING */}
          {isProcessing && (
            <div className="text-center p-8 w-full max-w-md">
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Analyzing Document...
              </h3>
              <p className="text-slate-500 text-sm">
                This usually takes 10-20 seconds
              </p>
            </div>
          )}

          {/* STATE: COMPLETE */}
          {resultDoc && !isProcessing && (
            <div className="text-center p-8 w-full">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100">
                <FileType className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Ready for Download!
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <button
                  onClick={handleDownload}
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all"
                >
                  <Download className="w-5 h-5" /> Download .DOCX
                </button>
                <button
                  onClick={() => {
                    setFile(null);
                    setResultDoc(null);
                  }}
                  className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 font-bold py-3 px-6 rounded-xl"
                >
                  <RefreshCw className="w-4 h-4" /> Start Over
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
