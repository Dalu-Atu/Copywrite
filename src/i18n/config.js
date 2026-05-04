import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: [
    "en",
    "tr",
    "es",
    "zh",
    "hi",
    "de",
    "ja",
    "pt-br",
    "fr",
    "da",
    "fi",
    "it",
    "nl",
    "no",
    "sv",
  ],
  defaultLocale: "en",
  localePrefix: "as-needed", // 👈 add this
  localeDetection: true,
});
