import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  // Ensure these match your folder names in /messages or /locales
  locales: ["en", "tr", "es", "zh", "hi", "de", "ja", "pt-br", "fr"],
  defaultLocale: "en",
  // This ensures that if a user's browser is set to 'ja',
  // they are automatically sent to /ja
  localeDetection: true,
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
