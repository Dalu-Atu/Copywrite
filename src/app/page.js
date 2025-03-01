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

      <div
        style={{ minHeight: "100vh", backgroundColor: "white", color: "black" }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "48px 16px 40px",
          }}
        >
          <h1
            style={{
              fontSize: "2.25rem",
              fontWeight: "800",
              textAlign: "center",
              marginBottom: "48px",
              color: "#015979",
            }}
          >
            Daily Insights and Tools
          </h1>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(1, 1fr)",
              gap: "24px",
            }}
          >
            {blogs.map(({ slug, title, date, description, image }) => (
              <div
                key={slug}
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                  // boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  transition: "box-shadow 0.3s ease",
                  backgroundColor: "white",
                }}
              >
                <Link href={`/blog/solution/${slug}`}>
                  {/* <a> */}
                  <div style={{}}>
                    <Image
                      src={image}
                      alt={title} // 🔹 Improved SEO for images
                      objectFit="cover"
                      className="rounded-t-xl"
                      width={300}
                      height={200}
                    />
                  </div>
                  <div style={{ padding: "16px" }}>
                    <h2
                      style={{
                        fontSize: "1.125rem",
                        fontWeight: "700",
                        color: "#015979",
                      }}
                    >
                      {title}
                    </h2>
                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: "#6b7280",
                        marginTop: "4px",
                      }}
                    >
                      {date}
                    </p>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "#2d3748",
                        marginTop: "8px",
                      }}
                    >
                      {description}
                    </p>
                    <div
                      style={{
                        marginTop: "12px",
                        color: "#1b9e99",
                        cursor: "pointer",
                      }}
                    >
                      Read More →
                    </div>
                  </div>
                  {/* </a> */}
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
