// @type {import('next').NextConfig}
const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

const nextConfig = {
  compiler: {
    styledComponents: true, // Enables styled-components support in Next.js
  },
  basePath: "/blog", // Set the basePath for all static assets
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"], // Ensure pages with .md and .mdx extensions work
};

module.exports = withMDX(nextConfig);
