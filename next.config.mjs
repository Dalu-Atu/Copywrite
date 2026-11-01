import createNextIntlPlugin from "next-intl/plugin";
import withBundleAnalyzer from "@next/bundle-analyzer";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.js");

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Next 16 builds with Turbopack by default (dev and production)
  turbopack: {
    resolveAlias: {
      canvas: "./empty-module.js",
    },
  },

  // Only used if you ever run with --webpack
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

export default withNextIntl(bundleAnalyzer(nextConfig));
