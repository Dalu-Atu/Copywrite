"use client";

function Logo() {
  const styleLogo = {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    margin: "0 24px",
    overflow: "hidden",
    maxHeight: "30px",
    position: "relative",
    left: "-0.4rem",
    zIndex: 0,
    maxWidth: "170px",
  };

  const styleLogoMedia768 = {
    "@media (max-width: 768px)": {
      position: "relative",
      left: "-0.5rem",
    },
  };

  const imgStyle = {
    height: "180px",
    width: "auto",
    position: "relative",
    right: "1rem",
  };

  const imgStyleMedia400 = {
    "@media (max-width: 400px)": {
      height: "150px",
    },
  };

  return (
    <div
      style={{
        ...styleLogo,
        ...styleLogoMedia768["@media (max-width: 768px)"],
      }}
    >
      <img
        src="/default.png"
        alt="Copywrite+ Logo"
        style={{
          ...imgStyle,
          ...imgStyleMedia400["@media (max-width: 400px)"],
        }}
      />
    </div>
  );
}

export default Logo;
