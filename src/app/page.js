import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import Image from "next/image"; // ✅ Optimized image handling
import Footer from "./ui/Footer";
import Head from "next/head"; // ✅ SEO Improvements
import Logo from "./ui/Logo";
import { fetchBlogPosts } from "@/app/llib/getBlog";

// import Logo from "../ui/logo";

const HeaderComponent = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    background: "white",
    position: "sticky",
    top: 0,
    width: "100%",
    zIndex: 9000,
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.05)",
  };

  const headerStyleMedia = {
    "@media (max-width: 768px)": {
      padding: "0.5rem 1rem",
    },
  };

  const logoWrapperStyle = {
    cursor: "pointer",
  };

  const navStyle = {
    display: "flex",
    gap: "1.5rem",
  };

  const navStyleMedia = {
    "@media (max-width: 768px)": {
      flexDirection: "column",
      position: "fixed",
      top: 0,
      left: "-100%",
      width: "100vw",
      height: "100vh",
      background: "white",
      padding: "2rem",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      transition: "left 0.3s ease-in-out",
      zIndex: 999,
    },
  };

  const aStyle = {
    textDecoration: "none",
    color: "#333",
    fontWeight: 500,
    cursor: "pointer",
  };

  const aHoverStyle = {
    ":hover": {
      color: "#00796b",
    },
  };

  const aStyleMedia = {
    "@media (max-width: 768px)": {
      padding: "1rem 0",
      fontSize: "1.2rem",
      display: "block",
    },
  };

  const authButtonsStyle = {
    display: "flex",
    gap: "1rem",
  };

  const authButtonsStyleMedia = {
    "@media (max-width: 768px)": {
      display: "none",
    },
  };

  const buttonStyle = {
    background: "none",
    border: "none",
    color: "#333",
    fontWeight: 500,
    cursor: "pointer",
  };

  const buttonHoverStyle = {
    ":hover": {
      color: "#00796b",
    },
  };

  const signUpButtonStyle = {
    background: "#00796b",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "0.5rem 1rem",
    cursor: "pointer",
  };

  const signUpButtonHoverStyle = {
    ":hover": {
      background: "#005f56",
    },
  };

  const mobileLoginStyle = {
    display: "none",
  };

  const mobileLoginStyleMedia = {
    "@media (max-width: 768px)": {
      display: "block",
      background: "#fff",
      color: "#00796b",
      border: "none",
      padding: "8px 15px",
      borderRadius: "5px",
      cursor: "pointer",
      fontSize: "16px",
    },
  };

  return (
    <header
      style={{
        ...headerStyle,
        ...headerStyleMedia["@media (max-width: 768px)"],
      }}
    >
      <div style={logoWrapperStyle}>
        <Link href={`/`} className="block">
          <Logo />
        </Link>
      </div>

      <div style={{ display: "flex" }}>
        <Link href="/login" passHref>
          <button
            style={{
              ...mobileLoginStyle,
              ...mobileLoginStyleMedia["@media (max-width: 768px)"],
            }}
          >
            Login
          </button>
        </Link>
        <Link href="/signup" passHref>
          <button
            style={{
              ...mobileLoginStyle,
              ...mobileLoginStyleMedia["@media (max-width: 768px)"],
            }}
            // onClick={() => router.push("/login")}
          >
            Signup
          </button>
        </Link>
      </div>
    </header>
  );
};

export default async function BlogPage() {
  const blogs = await fetchBlogPosts(); // Fetching on the server

  return (
    <>
      <Head>
        {/* 🔹 SEO Title & Meta Description Optimized for Keywords */}
        <title>
          AI Blog - Handwriting to Text, OCR & Image to Text Insights
        </title>
        <meta
          name="description"
          content="Read expert insights on AI-powered handwriting recognition, OCR, and image-to-text conversion."
        />

        {/* 🔹 Open Graph (OG) Meta Tags for Social Media */}
        <meta
          property="og:title"
          content="AI Blog - OCR, Handwriting & Image to Text Insights"
        />
        <meta
          property="og:description"
          content="Latest AI research on handwriting recognition and OCR."
        />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:url" content="https://yourdomain.com/blog" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* 🔹 Favicon Fix */}
        <link rel="icon" type="image/png" href="/logo-icon.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/logo-icon.png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/logo-icon.png" />
      </Head>

      <HeaderComponent />

      <div className="min-h-screen bg-white text-black">
        <div className="container mx-auto px-4 mt-12 pb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-[#015979]">
            AI Blog: Handwriting to Text & OCR Insights
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {blogs.map(({ slug, title, date, description, image }) => (
              <div
                key={slug}
                className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow bg-white"
              >
                <Link href={`/${slug}`}>
                  <div className="relative w-full aspect-[16/9]">
                    <Image
                      src={image}
                      alt={title} // 🔹 Improved SEO for images
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-xl"
                    />
                  </div>
                  <div className="p-4 md:p-6">
                    <h2 className="text-lg md:text-2xl font-bold text-[#015979]">
                      {title}
                    </h2>
                    <p className="text-xs md:text-sm text-gray-600 mt-1">
                      {date}
                    </p>
                    <p className="text-sm text-gray-800 mt-2">{description}</p>
                    <div className="mt-3 md:mt-4 text-[#1b9e99] hover:underline">
                      Read More →
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// --color-primary:#015979;
// --color-secondary:#1b9e99;
