/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: "https://copywritee.com",
  generateRobotsTxt: true,
  exclude: ["/icon.ico", "/apple-icon.png"], // Keep the sitemap clean
  changefreq: "daily",
  priority: 0.7,

  transform: async (config, path) => {
    const locales = ["en", "tr", "es", "zh", "hi", "de", "ja", "pt-br"];

    // 1. CLEAN THE PATH: Remove any existing locale prefix from the path
    // This prevents URLs like /en/es/tool-name
    const cleanPath = path.replace(
      /^\/(en|tr|es|zh|hi|de|ja|pt-br)(\/|$)/,
      "/"
    );
    const normalizedPath = cleanPath === "/" ? "" : cleanPath;

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),

      alternateRefs: [
        // 2. ADD X-DEFAULT: Points to English for unsupported regions
        {
          href: `${config.siteUrl}/en${normalizedPath}`,
          hreflang: "x-default",
        },
        // 3. MAP ALL LOCALES
        ...locales.map((locale) => ({
          href: `${config.siteUrl}/${locale}${normalizedPath}`,
          hreflang: locale,
        })),
      ],
    };
  },
};
