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
import BlogSection from "./BlogSection";

const messages = [
  "Upload your paper, convert it to text, and get a professional document ready for download or editing",
  "Experience AI-powered handwriting-to-text conversion with unmatched precision and speed.",
  "From messy notes to polished documents, our tool makes it effortless.",
];

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
            <i>Start Your 2-Day Free Trial When You Sgnup</i>
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
              src="/images/handwritting-to-text.png"
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
        <p
          style={{
            textAlign: "center",
            color: "gray",
            marginTop: "1rem",
            position: "relative",
            top: "1rem",
            fontSize: "large",
            marginLeft: "20px",
            marginRight: "20px",
          }}
        >
          {" "}
          ❤️ Loved by +5000 working professionals!
        </p>
        <FeaturesSection />
        <HowItWorksSection />
        <section>
          <ConversionSectionWord />
          <ConversionSectionExcel />
        </section>
        <TestimonialSection />
        <PricingSection />
        <FAQSection />
        <BlogSection />
        <Footer />
      </main>
    </>
  );
};

export default HomePage;

// // pages/life-too-short-for-typing.js
// import { useState, useEffect, useRef } from "react";
// import Head from "next/head";
// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import HeaderComponent from "./HeaderComponent";
// import {
//   ChevronRight,
//   Check,
//   Clock,
//   Users,
//   Star,
//   PlayCircle,
//   FileText,
//   Pen,
//   Search,
//   Layers,
//   TrendingUp,
//   Globe,
//   Award,
//   Brain,
//   Target,
//   Database,
// } from "lucide-react";

// import CountUp from "react-countup";
// import { useRouter } from "next/navigation";

// const keywordRichSections = [
//   {
//     title: "The Handwriting Recognition Revolution",
//     content: [
//       "In the digital age, handwritten documents remain a critical yet underutilized form of information. Traditional OCR (Optical Character Recognition) technologies have long struggled with the nuanced complexities of human handwriting.",
//       "Copywrite represents a quantum leap in handwriting-to-text conversion. By leveraging advanced machine learning algorithms, we've created a solution that doesn't just transcribe text—it understands context, preserves formatting, and maintains the original document's integrity.",
//     ],
//     keywords: [
//       "handwriting recognition",
//       "OCR technology",
//       "handwriting to text conversion",
//       "machine learning transcription",
//     ],
//   },
//   {
//     title: "Why Handwriting Digitization Matters",
//     content: [
//       "Every professional generates vast amounts of handwritten content: meeting notes, brainstorming sessions, client interactions, research observations. Until now, converting these insights into searchable, shareable digital formats has been a time-consuming nightmare.",
//       "Copywrite transforms this process. Our handwriting-to-text AI analyzes stroke patterns, understands contextual nuances, and converts handwritten documents with unprecedented 98% accuracy.",
//     ],
//     keywords: [
//       "handwriting digitization",
//       "professional document conversion",
//       "AI handwriting analysis",
//       "document digitization technology",
//     ],
//   },
// ];

// import {
//   BarChart,
//   Legend,
//   Bar,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   Cell,
//   Pie,
//   LineChart,
//   Line,
// } from "recharts";
// import PricingSection from "./Pricing";
// import TestimonialSection from "./TestimonialSection";

// // Comprehensive Data Sets
// const industryAdoptionData = [
//   { industry: "Healthcare", adoption: 78, color: "#3B82F6" },
//   { industry: "Legal Services", adoption: 65, color: "#10B981" },
//   { industry: "Education", adoption: 62, color: "#8B5CF6" },
//   { industry: "Research", adoption: 55, color: "#F43F5E" },
//   { industry: "Business Consulting", adoption: 50, color: "#F59E0B" },
// ];

// const timeProductivityData = [
//   { month: "Jan", hours: 42, productivity: 65 },
//   { month: "Feb", hours: 38, productivity: 72 },
//   { month: "Mar", hours: 35, productivity: 78 },
//   { month: "Apr", hours: 32, productivity: 85 },
//   { month: "May", hours: 28, productivity: 90 },
//   { month: "Jun", hours: 25, productivity: 95 },
// ];

// const aiAccuracyComparison = [
//   { method: "Manual Typing", accuracy: 65 },
//   { method: "Traditional OCR", accuracy: 82 },
//   { method: "Copywrite AI", accuracy: 98 },
// ];

// const economicImpactData = [
//   {
//     category: "Time Saved",
//     value: 240,
//     description: "Annual hours saved per professional",
//   },
//   {
//     category: "Productivity Gain",
//     value: 35,
//     description: "Percentage increase in work efficiency",
//   },
//   {
//     category: "Cost Reduction",
//     value: 15000,
//     description: "Estimated annual savings per team",
//   },
// ];

// function ComprehensiveInsightsSection() {
//   const [activeChart, setActiveChart] = useState("industryAdoption");

//   return (
//     <section className="py-6 bg-gray-50">
//       <div className="container mx-auto px-4">
//         {/* Section Header */}
//         <div className="text-center max-w-4xl mx-auto mb-16">
//           <span className="inline-block px-4 py-2 bg-blue-100 text-[#015979] rounded-full text-sm font-semibold mb-4">
//             DEEP DIVE: TRANSFORMATIVE INSIGHTS
//           </span>
//           <h2 className="text-4xl font-bold mb-6">
//             The Quantitative Revolution in Document Digitization
//           </h2>
//           <p className="text-xl text-gray-600">
//             Unraveling the complex landscape of AI-powered handwriting
//             recognition and its profound impact across industries
//           </p>
//         </div>

//         {/* Multi-Dimensional Data Visualization Grid */}
//         <div className="grid md:grid-cols-2 gap-12">
//           {/* Industry Adoption Chart */}
//           <div className="bg-white rounded-xl shadow-lg p-8">
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-2xl font-bold text-[#015979]">
//                 Industry Digital Transformation Rates
//               </h3>
//               <Globe className="h-8 w-8 text-[#015979] " />
//             </div>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={industryAdoptionData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="industry" />
//                 <YAxis
//                   label={{
//                     value: "Adoption %",
//                     angle: -90,
//                     position: "insideLeft",
//                   }}
//                 />
//                 <Tooltip />
//                 <Bar dataKey="adoption" barSize={30}>
//                   {industryAdoptionData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={entry.color} />
//                   ))}
//                 </Bar>
//               </BarChart>
//             </ResponsiveContainer>
//             <p className="text-gray-600 mt-4 text-center">
//               Percentage of professionals adopting digital document conversion
//               technologies
//             </p>
//           </div>

//           {/* Productivity Impact Timeline */}
//           <div className="bg-white rounded-xl shadow-lg p-8">
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-2xl font-bold text-[#015979]">
//                 Productivity Transformation Timeline
//               </h3>
//               <TrendingUp className="h-8 w-8 text-[#015979] " />
//             </div>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={timeProductivityData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="month" />
//                 <YAxis
//                   yAxisId="left"
//                   label={{
//                     value: "Hours Saved",
//                     angle: -90,
//                     position: "insideLeft",
//                   }}
//                 />
//                 <YAxis
//                   yAxisId="right"
//                   orientation="right"
//                   label={{
//                     value: "Productivity %",
//                     angle: 90,
//                     position: "insideRight",
//                   }}
//                 />
//                 <Tooltip />
//                 <Legend />
//                 <Line
//                   yAxisId="left"
//                   type="monotone"
//                   dataKey="hours"
//                   stroke="#3B82F6"
//                   strokeWidth={2}
//                 />
//                 <Line
//                   yAxisId="right"
//                   type="monotone"
//                   dataKey="productivity"
//                   stroke="#10B981"
//                   strokeWidth={2}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//             <p className="text-gray-600 mt-4 text-center">
//               Monthly progression of time saved and productivity improvement
//             </p>
//           </div>
//         </div>

//         {/* Detailed Insights and Comparative Analysis */}
//         <div className="mt-16 grid md:grid-cols-3 gap-8">
//           {/* AI Accuracy Comparison */}
//           <div className="bg-white rounded-xl shadow-lg p-8">
//             <div className="flex items-center mb-6">
//               <Award className="h-8 w-8 mr-4 text-[#015979]" />
//               <h3 className="text-2xl font-bold text-[#015979]">
//                 Accuracy Benchmark
//               </h3>
//             </div>
//             <ResponsiveContainer width="100%" height={250}>
//               <BarChart data={aiAccuracyComparison}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="method" />
//                 <YAxis
//                   label={{
//                     value: "Accuracy %",
//                     angle: -90,
//                     position: "insideLeft",
//                   }}
//                 />
//                 <Tooltip />
//                 <Bar dataKey="accuracy" fill="#8B5CF6" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Economic Impact Highlights */}
//           <div className="bg-white rounded-xl shadow-lg p-8">
//             <div className="flex items-center mb-6">
//               <Brain className="h-8 w-8 mr-4 text-[#015979] " />
//               <h3 className="text-2xl font-bold text-[#015979]">
//                 Economic Transformation
//               </h3>
//             </div>
//             <div className="space-y-4">
//               {economicImpactData.map((item, index) => (
//                 <div key={index} className="bg-gray-50 p-4 rounded-lg">
//                   <div className="flex justify-between items-center">
//                     <span className="font-semibold text-[#015979]">
//                       {item.category}
//                     </span>
//                     <span className="text-2xl font-bold text-[#015979] ">
//                       {item.value.toLocaleString()}
//                       {item.category === "Cost Reduction" ? "$" : "%"}
//                     </span>
//                   </div>
//                   <p className="text-gray-600 mt-2">{item.description}</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Future Projection */}
//           <div className="bg-white rounded-xl shadow-lg p-8">
//             <div className="flex items-center mb-6">
//               <Target className="h-8 w-8 mr-4 text-[#015979] " />
//               <h3 className="text-2xl font-bold text-[#015979]">
//                 Future Outlook
//               </h3>
//             </div>
//             <div className="space-y-4">
//               <div className="bg-[#e2fff4] p-4 rounded-lg">
//                 <h4 className="font-semibold text-[#015979] mb-2">
//                   Market Growth Projection
//                 </h4>
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600">
//                     AI Document Conversion Market
//                   </span>
//                   <span className="text-2xl font-bold text-[#6ee7b7]">45%</span>
//                 </div>
//                 <p className="text-sm text-gray-500 mt-2">
//                   Estimated CAGR by 2028
//                 </p>
//               </div>
//               <div className="bg-green-50 p-4 rounded-lg">
//                 <h4 className="font-semibold text-green-800 mb-2">
//                   Technology Advancement
//                 </h4>
//                 <div className="flex justify-between items-center">
//                   <span className="text-gray-600">AI Accuracy Improvement</span>
//                   <span className="text-2xl font-bold text-green-600">
//                     99.5%
//                   </span>
//                 </div>
//                 <p className="text-sm text-gray-500 mt-2">
//                   Projected Accuracy by 2026
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// const technicalFeatures = [
//   {
//     icon: Pen,
//     title: "Multi-Style Handwriting Recognition",
//     description:
//       "Handles diverse handwriting styles, from neat cursive to quick scribbles.",
//   },
//   {
//     icon: FileText,
//     title: "Comprehensive Document Preservation",
//     description:
//       "Maintains original formatting, including tables, diagrams, and annotations.",
//   },
//   {
//     icon: Search,
//     title: "Advanced Text Extraction",
//     description:
//       "Intelligent text recognition across multiple languages and writing styles.",
//   },
//   {
//     icon: Layers,
//     title: "Contextual Understanding",
//     description:
//       "AI that comprehends document context beyond simple character recognition.",
//   },
//   {
//     icon: Database,
//     title: "Seamless Digital Integration",
//     description:
//       "Export to multiple formats: Word, PDF, Google Docs, and more.",
//   },
// ];

// const Button = ({ children, handleCLick }) => (
//   <button
//     onClick={handleCLick}
//     style={{
//       border: "2p solid black",
//       backgroundColor: "#34d399",
//       padding: "15px 20px",
//       borderRadius: "10px",
//       display: "flex",
//     }}
//   >
//     {children}
//   </button>
// );

// const structuredData = {
//   "@context": "https://schema.org",
//   "@type": "SoftwareApplication",
//   name: "Copywrite",
//   applicationCategory: "BusinessApplication",
//   operatingSystem: "Web",
//   offers: {
//     "@type": "Offer",
//     price: "0",
//     priceCurrency: "USD",
//   },
//   aggregateRating: {
//     "@type": "AggregateRating",
//     ratingValue: "4.8",
//     ratingCount: "1024",
//   },
// };

// export default function LifeTooShortForTyping() {
//   const router = useRouter();
//   const [activeTab, setActiveTab] = useState("professionals");
//   const [isPlaying, setIsPlaying] = useState(false);
//   const videoRef = useRef(null);

//   const [heroRef, heroInView] = useState({
//     triggerOnce: true,
//     threshold: 0.1,
//   });

//   const [statsRef, statsInView] = useState({
//     triggerOnce: true,
//     threshold: 0.1,
//   });

//   const handlePlayVideo = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause();
//       } else {
//         videoRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   const fadeInUp = {
//     hidden: { opacity: 0, y: 60 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
//   };

//   const staggerContainer = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   return (
//     <>
//       <Head>
//         <title>
//           Life's Too Short for Typing | Convert images to text | 98% say they
//           never type again
//         </title>
//         <meta
//           name="description"
//           content="Convert scanned images, handwritten notes, and photos to editable text online with our powerful OCR converter. Extract text from images quickly and accurately."
//         />

//         <meta
//           name="keywords"
//           content="handwriting to text, handwriting recognition, OCR, document digitization, digital notes, handwritten notes conversion, image to text, convert handwriting to text, convert image to text"
//         />
//         <meta
//           property="og:title"
//           content="    Life's Too Short for Typing | Convert images to text | 98% say they
//           never type again"
//         />
//         <meta
//           property="og:description"
//           content="Transform your handwritten notes into perfectly formatted digital documents in seconds, not hours."
//         />
//         <meta property="og:type" content="website" />
//         <meta property="og:image" content="/images/copywrite-og-image.jpg" />
//         <meta name="twitter:card" content="summary_large_image" />
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
//         />
//       </Head>
//       <HeaderComponent />
//       {/* Hero Section */}
//       <section className="relative bg-gradient-to-r from-[#1b9e99] to-[#015979] text-white overflow-hidden">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute inset-0 bg-[url('/pattern-bg.svg')] bg-repeat"></div>
//         </div>
//         <div className="container mx-auto px-4 py-16 md:py-24 relative">
//           <motion.div
//             ref={heroRef}
//             initial="hidden"
//             animate={heroInView ? "visible" : "hidden"}
//             variants={staggerContainer}
//             className="grid md:grid-cols-2 gap-12 items-center"
//           >
//             <div className="max-w-2xl">
//               <motion.h1
//                 variants={fadeInUp}
//                 className="text-4xl md:text-5xl lg:text-5xl font-extrabold leading-tight mb-6"
//               >
//                 Life's Too Short for Typing
//               </motion.h1>
//               <motion.h2
//                 variants={fadeInUp}
//                 className="text-0xl md:text-1xl font-medium mb-6 text-blue-100"
//               >
//                 Easily extract text from an image using our advanced online OCR
//                 tool. Our CR converter quickly transforms pictures to text,
//                 whether it’s a photo to text conversion or extracting text from
//                 an image. Convert JPG to text in seconds and seamlessly copy
//                 text from scanned documents with our image-to-text technology.
//                 Experience hassle-free pic-to-text and image text-to-text
//                 conversion with high accuracy.
//               </motion.h2>

//               <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
//                 <Button
//                   handleCLick={() => router.push("https://app.copywritee.com/")}
//                   size="lg"
//                   className="bg-white text-indigo-700 hover:bg-[#e2fff4]"
//                 >
//                   Try Copywrite Free
//                   <ChevronRight />
//                 </Button>
//                 <Button
//                   handleCLick={() =>
//                     router.push("https://app.copywritee.com/upload-image")
//                   }
//                   size="lg"
//                   variant="outline"
//                   className="border-white text-white hover:bg-white hover:text-indigo-700"
//                 >
//                   Upload Image
//                 </Button>
//               </motion.div>
//             </div>

//             <motion.div
//               variants={fadeInUp}
//               className="relative rounded-xl overflow-hidden shadow-2xl"
//             >
//               <div className="aspect-w-16 aspect-h-9 bg-black bg-opacity-20">
//                 <video
//                   controls
//                   ref={videoRef}
//                   poster="images/solutions/image-to-text.png"
//                   className="w-full h-full object-cover"
//                 >
//                   <source src="image-text.webm" type="video/webm" />
//                 </video>
//                 {!isPlaying && (
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <Button
//                       handleCLick={handlePlayVideo}
//                       size="icon"
//                       className="rounded-full w-16 h-16 bg-white bg-opacity-90 text-indigo-700 hover:bg-white hover:scale-110 transition"
//                     >
//                       <PlayCircle className="h-8 w-8" />
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>

//         <div className="absolute bottom-0 left-0 w-full overflow-hidden">
//           <svg
//             className="relative block w-full h-20 md:h-24"
//             data-name="Layer 1"
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 1200 120"
//             preserveAspectRatio="none"
//           >
//             <path
//               d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
//               className="fill-gray-50"
//             ></path>
//           </svg>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-16 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <motion.div
//             ref={statsRef}
//             initial="hidden"
//             animate={statsInView ? "visible" : "hidden"}
//             variants={staggerContainer}
//             className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center"
//           >
//             <motion.div
//               variants={fadeInUp}
//               className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center"
//             >
//               <div className="bg-[#e2fff4] p-3 rounded-full mb-4">
//                 <Check className="h-8 w-8 text-[#6ee7b7]" />
//               </div>
//               <h3 className="text-3xl md:text-4xl font-bold text-[#015979] mb-2">
//                 {statsInView && <CountUp end={98} suffix="%" duration={2.5} />}
//               </h3>
//               <p className="text-sm md:text-base font-medium text-gray-600">
//                 Accuracy Rate
//               </p>
//             </motion.div>

//             <motion.div
//               variants={fadeInUp}
//               className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center"
//             >
//               <div className="bg-[#e2fff4] p-3 rounded-full mb-4">
//                 <Clock className="h-8 w-8 text-[#6ee7b7]" />
//               </div>
//               <h3 className="text-3xl md:text-4xl font-bold text-[#015979]  mb-2">
//                 {statsInView && <CountUp end={5} suffix="hr+" duration={2.5} />}
//               </h3>
//               <p className="text-sm md:text-base font-medium text-gray-600">
//                 Time Saved Weekly
//               </p>
//             </motion.div>

//             <motion.div
//               variants={fadeInUp}
//               className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center"
//             >
//               <div className="bg-[#e2fff4] p-3 rounded-full mb-4">
//                 <Users className="h-8 w-8 text-[#6ee7b7]" />
//               </div>
//               <h3 className="text-3xl md:text-4xl font-bold text-[#015979]  mb-2">
//                 {statsInView && <CountUp end={10} suffix="K+" duration={2.5} />}
//               </h3>
//               <p className="text-sm md:text-base font-medium text-gray-600">
//                 Professionals Using
//               </p>
//             </motion.div>

//             <motion.div
//               variants={fadeInUp}
//               className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center"
//             >
//               <div className="bg-[#e2fff4] p-3 rounded-full mb-4">
//                 <Star className="h-8 w-8 text-[#6ee7b7]" />
//               </div>
//               <h3 className="text-3xl md:text-4xl font-bold text-[#015979]  mb-2">
//                 {statsInView && (
//                   <CountUp end={4.8} decimals={1} suffix="/5" duration={2.5} />
//                 )}
//               </h3>
//               <p className="text-sm md:text-base font-medium text-gray-600">
//                 Average Rating
//               </p>
//             </motion.div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Main Content */}
//       <section className="py-16 bg-white">
//         <div className="container mx-auto px-4">
//           <div className="max-w-3xl mx-auto mb-16 text-center">
//             <span className="inline-block px-3 py-1 bg-blue-100 text-[#015979] rounded-full text-sm font-semibold mb-4">
//               REVOLUTIONARY OCR TECHNOLOGY
//             </span>
//             <h2 className="text-3xl md:text-4xl font-bold mb-6">
//               The Hidden Cost of Manual Transcription – Why You Need an OCR
//               Converter
//             </h2>
//             <p className="text-lg text-gray-600">
//               In today's fast-paced digital world, manually converting
//               handwritten notes to text wastes valuable time. With an advanced{" "}
//               <strong>online OCR</strong> solution, you can instantly extract{" "}
//               <strong>text from an image</strong>, transforming pictures to text
//               in seconds. Say goodbye to tedious transcription and embrace
//               AI-powered efficiency.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
//             <div className="order-2 md:order-1">
//               <h3 className="text-2xl font-bold mb-6">
//                 The Time Drain You Can't Afford
//               </h3>
//               <p className="text-lg mb-6">
//                 Whether it's meeting notes, scanned notes, handwritten notes,
//                 scribbled in a notebook, annotations on printed materials, or
//                 handwritten client forms, the conversion process is tedious,
//                 time-consuming, and frankly, outdated.
//               </p>

//               <div className="bg-gray-50 border-l-4 border-indigo-500 p-6 rounded-r-lg mb-8">
//                 <h4 className="text-xl font-semibold mb-4">
//                   The Average Professional Loses:
//                 </h4>
//                 <ul className="space-y-3">
//                   <li className="flex items-start">
//                     <span className="flex-shrink-0 h-6 w-6 bg-indigo-100 text-[#015979]  rounded-full flex items-center justify-center mr-3 mt-1">
//                       <Check className="h-4 w-4" />
//                     </span>
//                     <span>
//                       <span className="font-semibold">3-5 hours per week</span>{" "}
//                       typing up handwritten notes
//                     </span>
//                   </li>
//                   <li className="flex items-start">
//                     <span className="flex-shrink-0 h-6 w-6 bg-indigo-100 text-[#015979]  rounded-full flex items-center justify-center mr-3 mt-1">
//                       <Check className="h-4 w-4" />
//                     </span>
//                     <span>
//                       <span className="font-semibold">12-20 hours monthly</span>{" "}
//                       on manual transcription
//                     </span>
//                   </li>
//                   <li className="flex items-start">
//                     <span className="flex-shrink-0 h-6 w-6 bg-indigo-100 text-[#015979]  rounded-full flex items-center justify-center mr-3 mt-1">
//                       <Check className="h-4 w-4" />
//                     </span>
//                     <span>
//                       <span className="font-semibold">
//                         144-240 hours+ annually
//                       </span>{" "}
//                       – equivalent to 6 full work weeks per year
//                     </span>
//                   </li>
//                 </ul>
//               </div>

//               <p className="text-lg">
//                 Manually typing written text isn't just time-consuming, it
//                 increases the risk of errors, disrupts workflow efficiency, and
//                 diverts focus from more important tasks. With an advanced{" "}
//                 <strong>OCR converter</strong>, you can eliminate these
//                 bottlenecks by instantly extracting{" "}
//                 <strong>text from an image</strong> or converting{" "}
//                 <strong>pictures to text</strong> with precision and preserved
//                 formatting. Modern professionals need smarter solutions, not
//                 outdated methods.
//               </p>
//             </div>

//             <div className="">
//               <div className="relative rounded-xl overflow-hidden shadow-xl">
//                 <Image
//                   src="/images/manual-transcription.webp"
//                   alt="Professional struggling with manual transcription instead of using an OCR converter"
//                   width={600}
//                   height={500}
//                   className="w-full"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
//                   <div className="p-6 text-white">
//                     <p className="text-xl font-bold">
//                       Time wasted on manual transcription could be spent on:
//                     </p>
//                     <ul className="mt-2 space-y-1">
//                       <li className="flex items-center">
//                         <ChevronRight className="h-4 w-4 mr-2" /> Strategic
//                         planning
//                       </li>
//                       <li className="flex items-center">
//                         <ChevronRight className="h-4 w-4 mr-2" /> Client
//                         relationships
//                       </li>
//                       <li className="flex items-center">
//                         <ChevronRight className="h-4 w-4 mr-2" /> Professional
//                         development
//                       </li>
//                     </ul>
//                     <p className="mt-4 text-sm text-gray-200">
//                       Skip the hassle with an <strong>OCR converter</strong>.
//                       Instantly extract <strong>text from an image</strong> and
//                       transform <strong>pictures to text</strong> with ease.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div
//             className="max-w-3xl mx-auto mb-16 text-center"
//             id="how-it-works"
//           >
//             <span className="inline-block px-3 py-1 bg-blue-100 text-[#015979] rounded-full text-sm font-semibold mb-4">
//               THE SOLUTION
//             </span>
//             <h2 className="text-3xl md:text-4xl font-bold mb-6">
//               How Copywrite is Changing the Game
//             </h2>
//             <p className="text-lg text-gray-600">
//               Copywrite has emerged as the go-to solution for busy professionals
//               who understand the value of their time. This innovative platform
//               uses powerful OCR technology to converta hndwritten text into
//               perfectly formatted documents with remarkable accuracy and minimal
//               effort. Say goodbye to manual transcription and hello to seamless
//               image-to-text conversion.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 gap-8 mb-16">
//             <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105">
//               <div className="h-64 bg-gray-100 flex items-center justify-center">
//                 <Image
//                   src="/images/disorganized-note.webp"
//                   alt="Before: Handwritten document"
//                   width={500}
//                   height={300}
//                   className="max-h-full"
//                 />
//               </div>
//               <div className="p-6 bg-gradient-to-br from-gray-50 to-white">
//                 <h3 className="text-xl font-bold mb-2 text-gray-800">
//                   Before Copywrite
//                 </h3>
//                 <ul className="space-y-2">
//                   <li className="flex items-start text-gray-700">
//                     <span className="text-red-500 mr-2">✗</span>
//                     <span>Disorganized handwritten notes</span>
//                   </li>
//                   <li className="flex items-start text-gray-700">
//                     <span className="text-red-500 mr-2">✗</span>
//                     <span>Hours spent manually typing</span>
//                   </li>
//                   <li className="flex items-start text-gray-700">
//                     <span className="text-red-500 mr-2">✗</span>
//                     <span>Difficult to search or edit</span>
//                   </li>
//                   <li className="flex items-start text-gray-700">
//                     <span className="text-red-500 mr-2">✗</span>
//                     <span>Information silos between teams</span>
//                   </li>
//                   <li className="flex items-start text-gray-700">
//                     <span className="text-red-500 mr-2">✗</span>
//                     <span>Tables and diagrams lost in translation</span>
//                   </li>
//                 </ul>
//               </div>
//             </div>

//             <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all hover:scale-105">
//               <div className="h-64 bg-gray-100 flex items-center justify-center">
//                 <Image
//                   src="/images/dual.png"
//                   alt="After: Digitized document"
//                   width={500}
//                   height={300}
//                   className="max-h-full"
//                 />
//               </div>
//               <div className="p-6 bg-gradient-to-br from-[#e2fff4] to-white">
//                 <h3 className="text-xl font-bold mb-2 text-[#015979]">
//                   After Copywrite
//                 </h3>
//                 <ul className="space-y-2">
//                   <li className="flex items-start text-gray-700">
//                     <span className="text-green-500 mr-2">✓</span>
//                     <span>Perfectly formatted digital documents</span>
//                   </li>
//                   <li className="flex items-start text-gray-700">
//                     <span className="text-green-500 mr-2">✓</span>
//                     <span>Conversion in seconds, not hours</span>
//                   </li>
//                   <li className="flex items-start text-gray-700">
//                     <span className="text-green-500 mr-2">✓</span>
//                     <span>Fully searchable and editable text</span>
//                   </li>
//                   <li className="flex items-start text-gray-700">
//                     <span className="text-green-500 mr-2">✓</span>
//                     <span>Seamlessly shareable across teams</span>
//                   </li>
//                   <li className="flex items-start text-gray-700">
//                     <span className="text-green-500 mr-2">✓</span>
//                     <span>Tables and structure preserved</span>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>

//           <div className="max-w-4xl mx-auto">
//             <h3 className="text-2xl font-bold mb-6 text-center">
//               The Simple Workflow That's Saving Hours
//             </h3>

//             <div className="relative">
//               {/* Timeline line */}
//               <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-indigo-200"></div>

//               {/* Steps */}
//               <div className="grid grid-cols-1 gap-8 mb-12">
//                 {/* Step 1 */}
//                 <div className="relative">
//                   <div className="flex items-center justify-center">
//                     <div className="z-10 flex items-center justify-center w-12 h-12 bg-[#015979]  rounded-full text-white text-lg font-bold">
//                       1
//                     </div>
//                   </div>
//                   <div className="mt-4 md:mt-6">
//                     <div className="bg-gray-50 p-6 rounded-xl shadow-md mx-auto max-w-lg">
//                       <h4 className="text-xl font-bold mb-3 text-[#015979]">
//                         Capture
//                       </h4>
//                       <p className="mb-4">
//                         Take a photo of your handwritten document using your
//                         smartphone or upload an existing image. Copywrite
//                         supports any handwriting style and multiple languages.
//                       </p>
//                       <div className="rounded-lg overflow-hidden">
//                         <Image
//                           src="/images/point.jpeg"
//                           alt="Capturing handwritten document"
//                           width={400}
//                           height={200}
//                           className="w-full"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Step 2 */}
//                 <div className="relative">
//                   <div className="flex items-center justify-center">
//                     <div className="z-10 flex items-center justify-center w-12 h-12 bg-[#015979]  rounded-full text-white text-lg font-bold">
//                       2
//                     </div>
//                   </div>
//                   <div className="mt-4 md:mt-6">
//                     <div className="bg-gray-50 p-6 rounded-xl shadow-md mx-auto max-w-lg">
//                       <h4 className="text-xl font-bold mb-3 text-[#015979]">
//                         Convert
//                       </h4>
//                       <p className="mb-4">
//                         Copywrite's advanced AI algorithms instantly recognize
//                         and convert your handwriting with industry-leading 98%
//                         accuracy. Tables, formatting, and structures are
//                         preserved.
//                       </p>
//                       <div className="rounded-lg overflow-hidden">
//                         <Image
//                           src="/images/converting.png"
//                           alt="Converting process visualization"
//                           width={400}
//                           height={200}
//                           className="w-full"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Step 3 */}
//                 <div className="relative">
//                   <div className="flex items-center justify-center">
//                     <div className="z-10 flex items-center justify-center w-12 h-12 bg-[#015979]  rounded-full text-white text-lg font-bold">
//                       3
//                     </div>
//                   </div>
//                   <div className="mt-4 md:mt-6">
//                     <div className="bg-gray-50 p-6 rounded-xl shadow-md mx-auto max-w-lg">
//                       <h4 className="text-xl font-bold mb-3 text-[#015979]">
//                         Edit
//                       </h4>
//                       <p className="mb-4">
//                         Make any necessary adjustments in Copywrite's intuitive
//                         document editor. Perfect your document with professional
//                         formatting tools.
//                       </p>
//                       <div className="rounded-lg overflow-hidden">
//                         <Image
//                           src="/images/converted.png"
//                           alt="Editing document in Copywrite"
//                           width={400}
//                           height={200}
//                           className="w-full"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Step 4 */}
//                 <div className="relative">
//                   <div className="flex items-center justify-center">
//                     <div className="z-10 flex items-center justify-center w-12 h-12 bg-[#015979]  rounded-full text-white text-lg font-bold">
//                       4
//                     </div>
//                   </div>
//                   <div className="mt-4 md:mt-6">
//                     <div className="bg-gray-50 p-6 rounded-xl shadow-md mx-auto max-w-lg">
//                       <h4 className="text-xl font-bold mb-3 text-[#015979]">
//                         Export
//                       </h4>
//                       <p className="mb-4">
//                         Save your document as a Word file or continue working
//                         within Copywrite's ecosystem. Share instantly with
//                         colleagues or clients.
//                       </p>
//                       <div className="rounded-lg overflow-hidden">
//                         <Image
//                           src="/images/home.png"
//                           alt="Exporting document from Copywrite"
//                           width={400}
//                           height={200}
//                           className="w-full"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <ComprehensiveInsightsSection />
//       {/* Value Proposition Deep Dive */}

//       {/* Technical Features Breakdown */}
//       <section className="py-16 bg-white">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-12">
//             <h2 className="text-3xl font-bold mb-4">
//               Cutting-Edge Handwriting Recognition Technology
//             </h2>
//             <p className="text-xl text-gray-600 max-w-2xl mx-auto">
//               Discover how Copywrite's advanced AI transforms the way
//               professionals handle handwritten documents
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {technicalFeatures.map((feature, index) => (
//               <div
//                 key={index}
//                 className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
//               >
//                 <div className="mb-4 p-3 bg-indigo-100 rounded-full inline-block">
//                   <feature.icon className="h-8 w-8 text-[#015979] " />
//                 </div>
//                 <h3 className="text-xl font-bold mb-3 text-[#015979]">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-600">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//       {/* Pricing Section */}

//       <PricingSection />
//       {/* Testimonials Section */}
//       <TestimonialSection />
//       {/* CTA Section */}
//       <section className="py-24 bg-gradient-to-r from-[#015979]  to-[#6ee7b7] text-white">
//         <div className="container mx-auto px-4 text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 50 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             className="max-w-3xl mx-auto"
//           >
//             <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
//               Stop Wasting Time, Start Converting
//             </h2>
//             <p className="text-xl md:text-2xl mb-8 text-blue-100">
//               Join thousands of professionals who have reclaimed their
//               productivity with Copywrite.
//             </p>
//             <div className="flex justify-center space-x-4">
//               <Button
//                 handleCLick={() => router.push("https://app.copywritee.com/")}
//                 size="lg"
//                 className="bg-white text-indigo-700 hover:bg-[#e2fff4]"
//               >
//                 Try Copywrite Free
//               </Button>
//               <Button
//                 handleCLick={() =>
//                   router.push("https://app.copywritee.com/upload-image")
//                 }
//                 size="lg"
//                 variant="outline"
//                 className="border-white text-white hover:bg-white hover:text-indigo-700"
//               >
//                 Upload image
//               </Button>
//             </div>
//           </motion.div>
//         </div>
//       </section>
//       {/* Footer */}
//       <footer className="bg-gray-900 text-white py-16">
//         <div className="container mx-auto px-4">
//           <div className="grid md:grid-cols-4 gap-8">
//             <div>
//               <h3 className="text-xl font-bold mb-4">Copywrite</h3>
//               <p className="text-gray-400">
//                 Transform handwritten notes into digital documents with
//                 unprecedented accuracy and ease.
//               </p>
//             </div>
//             <div>
//               <h4 className="font-semibold mb-4">Product</h4>
//               <ul className="space-y-2">
//                 <li>
//                   <Link href="#" className="text-gray-400 hover:text-white">
//                     Features
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="text-gray-400 hover:text-white">
//                     Pricing
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="text-gray-400 hover:text-white">
//                     Use Cases
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold mb-4">Company</h4>
//               <ul className="space-y-2">
//                 <li>
//                   <Link href="#" className="text-gray-400 hover:text-white">
//                     About Us
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="text-gray-400 hover:text-white">
//                     Careers
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="text-gray-400 hover:text-white">
//                     Press
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="font-semibold mb-4">Support</h4>
//               <ul className="space-y-2">
//                 <li>
//                   <Link href="#" className="text-gray-400 hover:text-white">
//                     Help Center
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="text-gray-400 hover:text-white">
//                     Contact Us
//                   </Link>
//                 </li>
//                 <li>
//                   <Link href="#" className="text-gray-400 hover:text-white">
//                     Terms of Service
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="mt-12 pt-8 border-t border-gray-800 text-center">
//             <p className="text-gray-500">
//               © {new Date().getFullYear()} Copywrite. All rights reserved.
//             </p>
//           </div>
//         </div>
//       </footer>
//       {/* Professional Use Cases */}
//     </>
//   );
// }
