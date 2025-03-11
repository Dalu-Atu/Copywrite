import { Geist, Geist_Mono } from "next/font/google";
import GlobalStyles from "./styles/GlobalStyles";
import Head from "next/head";
import StyledComponentsRegistry from "./lib/styledComponentsRegistry";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Convert Handwriting to Text | Copywrite+ AI OCR",
  description:
    "Easily convert handwriting to text with AI-powered OCR. Convert scanned documents, images, and handwritten notes into editable Word, PDF, and text formats.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Essential Meta Tags */}
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta name="description" content={metadata.description} />
        <meta
          name="keywords"
          content="convert handwriting to text, AI OCR, handwriting to text converter, scan to text, image to text, text recognition, handwriting recognition, OCR scanner, extract text from image, PDF to text, AI text extraction, digital handwriting converter, scan and edit text, handwriting transcription, handwritten document converter, image OCR tool, document scanner, AI-powered OCR"
        />
        <meta name="author" content="Copywrite+" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph (OG) Tags for Social Sharing */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content="/social-preview.jpg" />
        <meta property="og:url" content="https://copywritee.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content="/social-preview.jpg" />

        {/* Favicon & Icons */}
        <link rel="icon" href="/logo-icon.png" type="image/png" sizes="32x32" />
        <link rel="shortcut icon" href="/logo-icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo-icon.png" />
        <meta name="theme-color" content="#ffffff" />

        {/* Schema.org Structured Data (JSON-LD) for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Copywrite+",
            url: "https://copywritee.com",
            description: metadata.description,
            publisher: {
              "@type": "Organization",
              name: "Copywrite+",
              logo: "/logo-icon.png",
            },
          })}
        </script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GlobalStyles />
        <StyledComponentsRegistry>
          <div>{children}</div>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
