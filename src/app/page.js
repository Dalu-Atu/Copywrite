// app/page.js or pages/index.js depending on your Next.js version
import Head from "next/head";
import HomePage from "./ui/HomePage";
export default function Home() {
  return (
    <>
      <Head>
        <title>
          CopyWrite | Convert handwriting to text instantly | We Tested Every
          Handwriting
        </title>
        <meta
          name="description"
          content="Convert handwritten notes, images, and PDFs to editable text with 98% accuracy using our AI-powered OCR technology. Free trial available."
        />
        <meta
          name="keywords"
          content="OCR software, text extraction, handwriting recognition, PDF conversion, image to text, handwriting to text"
        />
        <link rel="canonical" href="https://copywriteplus.com/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "CopyWrite",
              applicationCategory: "WebApplication",
              operatingSystem: "Web browser",
              offers: {
                "@type": "Offer",
                price: "7.99",
                priceCurrency: "USD",
              },
              description:
                "AI-powered OCR solution for converting handwritten notes, images and PDFs to editable text.",
            }),
          }}
        />
      </Head>
      <HomePage />
    </>
  );
}
