/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://noteocr.com",
  generateRobotsTxt: true,
  exclude: [
    "/icon.ico",
    "/icon.png", // 👈 add this
    "/favicon.png", // 👈 add this
    "/apple-icon.png",
    "/logo.png", // 👈 add this
    "/logo-white.png", // 👈 add this
  ],
  changefreq: "daily",
  priority: 0.7,
  outDir: "public",

  additionalPaths: async (config) => {
    const locales = [
      "tr",
      "es",
      "zh",
      "hi",
      "fr",
      "de",
      "ja",
      "pt-br",
      "da",
      "fi",
      "it",
      "nl",
      "no",
      "sv",
    ]; // 👈 English removed — it lives at root

    const basePages = [
      "",
      "/about",
      "/blog",
      "/careers",
      "/contact",
      "/cursive-to-text",
      "/docs",
      "/edit-pdf",
      "/handwriting-recognition",
      "/handwriting-to-docx",
      "/handwriting-to-excel",
      "/handwritten-inventory-to-excel",
      "/handwritten-invoice-to-excel",
      "/handwritten-timesheet-to-excel",
      "/jpg-to-word",
      "/online-editor",
      "/photo-to-word",
      "/pic-to-excel",
      "/pricing",
      "/privacy",
      "/scan-handwriting-to-text",
      "/scan-to-word",
      "/solutions",
      ,
      "/terms",
    ];

    const result = [];

    // English pages at root (no locale prefix)
    basePages.forEach((path) => {
      result.push({
        loc: `${path === "" ? "/" : path}`,
        changefreq: "daily",
        priority: path === "" ? 1.0 : 0.7,
        lastmod: new Date().toISOString(),
      });
    });

    // All other languages with prefix
    locales.forEach((locale) => {
      basePages.forEach((path) => {
        result.push({
          loc: `/${locale}${path}`,
          changefreq: "daily",
          priority: path === "" ? 1.0 : 0.7,
          lastmod: new Date().toISOString(),
        });
      });
    });

    return result;
  },

  transform: async (config, path) => {
    const locales = [
      "tr",
      "es",
      "zh",
      "hi",
      "de",
      "fr",
      "ja",
      "pt-br",
      "da",
      "fi",
      "it",
      "nl",
      "no",
      "sv",
    ]; // 👈 English removed here too

    // Strip any locale prefix to get the base path
    const cleanPath = path.replace(
      /^\/(tr|es|zh|hi|de|fr|fi|it|nl|no|sv|da|ja|pt-br)(\/|$)/,
      "/",
    );
    const normalizedPath = cleanPath === "/" ? "" : cleanPath;

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),

      alternateRefs: [
        {
          href: `${config.siteUrl}${normalizedPath || "/"}`,
          hreflang: "x-default", // 👈 points to root, not /en/
        },
        {
          href: `${config.siteUrl}${normalizedPath || "/"}`,
          hreflang: "en", // 👈 English also points to root
        },
        ...locales.map((locale) => ({
          href: `${config.siteUrl}/${locale}${normalizedPath}`,
          hreflang: locale,
        })),
      ],
    };
  },
};

export default config;
