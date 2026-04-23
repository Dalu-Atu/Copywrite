/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://noteocr.com",
  generateRobotsTxt: true,
  exclude: ["/icon.ico", "/apple-icon.png"],
  changefreq: "daily",
  priority: 0.7,
  outDir: "public",

  additionalPaths: async (config) => {
    const locales = [
      "en",
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
    ];

    // 1. ALL BASE ROUTES (Mapped from your VS Code Sidebar)
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
      "/solutions/business",
      "/solutions/education",
      "/terms",
    ];

    // 2. DYNAMIC SLUGS (Optional)
    // If you have specific blog slugs or solution slugs, add them here
    const dynamicSlugs = [];

    const allBasePaths = [...basePages, ...dynamicSlugs];
    const result = [];

    // 3. THE MULTIPLIER LOGIC
    // This creates the path for every language automatically
    locales.forEach((locale) => {
      allBasePaths.forEach((path) => {
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
      "en",
      "tr",
      "es",
      "zh",
      "hi",
      "de",
      "ja",
      "fr",
      "pt-br",
      "da",
      "fi",
      "it",
      "nl",
      "no",
      "sv",
    ];

    // Clean the path to find the "base" version for alternate refs
    const cleanPath = path.replace(
      /^\/(en|tr|es|zh|hi|de|fr|fi|it|nl|no|sv|da|ja|pt-br)(\/|$)/,
      "/",
    );
    const normalizedPath = cleanPath === "/" ? "" : cleanPath;

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),

      // This tells Search Engines how the languages link together
      alternateRefs: [
        {
          href: `${config.siteUrl}/en${normalizedPath}`,
          hreflang: "x-default",
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
