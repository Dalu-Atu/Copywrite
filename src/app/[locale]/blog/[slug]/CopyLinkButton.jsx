"use client";
import { useState } from "react";
import { Link as LinkIcon, Check } from "lucide-react";

export function CopyLinkButton({ url }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-3 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors text-left"
    >
      {copied ? (
        <Check className="w-4 h-4 text-emerald-500" />
      ) : (
        <LinkIcon className="w-4 h-4" />
      )}
      {copied ? "Link Copied!" : "Copy Link"}
    </button>
  );
}
