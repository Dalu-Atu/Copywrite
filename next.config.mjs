import createNextIntlPlugin from "next-intl/plugin";
import withBundleAnalyzer from "@next/bundle-analyzer";

// Tell the plugin EXACTLY where your file is
const withNextIntl = createNextIntlPlugin("./src/i18n/request.js");

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

};

export default withNextIntl(bundleAnalyzer(nextConfig));
