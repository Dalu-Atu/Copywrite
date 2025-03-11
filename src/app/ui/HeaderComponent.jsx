"use client";

import Logo from "./Logo";
import { useRouter } from "next/navigation";
import Link from "next/link";

const HeaderComponent = () => {
  const router = useRouter();

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white sticky top-0 w-full z-[9000] shadow-md md:px-4 md:py-2">
      <Link href="/">
        <Logo />
      </Link>

      <nav className="hidden md:flex gap-6">
        <button
          onClick={() => router.push("/")}
          className="text-gray-800 font-medium hover:text-teal-700"
        >
          Home
        </button>
        <button
          onClick={() => scrollToSection("about")}
          className="text-gray-800 font-medium hover:text-teal-700"
        >
          About
        </button>
        <button
          onClick={() => scrollToSection("features")}
          className="text-gray-800 font-medium hover:text-teal-700"
        >
          Features
        </button>
        <button
          onClick={() => scrollToSection("testimonials")}
          className="text-gray-800 font-medium hover:text-teal-700"
        >
          Testimonial
        </button>
        <button
          onClick={() => scrollToSection("pricing")}
          className="text-gray-800 font-medium hover:text-teal-700"
        >
          Pricing
        </button>
      </nav>

      <div className="hidden md:flex gap-4">
        <button
          onClick={() => router.push("/login")}
          className="text-gray-800 font-medium hover:text-teal-700"
        >
          Login
        </button>
        <button
          onClick={() => router.push("/signup")}
          className="bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-600"
        >
          Sign Up
        </button>
      </div>

      <button
        onClick={() => router.push("/login")}
        className="md:hidden bg-white text-teal-700 px-4 py-2 rounded-md text-lg"
      >
        Login
      </button>
    </header>
  );
};

export default HeaderComponent;
