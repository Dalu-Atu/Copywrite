"use client";
import React from "react";
import HeaderComponent from "../../ui/HeaderComponent";
import TestimonialSection from "../../ui/TestimonialSection";
import Footer from "../../ui/Footer";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Clock,
  FileText,
  Users,
  Table,
  List,
  Type,
  Pencil,
  Cpu,
  ArrowUpRight,
  Scan,
  Edit,
  Check,
  Bold,
  FileSpreadsheet,
  BarChart3,
  BookOpen,
  Briefcase,
  FlaskConical,
  ChevronDown,
  MessageCircle,
  StarIcon,
  User,
  FileCheck,
  PhoneCall,
  MailIcon,
  ArrowDownRight,
} from "lucide-react";

const AdditionalSections = () => {
  const [openFaq, setOpenFaq] = React.useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  const faqs = [
    {
      question: "How to convert word to pdf?",
      answer:
        "Our platform can easily convert your word document into pdf document or any other document type by importing your word document into our platform, open the word document, click file on the editor and export to pdf or any file format of your choice, including word to html, word to csv, word to pdf, photo to word etc",
    },
    {
      question: "How accurately does copywrite converts  tables and diagrams?",
      answer:
        "Our advanced AI OCR technology preserves complex tables and diagrams with 97% accuracy. The system recognizes table structures, cell relationships, and diagram elements, converting them directly into editable Word tables and shapes while maintaining their visual appearance and data relationships.",
    },
    {
      question:
        "What if my handwriting is difficult to read? can it convert cursive to text",
      answer:
        "Our system is trained on millions of handwriting samples, including challenging cursive styles. It achieves 95% accuracy with difficult handwriting and improves over time. For extremely challenging scripts, our optional human review service can ensure 99.9% accuracy for critical documents.",
    },
    {
      question:
        "Can your system handle mathematical equations and special symbols?",
      answer:
        "Yes! Our solution excels at converting handwritten mathematical notations, Greek symbols, scientific notation, and specialty characters. The converted equations remain fully editable in Word using the native equation editor or MathType compatibility.",
    },
    {
      question:
        "Which file formats are supported for output beyond Word documents?",
      answer:
        "While we specialize in conversion to Word (.docx) for maximum editability and also Excel , we also support exporting to PDF, Google Docs, plain text (.txt), rich text (.rtf), HTML, and even LaTeX for scientific documents - all while preserving the formatting elements from your handwritten notes.",
    },
    {
      question: "How do I fix mistakes in the converted document?",
      answer:
        "Our built-in editor allows you to make immediate corrections after conversion. For any text the system flags as uncertain, you'll see highlighting with suggested alternatives. Most users report spending 90% less time editing compared to manual transcription.",
    },
  ];

  return (
    <>
      {/* FAQ Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Get answers about converting handwritten notes to Word documents
              with perfect formatting preservation.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-medium text-lg text-gray-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform ${
                      openFaq === index ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === index ? "max-h-96 p-4 pt-0" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          {/* <div className="max-w-3xl mx-auto mt-8 bg-indigo-50 p-4 rounded-lg flex items-start border border-indigo-100">
            <MessageCircle className="h-6 w-6 text-[#015979] mr-3 flex-shrink-0 mt-1" />
            <p className="text-indigo-700 text-sm">
              Still have questions about converting your handwritten notes to
              Word? Our formatting specialists are available to help with your
              specific document needs.{" "}
              <a href="#contact" className="font-medium underline">
                Contact us
              </a>{" "}
              for personalized assistance.
            </p>
          </div> */}
        </div>
      </div>

      {/* Customer Success Stories */}
      <TestimonialSection />

      {/* Call to Action & Support */}
      <div className="py-16 bg-gradient-to-br from-[#015979] to-[#1b9e99]  text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Experience Perfect Formatting Preservation
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Try our handwritten notes to Word conversion and see the
              formatting quality for yourself.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                className="px-8 py-4 bg-white text-[#1b9e99]  font-medium rounded-lg transition-colors duration-200 hover:bg-gray-100"
                onClick={() => router.push("/")}
              >
                Try for free
              </button>
            </div>
            <p className="mt-4 text-sm opacity-80">
              No credit card required. Includes 50 free conversions with full
              formatting preservation.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

const HandwrittenNotesConversionPage = () => {
  const router = useRouter();
  return (
    <>
      <HeaderComponent />
      <div className="w-full bg-white">
        {/* Hero Section */}
        <div className="w-full bg-gradient-to-br from-blue-50 to-indigo-100 py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Text Content */}
              <div className="space-y-6">
                <span className="inline-block px-3 py-1 text-sm font-medium bg-[#60aca9] text-[#fff] rounded-full">
                  Digital Transformation
                </span>

                <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 leading-tight">
                  Convert Handwritten Notes to Word Documents
                </h1>

                <p className="text-lg text-gray-700">
                  Transform your handwritten notes into editable, searchable
                  documents in minutes. Convert your handwritten notes into word
                  documents and allow you to edit document online
                </p>

                <div className="pt-4">
                  <p className="font-medium text-gray-900">
                    On this page, you'll learn:
                  </p>
                  <ul className="mt-3 space-y-2">
                    {[
                      "How our conversion technology works",
                      "Best practices for optimal results",
                      "Integration with your existing workflow",
                      "Converting word to pdf",
                      "Edit document online",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-[#1b9e99] mt-0.5 mr-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <button
                    className="px-6 py-3 bg-[#1b9e99] hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200"
                    onClick={() =>
                      router.push("https://app.copywritee.com/upload-image")
                    }
                  >
                    Try for free
                  </button>
                  <button
                    className="ml-4 px-6 py-3 bg-white hover:bg-gray-100 text-[#015979] font-medium rounded-lg border border-gray-200 transition-colors duration-200"
                    onClick={() =>
                      router.push("https://app.copywritee.com/signup")
                    }
                  >
                    Sign up Free
                  </button>
                </div>
              </div>

              {/* Right Column - Benefits Cards */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Why Converting Handwritten Notes Matters
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Time Savings Card */}
                  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <Clock className="h-8 w-8 text-[#015979] mb-3" />
                    <h3 className="text-lg font-semibold mb-2">
                      Save 20+ Hours Weekly
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Our users report saving an average of 5.2 hours per day by
                      eliminating manual retyping and converting image to text
                    </p>
                  </div>

                  {/* Professional Benefits Card */}
                  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                    <FileText className="h-8 w-8 text-[#015979] mb-3" />
                    <h3 className="text-lg font-semibold mb-2">
                      Professional Results
                    </h3>
                    <p className="text-gray-600 text-sm">
                      93% of professionals report more polished deliverables and
                      better knowledge retention.
                    </p>
                  </div>

                  {/* Accessibility Card */}
                  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 md:col-span-2">
                    <Users className="h-8 w-8 text-[#015979] mb-3" />
                    <h3 className="text-lg font-semibold mb-2">
                      Improved Accessibility
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Make your notes searchable, shareable, and accessible
                      across all your devices and team members. access your
                      document from the cloud
                    </p>
                  </div>
                </div>

                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                  <p className="text-sm text-[#15928e] font-medium">
                    "Converting my handwritten notes has transformed my
                    productivity. What used to take hours now happens in
                    minutes."
                  </p>
                  <p className="text-xs text-[#015979] mt-2">
                    — Sarah T., Product Manager
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Formatting Challenges Section */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Common Formatting Challenges When Converting Handwritten Notes
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Converting handwritten notes to Word documents presents unique
                challenges that standard OCR technology struggles to overcome.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <Table className="h-10 w-10 text-[#015979] mb-4" />
                <h3 className="text-xl font-semibold mb-3">
                  Tables and Diagrams
                </h3>
                <p className="text-gray-600">
                  Preserving the structure of handwritten tables, diagrams, and
                  charts is essential for maintaining data relationships and
                  visual information.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <List className="h-10 w-10 text-[#015979] mb-4" />
                <h3 className="text-xl font-semibold mb-3">
                  Bullet Points and Lists
                </h3>
                <p className="text-gray-600">
                  Converting handwritten bullet points and numbered lists while
                  maintaining hierarchy and formatting requires specialized
                  recognition.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <Type className="h-10 w-10 text-[#015979] mb-4" />
                <h3 className="text-xl font-semibold mb-3">
                  Special Characters
                </h3>
                <p className="text-gray-600">
                  Mathematical notations, symbols, and special characters in
                  handwritten notes need precise recognition for accurate
                  digital conversion.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <Pencil className="h-10 w-10 text-[#015979] mb-4" />
                <h3 className="text-xl font-semibold mb-3">
                  Handwriting Variations
                </h3>
                <p className="text-gray-600">
                  Different handwriting styles, cursive scripts, and personal
                  shorthand create unique challenges for conversion accuracy.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Solution Section */}
        <div className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Solution for Preserving Formatting
              </h2>
              <p className="text-lg text-gray-600">
                Our advanced technology ensures your handwritten notes convert
                to Word documents with formatting integrity intact.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                    <Cpu className="h-6 w-6 text-[#015979]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Advanced OCR & AI Capabilities
                    </h3>
                    <p className="text-gray-600">
                      Our proprietary technology combines state-of-the-art
                      Optical Character Recognition with machine learning
                      algorithms specifically trained on handwritten content,
                      achieving 98.7% accuracy even with challenging handwriting
                      styles.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                    <ArrowUpRight className="h-6 w-6 text-[#015979]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Format Preservation Technology
                    </h3>
                    <p className="text-gray-600">
                      Unlike standard converters, our solution maintains the
                      structural integrity of your handwritten notes—including
                      tables, lists, and mathematical formulas—when converting
                      image to word
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg border border-blue-100">
                <h3 className="text-2xl font-bold mb-6 text-[#1b9e99] tracking-tight">
                  Transform Your Documents
                </h3>

                <div className="grid md:grid-cols-2 gap-3 relative">
                  {/* Before Card */}
                  <div className="bg-white p-6 rounded-xl shadow-md transition-all hover:shadow-xl">
                    <div className="flex items-center mb-4">
                      <div className="w-3 h-3 bg-[#1b9e99]  rounded-full mr-2"></div>
                      <p className="font-medium text-gray-700">
                        Handwritten Notes
                      </p>
                    </div>

                    <div className="h-64 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                      <Image
                        src="/images/manual-transcription.webp"
                        alt="Handwritten meeting notes"
                        width={500}
                        height={500}
                        className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Arrow connector - hidden on mobile */}
                  <div className="hidden md:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="bg-[#1b9e99]  text-white p-3 rounded-full shadow-lg">
                      <ArrowDownRight className="h-8 w-8" />
                    </div>
                  </div>

                  {/* Arrow for mobile - shown only on small screens */}
                  <div className="flex justify-center md:hidden my-2">
                    <div className="bg-[#1b9e99]  text-white p-2 rounded-full shadow-md">
                      <ArrowDownRight className="h-6 w-6" />
                    </div>
                  </div>

                  {/* After Card */}
                  <div className="bg-white p-6 rounded-xl shadow-md transition-all hover:shadow-xl">
                    <div className="flex items-center mb-4">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      <p className="font-medium text-gray-700">
                        Digital Document
                      </p>
                    </div>

                    <div className="h-64 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                      <Image
                        src="/images/scan-text.jpeg"
                        alt="Converted Word document"
                        width={600}
                        height={600}
                        className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-center text-sm text-[#1b9e99]  font-medium">
                  Instant conversion with perfect formatting
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Conversion Process Section */}
        <div className="py-16 bg-gradient-to-br from-indigo-50 to-blue-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Step-by-Step Conversion Process
              </h2>
              <p className="text-lg text-gray-600">
                Converting your handwritten notes to perfectly formatted Word
                documents is simple with our four-step process.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm relative">
                <div className="absolute -top-2 -left-2 w-10 h-10 rounded-full bg-[#1b9e99]  text-white flex items-center justify-center font-bold">
                  1
                </div>
                <Pencil className="h-10 w-10 text-[#015979] mb-4" />
                <h3 className="text-xl font-semibold mb-3">
                  Prepare Your Notes
                </h3>
                <p className="text-gray-600">
                  Ensure your handwritten notes are clear and well-lit. Our
                  technology works with various paper types and writing
                  instruments.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm relative">
                <div className="absolute -top-2 -left-2 w-10 h-10 rounded-full bg-[#1b9e99]  text-white flex items-center justify-center font-bold">
                  2
                </div>
                <Scan className="h-10 w-10 text-[#015979] mb-4" />
                <h3 className="text-xl font-semibold mb-3">Scan or Upload</h3>
                <p className="text-gray-600">
                  Use our website to scan your notes or upload existing images
                  directly through our web interface.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm relative">
                <div className="absolute -top-2 -left-2 w-10 h-10 rounded-full bg-[#1b9e99]  text-white flex items-center justify-center font-bold">
                  3
                </div>
                <Cpu className="h-10 w-10 text-[#015979] mb-4" />
                <h3 className="text-xl font-semibold mb-3">
                  Conversion Technology
                </h3>
                <p className="text-gray-600">
                  Our AI-powered conversion engine analyzes your handwriting and
                  preserves formatting elements while converting to editable
                  text.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm relative">
                <div className="absolute -top-2 -left-2  w-10 h-10 rounded-full bg-[#1b9e99]  text-white flex items-center justify-center font-bold">
                  4
                </div>
                <Edit className="h-10 w-10 text-[#015979] mb-4" />
                <h3 className="text-xl font-semibold mb-3">
                  Edit and Finalize
                </h3>
                <p className="text-gray-600">
                  Review your converted Word document, make any desired
                  adjustments, and export to your preferred format.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Supported Formatting Elements */}
        <div className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Supported Formatting Elements
              </h2>
              <p className="text-lg text-gray-600">
                Our solution preserves a wide range of formatting elements when
                converting handwritten notes to Word documents.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <Bold className="h-6 w-6 text-[#015979] mr-3" />
                  <h3 className="text-xl font-semibold">Text Styles</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Bold, italic, and underlined text",
                    "Multiple font sizes and headings",
                    "Color variations and highlights",
                    "Paragraph spacing and alignment",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <FileText className="h-6 w-6 text-[#015979] mr-3" />
                  <h3 className="text-xl font-semibold">Document Structure</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Headers and footers",
                    "Page numbers and sections",
                    "Margins and indentation",
                    "Multiple columns and layouts",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <FileSpreadsheet className="h-6 w-6 text-[#015979] mr-3" />
                  <h3 className="text-xl font-semibold">Special Elements</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Tables with merged cells",
                    "Charts and simple drawings",
                    "Mathematical equations and formulas",
                    "Arrows and connectors",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <Type className="h-6 w-6 text-[#015979] mr-3" />
                  <h3 className="text-xl font-semibold">Font and Spacing</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Font style matching",
                    "Character and line spacing",
                    "List formatting and indentation",
                    "Paragraph and section breaks",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases Section */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Who Benefits from Converting Handwritten Notes to Word
              </h2>
              <p className="text-lg text-gray-600">
                Our solution helps various professionals transform their
                handwritten ideas into polished digital documents.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <BookOpen className="h-12 w-12 text-[#015979] mb-4" />
                <h3 className="text-xl font-semibold mb-3">Students</h3>
                <ul className="space-y-3">
                  {[
                    "Convert cursive to text",
                    "photo to word document",
                    "Convert lecture notes to study guides",
                    "Transform handwritten essays to digital documents",
                    "Create searchable study materials",
                    "Share notes with classmates easily",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <ArrowRight className="h-4 w-4 text-[#015979] mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <Briefcase className="h-12 w-12 text-[#015979] mb-4" />
                <h3 className="text-xl font-semibold mb-3">Professionals</h3>
                <ul className="space-y-3">
                  {[
                    "Convert meeting notes for team sharing",
                    "Edit document online",
                    "Convert word to pdf",
                    "Convert brainstorming sessions to action plans",
                    "Transform client notes to formal documentation",
                    "Archive important handwritten records",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <ArrowRight className="h-4 w-4 text-[#015979] mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <FlaskConical className="h-12 w-12 text-[#015979] mb-4" />
                <h3 className="text-xl font-semibold mb-3">Researchers</h3>
                <ul className="space-y-3">
                  {[
                    "Digitize field notes with diagrams intact",
                    "Convert research annotations to searchable text",
                    "Transform handwritten formulas to editable equations",
                    "Create shareable reference materials",
                    "Store Documents in the cloud for easy access",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <ArrowRight className="h-4 w-4 text-[#015979] mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-12 text-center">
              <button
                className="px-8 py-4 bg-[#015979] hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200 text-lg"
                onClick={() => router.push("/")}
              >
                Start Converting Your Notes Today
              </button>
              <p className="mt-4 text-gray-500">
                No credit card required. Start with 50 free conversions.
              </p>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
};

const NotesToWord = () => {
  return (
    <>
      <HandwrittenNotesConversionPage />
      <AdditionalSections />
    </>
  );
};

export default NotesToWord;
