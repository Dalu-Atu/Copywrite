import Image from "next/image";

function Logo() {
  const styleLogo = {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    margin: "0 24px",
    overflow: "hidden",
    maxHeight: "40px",
    position: "relative",
    left: "-0.4rem",
    zIndex: 0,
    maxWidth: "170px",

    transform: "scale(1.2)",
  };

  const styleLogoMedia768 = {
    "@media (max-width: 768px)": {
      position: "relative",
      left: "-0.5rem",
    },
  };

  const imgStyle = {
    // height: "200px",
    // width: "auto",
    // position: "relative",
    // right: "1rem",
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
      <Image
        src="/default.png"
        alt="Copywrite+ Logo"
        width={150}
        height={100}
        style={{
          ...imgStyle,
          ...imgStyleMedia400["@media (max-width: 400px)"],
        }}
      />
    </div>
  );
}

export default Logo;
