"use client";
import React, { useEffect, useState } from "react";
import HeaderComponent from "./HeaderComponent";
import FeaturesSection from "./FeatureSection";
import {
  ConversionSectionExcel,
  ConversionSectionWord,
} from "./ConversionSection";
import TestimonialSection from "./TestimonialSection";
import PricingSection from "./Pricing";
import Footer from "./Footer";
import FAQSection from "./Faq";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/navigation";
import HowItWorksSection from "./HowItWorks";
import SolutionSection from "./SolutionSection";

const messages = [
  "Upload your paper, convert it to text, and get a professional document ready for download or editing",
  "Experience AI-powered handwriting-to-text conversion with unmatched precision and speed.",
  "From messy notes to polished documents, our tool makes it effortless.",
];

// function HeroSection() {
//   const [isVisible, setIsVisible] = useState(false);
//   const [activeFeature, setActiveFeature] = useState(0);
//   const text =
//     "Transform your handwritten notes into editable digital text with our AI-powered technology. Save time and boost productivity without compromising accuracy.";

//   const features = [
//     "99.8% accuracy on even messy handwriting",
//     "Export to Word, PDF, Excel, and more",
//     "Preserves formatting and layout",
//     "Supports 30+ languages",
//   ];

//   useEffect(() => {
//     setIsVisible(true);
//     const interval = setInterval(() => {
//       setActiveFeature((prev) => (prev + 1) % features.length);
//     }, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="relative w-full overflow-hidden bg-gradient-to-b from-white to-blue-50">
//       {/* Animated background elements */}
//       <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
//         <div className="absolute top-24 left-8 w-64 h-64 bg-gradient-to-r from-cyan-200 to-blue-300 rounded-full opacity-20 blur-3xl animate-pulse"></div>
//         <div
//           className="absolute top-40 right-12 w-72 h-72 bg-gradient-to-r from-teal-200 to-emerald-300 rounded-full opacity-20 blur-3xl animate-pulse"
//           style={{ animationDelay: "1s" }}
//         ></div>
//         <div
//           className="absolute bottom-24 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-200 to-indigo-300 rounded-full opacity-10 blur-3xl animate-pulse"
//           style={{ animationDelay: "2s" }}
//         ></div>
//       </div>

//       {/* Content Container */}
//       <div
//         className={`relative z-10 max-w-7xl mx-auto px-4 pt-16 pb-12 sm:px-6 lg:px-8 transition-all duration-1000 ${
//           isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
//         }`}
//       >
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//           {/* Left column - Text content */}
//           <div className="text-left space-y-6">
//             <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-teal-500/10 to-cyan-500/10 backdrop-blur-sm border border-teal-500/30">
//               <p className="text-sm font-medium text-teal-700 flex items-center">
//                 <span className="bg-gradient-to-r from-teal-600 to-cyan-600 h-2 w-2 rounded-full mr-2"></span>
//                 AI-Powered Document Conversion
//               </p>
//             </div>

//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
//               Convert Handwriting into{" "}
//               <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
//                 Perfectly Formatted Documents
//               </span>
//             </h1>

//             <p className="text-lg md:text-xl text-gray-600 max-w-2xl">{text}</p>

//             {/* Feature ticker */}
//             <div className="h-12 overflow-hidden relative border-l-4 border-teal-500 pl-4">
//               {features.map((feature, index) => (
//                 <div
//                   key={index}
//                   className={`absolute transition-all duration-700 flex items-center ${
//                     index === activeFeature
//                       ? "opacity-100 translate-y-0"
//                       : "opacity-0 translate-y-8"
//                   }`}
//                 >
//                   <CheckCircle className="h-5 w-5 text-teal-500 mr-2" />
//                   <p className="text-gray-700">{feature}</p>
//                 </div>
//               ))}
//             </div>

//             {/* CTA buttons */}
//             <div className="flex flex-wrap gap-4 pt-4">
//               <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-medium shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/30 transition-all flex items-center group">
//                 Get Started Free
//                 <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
//               </button>

//               <button className="px-8 py-3 rounded-lg border-2 border-teal-600 text-teal-700 font-medium hover:bg-teal-50 transition-all flex items-center">
//                 Upload Image
//               </button>
//             </div>

//             {/* Social proof */}
//             <div className="pt-6">
//               <div className="flex items-center">
//                 <div className="flex -space-x-2">
//                   {[1, 2, 3, 4, 5].map((i) => (
//                     <div
//                       key={i}
//                       className={`h-8 w-8 rounded-full border-2 border-white bg-gradient-to-r from-blue-${
//                         i * 100
//                       } to-teal-${i * 100}`}
//                     ></div>
//                   ))}
//                 </div>
//                 <p className="ml-4 text-sm text-gray-600">
//                   <span className="font-semibold text-teal-700">5,000+</span>{" "}
//                   professionals trust our solution
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Right column - Image showcase */}
//           <div className="relative">
//             <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/10 border border-gray-200/50 bg-white">
//               {/* Decorative elements */}
//               <div className="absolute top-4 left-4 flex space-x-2">
//                 <div className="h-3 w-3 rounded-full bg-red-400"></div>
//                 <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
//                 <div className="h-3 w-3 rounded-full bg-green-400"></div>
//               </div>

//               <div className="pt-12">
//                 <div className="relative">
//                   <img
//                     src="/api/placeholder/800/450"
//                     alt="AI-powered handwriting to text conversion"
//                     className="w-full h-auto"
//                   />

//                   {/* Overlay gradient */}
//                   <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>

//                   {/* Animated conversion indicator */}
//                   <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//                     <div className="flex items-center justify-center h-16 w-16 rounded-full bg-white/80 backdrop-blur-sm shadow-lg">
//                       <ArrowRight className="h-8 w-8 text-teal-600 animate-pulse" />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Floating badges */}
//             <div className="absolute -top-6 -right-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg shadow-lg transform rotate-12">
//               <p className="font-bold">NEW: Excel Support</p>
//             </div>

//             <div className="absolute -bottom-4 -left-4 bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-200">
//               <p className="text-sm font-medium text-gray-800 flex items-center">
//                 <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
//                 30+ Languages Support
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Scroll indicator */}
//         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
//           <p className="text-sm text-gray-500 mb-2">Explore Features</p>
//           <ChevronDown className="h-6 w-6 text-gray-400" />
//         </div>
//       </div>
//     </section>
//   );
// }

const HomePage = () => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(80);
  const [pauseBeforeDelete, setPauseBeforeDelete] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleTyping = () => {
      const currentMessage = messages[loopIndex % messages.length];

      if (!isDeleting && !pauseBeforeDelete) {
        setText(currentMessage.substring(0, text.length + 1));
        if (text === currentMessage) {
          setPauseBeforeDelete(true);
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else if (isDeleting) {
        setText(currentMessage.substring(0, text.length - 1));
        if (text === "") {
          setIsDeleting(false);
          setLoopIndex(loopIndex + 1);
          setPauseBeforeDelete(false);
          setTypingSpeed(150);
        }
      }
    };

    const typingTimeout = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(typingTimeout);
  }, [text, isDeleting, pauseBeforeDelete, loopIndex, messages, typingSpeed]);

  return (
    <>
      <Head>
        <title>Copywrite | Convert Handwriting to Text instantly</title>
        <meta
          name="description"
          content="Easily convert handwriting into perfectly formatted text documents. Fast, accurate, and effortless conversion."
        />
        <meta
          name="keywords"
          content="handwriting to text, AI converter, digital handwriting, OCR software, handwritten notes to text, image to text, text recognition, handwriting recognition, document scanning, digital note taking, handwriting analysis, convert handwriting to digital text, ai handwriting reader, best handwriting converter, free handwriting to text, online handwriting recognition"
        />
        <meta name="author" content="Copywrite" />

        {/* Open Graph for social media */}
        <meta property="og:title" content="Convert handwriting to text" />
        <meta
          property="og:description"
          content="Convert your handwritten notes into formatted digital documents in seconds."
        />
        <meta property="og:image" content="/images/handwritting-to-text.png" />
        <meta property="og:url" content="https://copywritee.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Convert Handwriting to Text - AI Handwriting Converter"
        />
        <meta
          name="twitter:description"
          content="Effortlessly digitize handwritten notes using AI technology."
        />
        <meta name="twitter:image" content="/images/default.png" />
      </Head>

      <main>
        <div className="absolute top-[35%] left-[85%] w-[10vw] h-[10vw] z-[-1] bg-gradient-to-r from-[#56b4d3] to-[#62e389] blur-[40px] rounded-full md:top-[45%] md:left-[80%] md:w-[15vw] md:h-[15vw]"></div>
        <div className="absolute top-[35%] right-[85%] w-[10vw] h-[10vw] z-[-1] bg-gradient-to-r from-[#62e389] to-[#56b4d3] blur-[40px] rounded-full md:top-[45%] md:right-[80%] md:w-[15vw] md:h-[15vw]"></div>
        <HeaderComponent />
        <section id="home" className="text-center max-w-5xl mx-auto mt-12">
          <h1 className="text-2xl font-bold leading-snug text-[#00415a] sm:text-3xl md:text-4xl px-2">
            Convert Handwriting into Perfectly
            <span className="bg-gradient-to-r from-[#015979] via-[#1b9e99] to-[#39f8f2] bg-clip-text text-transparent font-bold">
              {" "}
              Formatted <br className="hidden sm:inline" /> Documents in Seconds
            </span>
          </h1>
          <p className="text-lg text-gray-600 w-4/5 mx-auto mt-2">{text}</p>
          <p
            style={{
              marginTop: "1rem",
              textAlign: "center",
              color: "#706900",
              fontSize: "large",
              marginLeft: "20px",
              marginRight: "20px",
            }}
          >
            {" "}
            <i>Signup and try out for Free</i>
          </p>
          <div className="flex justify-center gap-4 mt-6 mb-4">
            <button
              onClick={() => router.push("https://app.copywritee.com/signup")}
              className="border-2 border-[#1b9e99] text-[#1b9e99] rounded-md px-6 py-3 transition-all hover:bg-[#015979] hover:text-white"
            >
              Get Started
            </button>
            <button
              onClick={() =>
                router.push("https://app.copywritee.com/upload-image")
              }
              className="bg-[#1b9e99] text-white rounded-md px-6 py-3 transition-all hover:bg-[#015979]"
            >
              Upload Image
            </button>
          </div>

          <div className="relative inline-block w-[95%]">
            <Image
              src="/images/copywrite-image002-bg.png"
              alt="AI-powered handwriting to text conversion"
              title="AI-powered handwriting to text conversion"
              width={800}
              height={450}
              layout="responsive"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 h-1/5 bg-gradient-to-b from-transparent to-white"></div>
          </div>
        </section>
        {/* <p
          style={{
            textAlign: "center",
            color: "gray",
            marginTop: "0rem",
            position: "relative",
            top: "1rem",
            fontSize: "large",
            marginLeft: "20px",
            marginRight: "20px",
          }}
        >
          {" "}
          ❤️ Loved by +5000 working professionals!
        </p> */}
        <FeaturesSection />
        <HowItWorksSection />
        <section>
          <ConversionSectionWord />
          <ConversionSectionExcel />
        </section>
        <TestimonialSection />
        <PricingSection />
        <FAQSection />
        <SolutionSection />
        <Footer />
      </main>
    </>
  );
};

export default HomePage;
