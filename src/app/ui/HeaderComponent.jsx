"use client";

import Logo from "./Logo";

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
        <a href="/">
          <Logo />
        </a>
      </div>

      <nav
        style={{ ...navStyle, ...navStyleMedia["@media (max-width: 768px)"] }}
      >
        <a
          href="/"
          style={{
            ...aStyle,
            ...aHoverStyle,
            ...aStyleMedia["@media (max-width: 768px)"],
          }}
        >
          Home
        </a>
        <a
          onClick={() => scrollToSection("about")}
          style={{
            ...aStyle,
            ...aHoverStyle,
            ...aStyleMedia["@media (max-width: 768px)"],
          }}
        >
          About
        </a>
        <a
          onClick={() => scrollToSection("features")}
          style={{
            ...aStyle,
            ...aHoverStyle,
            ...aStyleMedia["@media (max-width: 768px)"],
          }}
        >
          Features
        </a>
        <a
          onClick={() => scrollToSection("testimonials")}
          style={{
            ...aStyle,
            ...aHoverStyle,
            ...aStyleMedia["@media (max-width: 768px)"],
          }}
        >
          Testimonial
        </a>
        <a
          onClick={() => scrollToSection("pricing")}
          style={{
            ...aStyle,
            ...aHoverStyle,
            ...aStyleMedia["@media (max-width: 768px)"],
          }}
        >
          Pricing
        </a>
      </nav>

      <div
        style={{
          ...authButtonsStyle,
          ...authButtonsStyleMedia["@media (max-width: 768px)"],
        }}
      >
        {/* <button style={{ ...buttonStyle, ...buttonHoverStyle }} onClick={() => router.push("/login")}>
          Login
        </button> */}
        <button
          style={signUpButtonStyle}
          onClick={() => router.push("/signup")}
        >
          Sign Up
        </button>
      </div>

      <button
        style={{
          ...mobileLoginStyle,
          ...mobileLoginStyleMedia["@media (max-width: 768px)"],
        }}
        onClick={() => router.push("/login")}
      >
        Login
      </button>
    </header>
  );
};

export default HeaderComponent;
