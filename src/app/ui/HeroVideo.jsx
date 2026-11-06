"use client";
import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

// Poster only until clicked, so no video bytes compete with LCP.
export default function HeroVideo({ poster, src, label, alt }) {
  const [on, setOn] = useState(false);
  return (
    <div className="relative aspect-video overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
      {on ? (
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          controls
          className="h-full w-full object-cover"
        />
      ) : (
        <>
          <Image
            src={poster}
            alt={alt}
            fill
            sizes="(min-width:1024px) 960px, 100vw"
            className="object-cover"
          />
          <button
            onClick={() => setOn(true)}
            aria-label={label}
            className="absolute inset-0 flex items-center justify-center bg-[#00415a]/10 transition hover:bg-[#00415a]/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1b9e99]"
          >
            <span className="flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-[#00415a] shadow-lg">
              <Play className="h-5 w-5" aria-hidden /> {label}
            </span>
          </button>
        </>
      )}
    </div>
  );
}
