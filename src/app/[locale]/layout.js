import "../globals.css";
import ClientLayout from "../ui/ClientLayout";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Providers from "./providers";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        {/* ===== Favicons ===== */}

        {/* Light mode favicon */}
        <link
          rel="icon"
          href="/logo.png"
          media="(prefers-color-scheme: light)"
        />

        {/* Dark mode favicon */}
        <link
          rel="icon"
          href="/logo-white.png"
          media="(prefers-color-scheme: dark)"
        />

        {/* Fallback favicon (important for Safari) */}
        <link rel="icon" href="/logo.png" />

        {/* Apple Touch Icons */}
        <link
          rel="apple-touch-icon"
          href="/logo.png"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="apple-touch-icon"
          href="/logo-white.png"
          media="(prefers-color-scheme: dark)"
        />

        {/* Theme colors (browser UI) */}
        <meta
          name="theme-color"
          content="#ffffff"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#000000"
          media="(prefers-color-scheme: dark)"
        />

        {/* ===== Google Analytics ===== */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-YKS9QT9KWS"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-YKS9QT9KWS');
            `,
          }}
        />
      </head>

      <body className="bg-gray-100 font-sans antialiased">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Providers>
            <ClientLayout>{children}</ClientLayout>
          </Providers>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
