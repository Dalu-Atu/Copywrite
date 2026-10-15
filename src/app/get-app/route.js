import { NextResponse } from "next/server";

const APPLE_URL =
  "https://apps.apple.com/ng/app/noteocr-handwriting-to-text/id6803424702";
const GOOGLE_URL =
  "https://play.google.com/store/apps/details?id=com.noteocr.app";

export function GET(request) {
  const ua = request.headers.get("user-agent") || "";

  if (/iphone|ipad|ipod/i.test(ua)) return NextResponse.redirect(APPLE_URL);
  if (/android/i.test(ua) && GOOGLE_URL.startsWith("http")) {
    return NextResponse.redirect(GOOGLE_URL);
  }
  return NextResponse.redirect(new URL("/app", request.url));
}
