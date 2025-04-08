import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="robots" content="index, follow" />

        <meta property="og:image" content="/images/cover.png" />
        <meta property="og:url" content="https://copywritee.com" />
        <meta property="og:type" content="website" />
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
            name: "Copywrite",
            url: "https://copywritee.com",
            description:
              "Save time and skip the typing. convert handwriting to text or document instantly!",
            publisher: {
              "@type": "Organization",
              name: "Copywrite",
              logo: "/logo-icon.png",
            },
          })}
        </script>
      </head>
      <body className={` bg-gray-100 font-sans antialiased`}>
        <Analytics />
        <div>{children}</div>
      </body>
    </html>
  );
}
