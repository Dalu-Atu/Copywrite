"use client";
import React, { useState } from "react";
import {
  FilePlus,
  UploadCloud,
  Loader2,
  Layout,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  Image as ImageIcon,
  Save,
  Menu,
} from "lucide-react";

export default function EditorInterface() {
  const [view, setView] = useState("launcher"); // launcher | loading | editor

  const launchEditor = () => {
    setView("loading");
    setTimeout(() => {
      setView("editor");
    }, 1500); // Fake load time
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl shadow-black/50 ring-1 ring-white/10 overflow-hidden min-h-[500px] flex flex-col relative">
        {/* --- WINDOW HEADER (Mac Style) --- */}
        <div className="bg-slate-100 border-b border-slate-200 h-10 flex items-center px-4 justify-between">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400 border border-red-500/20"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-500/20"></div>
            <div className="w-3 h-3 rounded-full bg-green-400 border border-green-500/20"></div>
          </div>
          <div className="text-xs font-medium text-slate-500">
            NoteOcr Editor
          </div>
          <div className="w-10"></div> {/* Spacer */}
        </div>

        {/* --- VIEW 1: LAUNCHER (Select file or new) --- */}
        {view === "launcher" && (
          <div className="flex-1 flex items-center justify-center bg-slate-50 p-6 animate-in fade-in">
            <div className="grid md:grid-cols-2 gap-6 w-full max-w-2xl">
              {/* Option 1: New Doc */}
              <button
                onClick={launchEditor}
                className="group bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10 transition-all text-left"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                  <FilePlus className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  New Document
                </h3>
                <p className="text-slate-500 text-sm">
                  Start a blank Word or Excel file from scratch.
                </p>
              </button>

              {/* Option 2: Upload */}
              <button className="group bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10 transition-all text-left relative overflow-hidden">
                <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Upload File
                </h3>
                <p className="text-slate-500 text-sm">
                  Edit an existing .docx or .xlsx file.
                </p>
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={launchEditor}
                />
              </button>
            </div>
          </div>
        )}

        {/* --- VIEW 2: LOADING --- */}
        {view === "loading" && (
          <div className="flex-1 flex flex-col items-center justify-center bg-white animate-in fade-in">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
            <p className="text-slate-500 font-medium">Initializing Editor...</p>
          </div>
        )}

        {/* --- VIEW 3: MOCK EDITOR UI --- */}
        {view === "editor" && (
          <div className="flex-1 flex flex-col bg-white animate-in zoom-in-95 duration-300">
            {/* Toolbar */}
            <div className="border-b border-slate-200 px-4 py-3 flex items-center gap-6 bg-white sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <Menu className="w-5 h-5 text-slate-400" />
                <span className="font-bold text-slate-700 text-sm">
                  Untitled.docx
                </span>
              </div>
              <div className="h-6 w-px bg-slate-200"></div>

              {/* Tools */}
              <div className="flex items-center gap-1">
                <ToolIcon icon={<Layout className="w-4 h-4" />} />
                <ToolIcon icon={<Bold className="w-4 h-4" />} active />
                <ToolIcon icon={<Italic className="w-4 h-4" />} />
                <ToolIcon icon={<Underline className="w-4 h-4" />} />
                <div className="h-4 w-px bg-slate-200 mx-2"></div>
                <ToolIcon icon={<AlignLeft className="w-4 h-4" />} />
                <ToolIcon icon={<ImageIcon className="w-4 h-4" />} />
              </div>

              <div className="ml-auto">
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors">
                  <Save className="w-3 h-3" /> Save
                </button>
              </div>
            </div>

            {/* Canvas */}
            <div className="flex-1 bg-slate-100 p-8 overflow-hidden relative">
              <div className="max-w-3xl mx-auto bg-white shadow-lg min-h-[600px] p-12 relative">
                {/* Mock Content */}
                <div className="space-y-4">
                  <h1
                    className="text-4xl font-bold text-slate-900 border-none outline-none"
                    contentEditable
                  >
                    Project Proposal
                  </h1>
                  <p className="text-slate-400 italic text-sm">
                    Type / to insert...
                  </p>
                  <p className="text-slate-800 leading-relaxed" contentEditable>
                    This is a fully editable document environment. You can type
                    here, format text, and organize your ideas just like in
                    Microsoft Word.
                  </p>

                  {/* Fake Selection Highlight */}
                  <p className="text-slate-800 leading-relaxed">
                    <span className="bg-blue-100 text-blue-900 selection:bg-blue-200">
                      NoteOcr allows you to edit DOCX files directly in the
                      browser without installing any software.
                    </span>{" "}
                    It is fast, secure, and built for modern teams.
                  </p>

                  <ul className="list-disc pl-5 space-y-2 text-slate-800">
                    <li>Real-time collaboration ready</li>
                    <li>Export to PDF instantly</li>
                    <li>100% Free to use</li>
                  </ul>
                </div>

                {/* Fake Cursor */}
                <div className="absolute top-[320px] left-[180px] w-0.5 h-5 bg-blue-600 animate-pulse"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper for toolbar icons
function ToolIcon({ icon, active }) {
  return (
    <button
      className={`p-2 rounded hover:bg-slate-100 text-slate-500 transition-colors ${
        active ? "bg-blue-50 text-blue-600" : ""
      }`}
    >
      {icon}
    </button>
  );
}
