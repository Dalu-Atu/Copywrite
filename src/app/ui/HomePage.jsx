"use client";
// import React, { useEffect, useState } from "react";
// import HeaderComponent from "./HeaderComponent";
// import FeaturesSection from "./FeatureSection";
// import {
//   ConversionSectionExcel,
//   ConversionSectionWord,
// } from "./ConversionSection";
// import TestimonialSection from "./TestimonialSection";
// import PricingSection from "./Pricing";
// import Footer from "./Footer";
// import FAQSection from "./Faq";
// import Head from "next/head";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import HowItWorksSection from "./HowItWorks";
// import BlogSection from "./BlogSection";

// const messages = [
//   "Upload your paper, convert it to text, and get a professional document ready for download or editing",
//   "Experience AI-powered handwriting-to-text conversion with unmatched precision and speed.",
//   "From messy notes to polished documents, our tool makes it effortless.",
// ];

// const HomePage = () => {
//   const [text, setText] = useState("");
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [loopIndex, setLoopIndex] = useState(0);
//   const [typingSpeed, setTypingSpeed] = useState(80);
//   const [pauseBeforeDelete, setPauseBeforeDelete] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const handleTyping = () => {
//       const currentMessage = messages[loopIndex % messages.length];

//       if (!isDeleting && !pauseBeforeDelete) {
//         setText(currentMessage.substring(0, text.length + 1));
//         if (text === currentMessage) {
//           setPauseBeforeDelete(true);
//           setTimeout(() => setIsDeleting(true), 2000);
//         }
//       } else if (isDeleting) {
//         setText(currentMessage.substring(0, text.length - 1));
//         if (text === "") {
//           setIsDeleting(false);
//           setLoopIndex(loopIndex + 1);
//           setPauseBeforeDelete(false);
//           setTypingSpeed(150);
//         }
//       }
//     };

//     const typingTimeout = setTimeout(handleTyping, typingSpeed);

//     return () => clearTimeout(typingTimeout);
//   }, [text, isDeleting, pauseBeforeDelete, loopIndex, messages, typingSpeed]);

//   return (
//     <>
//       <Head>
//         <title>Copywrite | Convert Handwriting to Text instantly</title>
//         <meta
//           name="description"
//           content="Easily convert handwriting into perfectly formatted text documents. Fast, accurate, and effortless conversion."
//         />
//         <meta
//           name="keywords"
//           content="handwriting to text, AI converter, digital handwriting, OCR software, handwritten notes to text, image to text, text recognition, handwriting recognition, document scanning, digital note taking, handwriting analysis, convert handwriting to digital text, ai handwriting reader, best handwriting converter, free handwriting to text, online handwriting recognition"
//         />
//         <meta name="author" content="Copywrite" />

//         {/* Open Graph for social media */}
//         <meta property="og:title" content="Convert handwriting to text" />
//         <meta
//           property="og:description"
//           content="Convert your handwritten notes into formatted digital documents in seconds."
//         />
//         <meta property="og:image" content="/images/handwritting-to-text.png" />
//         <meta property="og:url" content="https://copywritee.com" />
//         <meta property="og:type" content="website" />

//         {/* Twitter Card */}
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta
//           name="twitter:title"
//           content="Convert Handwriting to Text - AI Handwriting Converter"
//         />
//         <meta
//           name="twitter:description"
//           content="Effortlessly digitize handwritten notes using AI technology."
//         />
//         <meta name="twitter:image" content="/images/default.png" />
//       </Head>

//       <main>
//         <div className="absolute top-[35%] left-[85%] w-[10vw] h-[10vw] z-[-1] bg-gradient-to-r from-[#56b4d3] to-[#62e389] blur-[40px] rounded-full md:top-[45%] md:left-[80%] md:w-[15vw] md:h-[15vw]"></div>
//         <div className="absolute top-[35%] right-[85%] w-[10vw] h-[10vw] z-[-1] bg-gradient-to-r from-[#62e389] to-[#56b4d3] blur-[40px] rounded-full md:top-[45%] md:right-[80%] md:w-[15vw] md:h-[15vw]"></div>
//         <HeaderComponent />
//         <section id="home" className="text-center max-w-5xl mx-auto mt-12">
//           <h1 className="text-2xl font-bold leading-snug text-[#00415a] sm:text-3xl md:text-4xl px-2">
//             Convert Handwriting into Perfectly
//             <span className="bg-gradient-to-r from-[#015979] via-[#1b9e99] to-[#39f8f2] bg-clip-text text-transparent font-bold">
//               {" "}
//               Formatted <br className="hidden sm:inline" /> Documents in Seconds
//             </span>
//           </h1>
//           <p className="text-lg text-gray-600 w-4/5 mx-auto mt-2">{text}</p>
//           <p
//             style={{
//               marginTop: "1rem",
//               textAlign: "center",
//               color: "#706900",
//               fontSize: "large",
//               marginLeft: "20px",
//               marginRight: "20px",
//             }}
//           >
//             {" "}
//             <i>Start Your 2-Day Free Trial When You Sgnup</i>
//           </p>
//           <div className="flex justify-center gap-4 mt-6 mb-4">
//             <button
//               onClick={() => router.push("https://app.copywritee.com/signup")}
//               className="border-2 border-[#1b9e99] text-[#1b9e99] rounded-md px-6 py-3 transition-all hover:bg-[#015979] hover:text-white"
//             >
//               Get Started
//             </button>
//             <button
//               onClick={() =>
//                 router.push("https://app.copywritee.com/upload-image")
//               }
//               className="bg-[#1b9e99] text-white rounded-md px-6 py-3 transition-all hover:bg-[#015979]"
//             >
//               Upload Image
//             </button>
//           </div>

//           <div className="relative inline-block w-[95%]">
//             <Image
//               src="/images/handwritting-to-text.png"
//               alt="AI-powered handwriting to text conversion"
//               title="AI-powered handwriting to text conversion"
//               width={800}
//               height={450}
//               layout="responsive"
//               priority
//             />
//             <div className="absolute bottom-0 left-0 right-0 h-1/5 bg-gradient-to-b from-transparent to-white"></div>
//           </div>
//         </section>
//         <p
//           style={{
//             textAlign: "center",
//             color: "gray",
//             marginTop: "1rem",
//             position: "relative",
//             top: "1rem",
//             fontSize: "large",
//             marginLeft: "20px",
//             marginRight: "20px",
//           }}
//         >
//           {" "}
//           ❤️ Loved by +5000 working professionals!
//         </p>
//         <FeaturesSection />
//         <HowItWorksSection />
//         <section>
//           <ConversionSectionWord />
//           <ConversionSectionExcel />
//         </section>
//         <TestimonialSection />
//         <PricingSection />
//         <FAQSection />
//         <BlogSection />
//         <Footer />
//       </main>
//     </>
//   );
// };

// export default HomePage;

import { useState, useEffect, useRef } from "react";
// import Header from "@/components/Header";
// import Hero from "@/components/Hero";
// import About from "@/components/About";
// import Skills from "@/components/Skills";
// import Projects from "@/components/Projects";
// import Contact from "@/components/Contact";
// import Footer from "@/components/Footer";
// import Preloader from "@/components/Preloader";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <main className="bg-slate-900 text-white">
      {loading ? (
        <Preloader />
      ) : (
        <>
          <Header />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
          <Footer />
        </>
      )}
    </main>
  );
}

// File: /components/Header.js

import { Database, FileType, Menu, Server, X } from "lucide-react";
import {
  ArrowRight,
  Code,
  ExternalLink,
  GitHub,
  Linkedin,
  Zap,
  BarChart,
  Layers,
  CheckCircle,
} from "lucide-react";
import { FaNodeJs, FaReact } from "react-icons/fa";
import Image from "next/image";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollPosition > 50
          ? "bg-slate-900/90 backdrop-blur-md py-4 shadow-lg"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a
          href="#home"
          className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
        >
          Daniel Atu
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-white transition-colors duration-300 text-lg font-medium"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Navigation Toggle */}
        <button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-800 absolute w-full">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-white transition-colors duration-300 text-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

// File: /components/Preloader.js
function Preloader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-900 z-50">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        <p className="mt-4 text-blue-400 text-xl font-mono">Loading...</p>
      </div>
    </div>
  );
}

// File: /components/Hero.js
function Hero() {
  const [scrolled, setScrolled] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const specialties = [
    "Full Stack Developer",
    "Mern Stack Developer",
    "React Specialist",
    "Node.js Expert",
    "UI/UX Enthusiast",
  ];
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const delayAfterWord = 2000;

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle text typing animation
  useEffect(() => {
    const word = specialties[currentWordIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setTypedText(word.substring(0, typedText.length + 1));

          if (typedText.length === word.length) {
            setTimeout(() => setIsDeleting(true), delayAfterWord);
          }
        } else {
          setTypedText(word.substring(0, typedText.length - 1));

          if (typedText.length === 0) {
            setIsDeleting(false);
            setCurrentWordIndex((currentWordIndex + 1) % specialties.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, currentWordIndex]);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative pt-20"
    >
      {/* Background effects - enhanced with more natural gradients */}
      <div className="absolute inset-0 overflow-hidden bg-slate-950">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl opacity-5"></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px] opacity-20"></div>

        {/* Subtle animated particles */}
        <div className="particle-container absolute inset-0 overflow-hidden opacity-30"></div>
      </div>

      <div
        className={`container mx-auto px-6 z-10 transition-all duration-700 ${
          scrolled ? "opacity-90 scale-95" : "opacity-100"
        }`}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="lg:w-3/5">
            {/* Small badge */}
            <div className="inline-flex items-center px-3 py-1 mb-8 text-sm font-medium bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20">
              <span className="w-2 h-2 mr-2 rounded-full bg-blue-400 animate-pulse"></span>
              Available for work
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="block mb-2 text-gray-100">Hi, I'm Daniel</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400">
                {typedText}
                <span className="inline-block w-1 h-12 ml-1 bg-blue-400 animate-blink"></span>
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl">
              I build exceptional digital experiences with modern tech stacks.
              Specializing in React, Node.js, and cloud architecture, I
              transform complex problems into elegant solutions that drive
              business growth. From scratch to production
            </p>

            {/* Social links */}
            <div className="flex items-center gap-6 mb-8">
              <a
                href="www.linkedin.com/in/daniel-atu-a8b753359"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <span className="w-px h-6 bg-gray-700"></span>
              <div className="flex items-center text-gray-400">
                <Code size={18} className="mr-2" />
                <span>3+ years of experience</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="group px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/20 flex items-center"
              >
                View My Work
                <ArrowRight
                  size={18}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </a>
              <a
                href="#contact"
                className="px-8 py-3 border border-gray-700 rounded-full text-white font-medium hover:bg-white/5 transition-colors flex items-center"
              >
                Contact Me
                <ExternalLink size={18} className="ml-2 opacity-70" />
              </a>
            </div>
          </div>

          <div className="lg:w-2/5 flex justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              {/* Spinning outer ring with gradient */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 animate-spin-slow opacity-70"></div>

              {/* Second ring with different rotation */}
              <div className="absolute inset-8 bg-slate-900 rounded-full flex items-center justify-center border border-slate-800 shadow-2xl ring-1 ring-white/10">
                <div className="text-center p-6">
                  {/* Profile Image */}
                  <div className="w-40 h-40 rounded-full mx-auto mb-5 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center overflow-hidden border-4 border-white/10 shadow-lg hover:scale-105 transition-transform duration-300">
                    <Image
                      width={800}
                      height={800}
                      src="/me.jpeg"
                      alt="Profile Picture"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Name & Title */}
                  <div className="space-y-1">
                    <p className="text-xl font-bold text-gray-100 tracking-wide">
                      Daniel Atu
                    </p>
                    <p className="text-sm font-mono text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                      MERN Stack Specialist
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tech stack display */}
        <div className="mt-20 pt-10 border-t border-gray-800/50">
          <p className="text-center text-sm text-gray-500 uppercase tracking-widest mb-6">
            Technology Stack
          </p>
          <div className="flex flex-wrap justify-center gap-8 opacity-70">
            {[
              "React",
              "Node.js",
              "MongoDB",
              "Express",
              "TypeScript",
              "AWS",
            ].map((tech) => (
              <div key={tech} className="text-center">
                <div className="w-12 h-12 mb-2 mx-auto bg-gray-800/50 rounded-lg flex items-center justify-center">
                  <span className="text-xl">
                    {tech === "React" ? (
                      <FaReact />
                    ) : tech === "Node.js" ? (
                      <FaNodeJs />
                    ) : tech === "MongoDB" ? (
                      <Database />
                    ) : tech === "Express" ? (
                      <Server />
                    ) : tech === "TypeScript" ? (
                      <FileType />
                    ) : (
                      "☁️"
                    )}
                  </span>
                </div>
                <p className="text-xs text-gray-400">{tech}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// File: /components/About.js
function About() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Full Stack MERN Developer
            </h3>
            <p className="text-gray-300 mb-6">
              With a passion for crafting clean, efficient, and scalable web
              applications, I specialize in the MERN stack (MongoDB, Express.js,
              React.js, Node.js). My journey in web development began 3 years
              ago, and since then, I've dedicated myself to mastering modern
              technologies and best practices.
            </p>
            <p className="text-gray-300 mb-6">
              I approach each project with a focus on user experience, search
              engine optimization, performance, and maintainability. Whether
              working independently or as part of a team, I strive to deliver
              solutions that not only meet but exceed expectations.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <h4 className="font-semibold mb-2">Name:</h4>
                <p className="text-gray-300">Atu Chukwudalu Daniel</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Email:</h4>
                <p className="text-gray-300">danieelatu@gmail.com</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">From:</h4>
                <p className="text-gray-300">Sapele, Nigeria</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Experience:</h4>
                <p className="text-gray-300">3+ Years</p>
              </div>
            </div>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-medium hover:opacity-90 transition-opacity inline-block"
            >
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// File: /components/Skills.js
function Skills() {
  const [activeTab, setActiveTab] = useState("frontend");
  const skillsRef = useRef(null);
  const animatedSkillsRef = useRef({
    frontend: [],
    backend: [],
  });

  const frontendSkills = [
    { name: "React.js", progress: 95, icon: <Code className="w-4 h-4" /> },
    { name: "Next.js", progress: 90, icon: <Zap className="w-4 h-4" /> },
    { name: "JavaScript", progress: 95, icon: <Code className="w-4 h-4" /> },
    {
      name: "React Query",
      progress: 89,
      icon: <Layers className="w-4 h-4" />,
    },
    {
      name: "Redux",
      progress: 70,
      icon: <Layers className="w-4 h-4" />,
    },
    { name: "HTML/CSS", progress: 95, icon: <Layers className="w-4 h-4" /> },
    {
      name: "Tailwind CSS",
      progress: 80,
      icon: <Layers className="w-4 h-4" />,
    },
    {
      name: "Styled Component",
      progress: 93,
      icon: <Layers className="w-4 h-4" />,
    },
  ];

  const backendSkills = [
    { name: "Node.js", progress: 90, icon: <Server className="w-4 h-4" /> },
    { name: "Express.js", progress: 90, icon: <Server className="w-4 h-4" /> },
    { name: "MongoDB", progress: 85, icon: <Server className="w-4 h-4" /> },
    { name: "RESTful APIs", progress: 90, icon: <Zap className="w-4 h-4" /> },
    { name: "GraphQL", progress: 50, icon: <Zap className="w-4 h-4" /> },
    { name: "AWS", progress: 75, icon: <Server className="w-4 h-4" /> },
  ];

  const otherSkills = [
    { name: "Git & GitHub", category: "tools" },
    { name: "CI/CD", category: "tools" },
    { name: "Jest", category: "testing" },
    { name: "Redux", category: "frontend" },
    { name: "Material UI", category: "frontend" },
    { name: "Supabase", category: "backend" },
    { name: "Docker", category: "devops" },
    { name: "Firebase", category: "backend" },
    { name: "Socket.io", category: "backend" },
    { name: "MVC", category: "methodology" },
    { name: "Responsive Design", category: "frontend" },
    { name: "Performance Optimization", category: "optimization" },
    { name: "Search Engine Optimization", category: "optimization" },
  ];

  // Categorize other skills by type for display
  const getSkillColor = (category) => {
    const colors = {
      frontend: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      backend: "bg-purple-500/10 text-purple-400 border-purple-500/20",
      tools: "bg-green-500/10 text-green-400 border-green-500/20",
      testing: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      design: "bg-pink-500/10 text-pink-400 border-pink-500/20",
      devops: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      methodology: "bg-orange-500/10 text-orange-400 border-orange-500/20",
      optimization: "bg-lime-500/10 text-lime-400 border-lime-500/20",
    };
    return (
      colors[category] || "bg-gray-500/10 text-gray-400 border-gray-500/20"
    );
  };

  // Animate skill bars when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            animateSkills("frontend");
            animateSkills("backend");
          }, 400);
        }
      },
      { threshold: 0.2 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
    };
  }, []);

  const animateSkills = (type) => {
    animatedSkillsRef.current[type].forEach((bar, index) => {
      if (bar) {
        setTimeout(() => {
          bar.style.width = `${
            type === "frontend"
              ? frontendSkills[index].progress
              : backendSkills[index].progress
          }%`;
          bar.style.opacity = "1";
        }, index * 100);
      }
    });
  };

  return (
    <section
      id="skills"
      ref={skillsRef}
      className="py-24 relative bg-gradient-to-b from-slate-900 to-slate-950"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-blue-500/5 to-transparent"></div>
        <div className="absolute right-0 top-1/3 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute left-0 bottom-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-16">
          <span className="inline-block px-4 py-1 bg-blue-500/10 text-blue-400 text-sm font-medium rounded-full mb-4">
            MY EXPERTISE
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Technical{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400">
              Proficiency
            </span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto"></div>

          <p className="text-gray-300 mt-6 max-w-2xl mx-auto text-center">
            My skills span the entire development stack, with specialized
            expertise in modern JavaScript frameworks and cloud technologies.
          </p>
        </div>

        {/* Main dashboard */}
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-white/5 shadow-xl">
          {/* Skills navigation */}
          <div className="flex justify-center mb-10">
            <div className="flex bg-slate-800/70 p-1 rounded-xl overflow-hidden">
              <button
                onClick={() => {
                  setActiveTab("frontend");
                  setTimeout(() => animateSkills("frontend"), 100);
                }}
                className={`flex-1 px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-medium flex items-center justify-center text-sm sm:text-base ${
                  activeTab === "frontend"
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                }`}
              >
                <Layers
                  className={`w-4 h-4 mr-1 sm:mr-2 ${
                    activeTab === "frontend" ? "text-white" : "text-blue-400"
                  }`}
                />
                Frontend
              </button>

              <button
                onClick={() => {
                  setActiveTab("backend");
                  setTimeout(() => animateSkills("backend"), 100);
                }}
                className={`flex-1 px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-medium flex items-center justify-center text-sm sm:text-base ${
                  activeTab === "backend"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                }`}
              >
                <Server
                  className={`w-4 h-4 mr-1 sm:mr-2 ${
                    activeTab === "backend" ? "text-white" : "text-purple-400"
                  }`}
                />
                Backend
              </button>

              <button
                onClick={() => setActiveTab("additional")}
                className={`flex-1 px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-medium flex items-center justify-center text-sm sm:text-base ${
                  activeTab === "additional"
                    ? "bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg"
                    : "text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                }`}
              >
                <CheckCircle
                  className={`w-4 h-4 mr-1 sm:mr-2 ${
                    activeTab === "additional" ? "text-white" : "text-green-400"
                  }`}
                />
                More
              </button>
            </div>
          </div>

          {/* Frontend Skills */}
          <div
            className={`transition-all duration-500 ${
              activeTab === "frontend"
                ? "opacity-100 translate-x-0"
                : "opacity-0 absolute -translate-x-full"
            }`}
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {frontendSkills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="bg-slate-800/50 rounded-xl p-6 border border-white/5 hover:border-blue-500/30 transition-all hover:shadow-lg hover:shadow-blue-500/5 group"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mr-4 group-hover:bg-blue-500/20 transition-colors">
                      {skill.icon}
                    </div>
                    <div>
                      <h4 className="font-medium">{skill.name}</h4>
                      <div className="text-sm text-gray-400">
                        {skill.progress}% Proficiency
                      </div>
                    </div>
                  </div>

                  <div className="w-full bg-slate-700/50 rounded-full h-2.5 overflow-hidden">
                    <div
                      ref={(el) =>
                        (animatedSkillsRef.current.frontend[index] = el)
                      }
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2.5 rounded-full w-0 opacity-0 transition-all duration-1000 ease-out"
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <div className="text-center text-cyan-400 text-sm font-medium">
                <BarChart className="w-4 h-4 inline-block mr-2" />
                Frontend Development Skills Breakdown
              </div>
            </div>
          </div>

          {/* Backend Skills */}
          <div
            className={`transition-all duration-500 ${
              activeTab === "backend"
                ? "opacity-100 translate-x-0"
                : "opacity-0 absolute -translate-x-full"
            }`}
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {backendSkills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="bg-slate-800/50 rounded-xl p-6 border border-white/5 hover:border-purple-500/30 transition-all hover:shadow-lg hover:shadow-purple-500/5 group"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mr-4 group-hover:bg-purple-500/20 transition-colors">
                      {skill.icon}
                    </div>
                    <div>
                      <h4 className="font-medium">{skill.name}</h4>
                      <div className="text-sm text-gray-400">
                        {skill.progress}% Proficiency
                      </div>
                    </div>
                  </div>

                  <div className="w-full bg-slate-700/50 rounded-full h-2.5 overflow-hidden">
                    <div
                      ref={(el) =>
                        (animatedSkillsRef.current.backend[index] = el)
                      }
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full w-0 opacity-0 transition-all duration-1000 ease-out"
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <div className="text-center text-pink-400 text-sm font-medium">
                <BarChart className="w-4 h-4 inline-block mr-2" />
                Backend Development Skills Breakdown
              </div>
            </div>
          </div>

          {/* Additional Skills */}
          <div
            className={`transition-all duration-500 ${
              activeTab === "additional"
                ? "opacity-100 translate-x-0"
                : "opacity-0 absolute -translate-x-full"
            }`}
          >
            <div className="p-6 bg-slate-800/50 rounded-xl border border-white/5">
              <h4 className="font-medium mb-6 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                Additional Technical Skills & Tools
              </h4>

              <div className="flex flex-wrap gap-3">
                {otherSkills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border ${getSkillColor(
                      skill.category
                    )} flex items-center hover:scale-105 transition-transform`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>

              <div className="mt-8 p-4 bg-slate-800/70 rounded-lg border border-white/5">
                <div className="text-center text-sm text-gray-400">
                  <span className="text-green-400 font-medium">Note:</span>{" "}
                  These skills complement my core development expertise and
                  enable me to deliver comprehensive solutions across the full
                  product lifecycle.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom summary section */}
        {/* <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            Technologies I Love Working With
          </h3>

          <div className="flex justify-center flex-wrap gap-8 mt-8">
            <div className="w-32 h-32 bg-slate-800/30 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center border border-white/5 p-4 hover:border-blue-500/30 transition-all hover:shadow-lg hover:shadow-blue-500/5">
              <div className="text-4xl mb-2">⚛️</div>
              <div className="text-sm font-medium">React.js</div>
              <div className="text-xs text-blue-400">Expert</div>
            </div>

            <div className="w-32 h-32 bg-slate-800/30 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center border border-white/5 p-4 hover:border-green-500/30 transition-all hover:shadow-lg hover:shadow-green-500/5">
              <div className="text-4xl mb-2">🟢</div>
              <div className="text-sm font-medium">Node.js</div>
              <div className="text-xs text-green-400">Expert</div>
            </div>

            <div className="w-32 h-32 bg-slate-800/30 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center border border-white/5 p-4 hover:border-cyan-500/30 transition-all hover:shadow-lg hover:shadow-cyan-500/5">
              <div className="text-4xl mb-2">📘</div>
              <div className="text-sm font-medium">TypeScript</div>
              <div className="text-xs text-cyan-400">Advanced</div>
            </div>

            <div className="w-32 h-32 bg-slate-800/30 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center border border-white/5 p-4 hover:border-purple-500/30 transition-all hover:shadow-lg hover:shadow-purple-500/5">
              <div className="text-4xl mb-2">🍃</div>
              <div className="text-sm font-medium">MongoDB</div>
              <div className="text-xs text-purple-400">Advanced</div>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
}

// File: /components/Projects.js
function Projects() {
  const projects = [
    {
      id: 1,
      title: "Copywrite | Convert handwriting to formatted documents",
      description:
        "An AI SaaS platform that eliminates manual typing by instantly converting handwritten notes into perfectly formatted digital documents. Transform handwritten tables into Excel spreadsheets, fine-tune with the built-in editor, and access all your documents securely from anywhere through cloud storage.",

      image: "/copywrite-overview.png",
      tags: [
        "React",
        "Node.js",
        "next.js",
        "Tailwind Css",
        "Express",
        "MongoDB",
        "React Query",
        "Stripe",
      ],
      demoLink: "https://copywritee.com/",
    },
    {
      id: 2,
      title: "Oruese School | Hybrid school Management System",
      description:
        "A modern, cloud-based School Management System built with React, Node.js, and Supabase, designed to simplify school administration. It streamlines student enrollment, attendance tracking, grading, and communication between teachers, students, and parents. Featuring secure authentication, real-time data updates, and an intuitive dashboard, it enhances efficiency for educational institutions",
      image: "/dashboard-placeholder.jpg",
      tags: [
        "React",
        "Styled  Component",
        "Supabase",
        "Express",
        "Node js",
        "Socket.io",
      ],
      demoLink: "https://orueseinternationalschool.com/",
    },
    {
      id: 3,
      title: "NextWave – Movie Streaming & Downloading Platform",
      description:
        "NextWave is a modern movie streaming and downloading platform that offers a seamless entertainment experience. With a sleek interface inspired by Google TV, users can  stream and download latest movies as soon as its been releasd. explore movies, series, and genres effortlessly",
      image: "/tasks-placeholder.jpg",
      tags: ["React", "Node.js", "MongoDB", "Socket.io", "JWT", "Express"],
      demoLink: "https://nextwave-one.vercel.app/",
    },
    {
      id: 4,
      title: "AmazonAura | Best Daily Deals on Amazon",
      description:
        "AmazonAura is a smart deal aggregation platform that helps users find the best daily discounts on Amazon in real time. Using web scraping and automation, it curates top deals across various categories, ensuring users never miss out on savings. With an intuitive interface, quick search, and regularly updated listings, AmazonAura simplifies bargain hunting for shoppers",
      image: "/realestate-placeholder.jpg",
      tags: ["Next.js", "GraphQL", "MongoDB", "Mapbox", "AWS S3"],
      demoLink: "#projects",
    },
  ];

  return (
    <section
      id="projects"
      className="py-24 relative bg-gradient-to-b from-slate-900 to-slate-950"
    >
      <div className="container mx-auto px-4">
        {/* Header with animated underline */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Projects
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto mb-6 animate-pulse"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Explore my recent work that demonstrates my expertise in building
            modern, responsive, and feature-rich applications with the MERN
            stack.
          </p>
        </div>

        {/* Project showcase with staggered grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group rounded-xl overflow-hidden bg-slate-800 border border-slate-700 shadow-lg shadow-slate-900/30 hover:shadow-xl hover:shadow-blue-600/10 transition-all duration-300 hover:border-blue-500/30 transform hover:-translate-y-2 ${
                index % 2 === 0 ? "lg:translate-y-8" : ""
              }`}
            >
              {/* Project Image with overlay hover effect */}
              <div className="relative aspect-video overflow-hidden">
                {/* Gradient overlay */}

                {/* Image container */}
                <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 relative">
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 to-transparent"></div>

                  {/* Ensure the image takes the full width & height */}
                  <Image
                    width={500}
                    height={500}
                    src={project.image}
                    className="w-full h-full object-cover" // <- Ensures full coverage
                  />
                </div>
              </div>

              {/* Project Content with better typography and spacing */}
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 group-hover:from-blue-300 group-hover:to-purple-500 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Technology tags with improved design */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-slate-900/80 backdrop-blur-sm rounded-full text-xs font-medium text-blue-300 border border-blue-500/10 hover:border-blue-500/30 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={project.demoLink}
                  className="bg-white px-8 py-3 border border-gray-700 rounded-full text-black font-medium hover:bg-white/5 transition-colors flex items-center  text-center mb-3"
                >
                  Visit website
                  <ExternalLink size={18} className="ml-2 opacity-70" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// File: /components/Contact.js

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Get In Touch</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-600 mx-auto"></div>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            Have a project in mind or want to discuss potential opportunities?
            I'd love to hear from you!
          </p>
        </div>

        <div className="max-w-4xl mx-auto gap-8">
          {/* Contact Info */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                Contact Information
              </h3>
              <p className="text-gray-300">
                Feel free to reach out through any of the following methods. I'm
                always open to discussing new projects, opportunities, and
                ideas.
              </p>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1 w-8 h-8 flex-shrink-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div>
                <h4 className="font-medium">Email</h4>
                <a
                  href="mailto:danieeltu@gmail.com"
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  danieelatu@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="mt-1 w-8 h-8 flex-shrink-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div>
                <h4 className="font-medium">Location</h4>
                <p className="text-gray-300">Sapele, Nigeria</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-3 mt-6">
            <div className="bg-slate-800 rounded-lg p-6 relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-20 blur-sm"></div>
              <div className="relative">
                <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                  Reach out
                </h3>
                <a
                  href="mailto:danieeltu@gmail.com?subject=Hello&body=Hi, I’d like to talk about..."
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-medium hover:opacity-90 transition-opacity flex items-center justify-center"
                >
                  Send Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// File: /components/Footer.js
function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-slate-900 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a
              href="#home"
              className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
            >
              Daniel Atu
            </a>
          </div>

          <div className="text-gray-400 text-sm">
            &copy; {currentYear} Your Name. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
