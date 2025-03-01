/** @type {import('next').NextConfig} */

export default nextConfig;
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

module.exports = withMDX({
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true, // Enables styled-components support in Next.js
  },
};

module.exports = nextConfig;
