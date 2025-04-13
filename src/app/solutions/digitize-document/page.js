import Image from "next/image";
import TestimonialSection from "../../ui/TestimonialSection";
import PricingSection from "../../ui/Pricing";
import Footer from "../../ui/Footer";

// FAQ data
const faqs = [
  {
    question: "Can I convert handwritten notes to Word?",
    answer:
      "Yes! Copywrite lets you convert handwritten notes to Word, PDF, and 18 other formats. Our AI handwriting transcription technology preserves all formatting while creating editable documents.",
  },
  {
    question: "Does Copywrite support colored handwriting?",
    answer:
      "Absolutely! Unlike Google OCR not working with colors properly, Copywrite fully supports color-preserving handwriting OCR, maintaining the original colors in your handwritten notes.",
  },
  {
    question: "Can I transcribe math notes or tables?",
    answer:
      "Yes! Copywrite excels at converting table images to Excel and handling complex formats. Our OCR tool for handwritten notes recognizes equations, tables, and complex layouts.",
  },
  {
    question: "Is there a free plan?",
    answer:
      "Yes! Our free handwriting OCR app plan includes 50 pages per month. It's the perfect way to try our handwriting to document conversion capabilities before upgrading.",
  },
  {
    question: "Is it better than Google Docs OCR?",
    answer:
      "Significantly better. While Google Docs can't recognize handwriting effectively, Copywrite was built specifically for handwriting to text conversion with format preservation.",
  },
  {
    question: "How does the document management system work?",
    answer:
      "Copywrite includes a complete cloud-based note converter system. Your converted documents are saved to your account in folders you create—just like a file explorer—accessible from anywhere.",
  },
  {
    question: "Can Copywrite handle messy handwriting?",
    answer:
      "Yes! Our OCR for messy handwriting uses advanced AI that recognizes even difficult penmanship. Whether you have neat handwriting or doctor-style notes, our handwriting recognition online system delivers impressive results.",
  },
  {
    question:
      "How is Copywrite different from Pen to Print and other competitors?",
    answer:
      "While other handwriting to text online tools focus only on conversion, Copywrite provides a complete document management system for handwritten notes with MS Word-like editing capabilities, Excel functionality, cloud storage, and format preservation that competitors can't match.",
  },
  {
    question: "Can I convert PDF handwriting to Word?",
    answer:
      "Absolutely! Our PDF handwriting to Word converter extracts handwritten text from PDF documents and converts it to fully editable Word format with formatting intact. Simply upload your PDF with handwriting and let our AI document creator work its magic.",
  },
  {
    question: "Does Copywrite work for notebook scans?",
    answer:
      "Yes! Our notebook scanner to Word functionality works perfectly for spiral notebooks, composition books, and loose notes. The notebook to text tool handles ruled lines, margins, and even spiral binding marks without affecting conversion quality.",
  },
  {
    question: "How accurate is Copywrite's handwriting recognition?",
    answer:
      "Our handwriting recognition online system achieves 98% accuracy with clean handwriting and 90%+ even with challenging penmanship. Our AI notes scanner continuously improves through machine learning, making it the best handwriting OCR tool available.",
  },
  {
    question: "Can I use Copywrite for engineering or technical notes?",
    answer:
      "Definitely! Our OCR for engineering notes handles specialized symbols, diagrams, and technical notation. The handwriting transcription tool maintains relationships between text and diagrams, making it perfect for technical documentation.",
  },
  {
    question: "How does Copywrite compare to Microsoft Word OCR?",
    answer:
      "While Microsoft Word OCR primarily focuses on printed text, Copywrite specializes in handwriting to docx conversion. Our solution preserves colors, tables, and layouts that MS Word OCR typically loses, making Copywrite the superior alternative to MS Word online for handwritten content.",
  },
  {
    question: "Can I organize my converted documents in Copywrite?",
    answer:
      "Yes! Our document management system for handwritten notes includes a handwriting cloud storage solution with folders, tags, and search capabilities. Think of it as a dedicated file manager for your handwritten content that's accessible from anywhere.",
  },
  {
    question: "Is Copywrite's Word editor similar to Microsoft Word?",
    answer:
      "Yes! Our online word editor is designed to feel just like MS Word online. The familiar interface means there's virtually no learning curve—you'll find all the text formatting, paragraph styling, and document structure tools right where you expect them to be.",
  },
  {
    question:
      "Can I use Copywrite instead of Excel for data from handwritten tables?",
    answer:
      "Absolutely! Our handwriting table to Excel conversion creates fully functional spreadsheets. The Excel scanner handwriting feature preserves formulas, cell formatting, and data relationships, giving you an online spreadsheet editor that works just like Excel but with the added power of handwriting recognition.",
  },
  {
    question:
      "Does Copywrite allow document collaboration like Word and Excel?",
    answer:
      "Yes! Like MS Word online free collaboration tools, Copywrite lets multiple users work on documents simultaneously. This makes it perfect for team projects where some members work digitally while others contribute handwritten content.",
  },
  {
    question: "Can I import existing Word and Excel files into Copywrite?",
    answer:
      "Definitely! Copywrite isn't just a handwriting capture app—it's a complete document management system. Import your existing .docx and .xlsx files to organize them alongside your converted handwritten documents in a unified cloud storage system.",
  },
  {
    question:
      "How does file organization in Copywrite compare to Word and Excel?",
    answer:
      "Copywrite offers a more comprehensive document management system than Microsoft's solutions. Our digital document folder app lets you create custom folder structures, apply tags, and use powerful search features that work across both your typed and handwritten-then-converted content.",
  },
  {
    question: "Can I edit Excel-like spreadsheets directly in Copywrite?",
    answer:
      "Yes! After using our handwriting to spreadsheet conversion, you can edit the resulting document in our Excel-like editor. Add formulas, sort data, create charts, and perform all the spreadsheet functions you're used to—all within the Copywrite platform.",
  },
];

// Comparison table data
const comparisonData = [
  {
    feature: "Handwriting Recognition",
    copywrite: "Advanced AI handwriting transcription with 98% accuracy",
    googleDocs: "Limited recognition through third-party add-ons",
  },
  {
    feature: "Format Preservation",
    copywrite: "Maintains tables, colors, layout in converted documents",
    googleDocs: "Loses formatting during OCR process",
  },
  {
    feature: "Editor Interface",
    copywrite: "Familiar MS Word-style editor for converted documents",
    googleDocs: "Google Docs interface, requires reformatting",
  },
  {
    feature: "Table Recognition",
    copywrite: "Converts handwritten tables to editable format",
    googleDocs: "No table structure recognition",
  },
  {
    feature: "Color Support",
    copywrite: "Preserves colored handwriting in digital format",
    googleDocs: "No color preservation in OCR conversions",
  },
  {
    feature: "Document Management",
    copywrite: "Built-in folder system for organizing converted documents",
    googleDocs: "Google Drive folder system, but no direct OCR integration",
  },
  {
    feature: "Export Options",
    copywrite: "20+ export formats including DOCX, PDF, XLSX",
    googleDocs: "Limited export options",
  },
  {
    feature: "Offline Access",
    copywrite: "Save local copies in any format",
    googleDocs: "Requires internet connection (except with offline mode)",
  },
];

export const metadata = {
  title:
    " Why Copywrite is Better Than Google Docs for Handwriting Conversion | Best Handwriting OCR Tool",
  description:
    "Discover why Copywrite outperforms Google Docs for document management. Preserve formatting, colors, and tables while converting handwritten notes to digital documents.",
  imageUrl: "/images/copywrite-image002.png",

  url: "https://copywritee.com/solutions/digitalize-document",
  keywords:
    "handwriting to text, handwriting to word, convert handwriting to text, Google Docs OCR handwriting, handwritten notes to word, handwriting recognition online, OCR handwriting, document management, cloud storage, online editor, save document online",
  alternates: {
    canonical: "https://copywritee.com/solutions/digitalize-document",
  },
};

const CopywriteLandingPage = () => {
  return (
    <>
      <main>
        {/* Hero Section */}
        <header className="bg-gradient-to-r from-[#015979] to-[#1b9e99] text-white py-20 px-4 sm:px-6 lg:px-5 border-black">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
              Handwriting to Digital Perfection: Why Copywrite Leaves Google
              Docs Behind
            </h1>

            <p className="text-lg mb-8">
              Convert handwritten notes to fully formatted, editable
              documents—preserving tables, colors, and structure. Say goodbye to
              the OCR vs Copywrite debate. No more copy-paste madness.
            </p>
            <a
              href="https://app.copywritee.com/"
              className="inline-block bg-white text-[#015979] py-3 px-6 rounded-full font-semibold hover:bg-indigo-100 transition duration-300"
            >
              Try Free – Convert Your First Page Now
            </a>
          </div>
        </header>
        <section className="text-center py-1 md:py-2">
          <div>
            <Image
              src="/images/copywrite-image002.png"
              width={1200}
              height={600}
              alt="Handwriting to document conversion with Copywrite"
              className="rounded-lg shadow-lg mx-auto"
            />
          </div>
        </section>

        {/* Introduction to Copywrite Platform */}
        <section className="py-16 px-6 md:px-12">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Document Creation Reimagined for Handwritten Content
            </h2>
            <p className="text-lg mb-10 text-gray-700">
              Copywrite combines everything you love about Google Docs—intuitive
              interface, cloud storage, collaborative editing—but adds powerful
              handwriting recognition technology that Google simply can't match.
              It's the document platform designed for people who still think and
              create with pen and paper.
            </p>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-4">
                  The Familiar Features You Already Know
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span>Cloud-based document storage and organization</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span>
                      Familiar word processor and spreadsheet interfaces
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span>Multiple export formats (20+ options available)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2 mt-1">✓</span>
                    <span>Document organization with folders and search</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-semibold mb-4">
                  Plus Handwriting Superpowers
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">★</span>
                    <span>
                      AI-powered handwriting recognition with 98% accuracy
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">★</span>
                    <span>
                      Preserves handwritten tables, colors, and layouts
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">★</span>
                    <span>
                      Direct conversion from handwritten notes to Excel
                      spreadsheets
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2 mt-1">★</span>
                    <span>
                      Smart formatting detection for handwritten documents
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="py-16 bg-gray-50 rounded-xl my-16 px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
            Why Google Docs Can't Handle Your Handwriting
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Not Built for Images
              </h3>
              <p className="text-gray-600">
                Google Docs isn't built for image-based handwriting. It's
                primarily a text editor that struggles with OCR handwriting
                tasks. When you need to convert handwritten image to editable
                text, Google OCR limitations become immediately apparent.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Add-ons Fall Short
              </h3>
              <p className="text-gray-600">
                Third-party OCR add-ons for Google Docs are inaccurate and don't
                preserve formatting. Why settle for an online handwriting
                document creator that loses your tables and colors? The Google
                Docs handwriting conversion process is frustratingly limited.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Manual Reformatting
              </h3>
              <p className="text-gray-600">
                With Google OCR not working properly, users often need to
                reformat from scratch after conversion. Converting handwritten
                notes to doc format shouldn't require additional hours of
                editing to fix formatting issues.
              </p>
            </div>
          </div>
        </section>

        {/* Meet Copywrite */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Meet Copywrite: Your Handwriting-to-Document Powerhouse
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The ultimate alternative to MS Word online free tools and Google
              Docs OCR handwriting solutions.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                AI-Powered Recognition
              </h3>
              <p className="text-gray-600">
                Our smart OCR tool uses advanced AI handwriting transcription
                technology to accurately convert your handwritten notes to
                digital text, even with messy handwriting.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Preserves Everything
              </h3>
              <p className="text-gray-600">
                Unlike basic handwriting to text online converters, Copywrite
                maintains tables, colors, layout, and structure—making it the
                best format-preserving OCR on the market.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Word-Style Editor
              </h3>
              <p className="text-gray-600">
                Edit your converted documents in our familiar online text editor
                handwriting interface—virtually identical to MS Word. No
                learning curve required.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Excel Spreadsheet Conversion
              </h3>
              <p className="text-gray-600">
                Specialized handwriting table to Excel capabilities allow you to
                convert table image to Excel with perfect formatting. Perfect
                for financial notes and data tables.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Cloud Organization
              </h3>
              <p className="text-gray-600">
                Our document management system for handwritten notes includes a
                cloud-based file system. Create folders, organize documents, and
                access from anywhere.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition duration-300">
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Multi-Format Export
              </h3>
              <p className="text-gray-600">
                Export to over 20 formats including PDF, DOCX, XLSX and more.
                Perfect flexibility for your handwriting to PDF converter needs.
              </p>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 bg-gray-50 rounded-xl my-16 px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
            Copywrite vs Google Docs
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-[#015979] text-white">
                <tr>
                  <th className="py-4 px-6 text-left">Feature</th>
                  <th className="py-4 px-6 text-left">Copywrite</th>
                  <th className="py-4 px-6 text-left">Google Docs</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {comparisonData.map((item, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="py-4 px-6 font-medium">{item.feature}</td>
                    <td className="py-4 px-6 text-green-600">
                      {item.copywrite}
                    </td>
                    <td className="py-4 px-6 text-red-500">
                      {item.googleDocs}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Real Use Cases */}
        <section className="py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
            Who Benefits from Copywrite
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="mr-2">📚</span> Students
              </h3>
              <p className="text-gray-600">
                Convert class notes to digital text quickly with our student
                notes digitizer. Transform pages of lecture notes into
                searchable Word documents that maintain your highlighting and
                formatting.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="mr-2">💼</span> Professionals
              </h3>
              <p className="text-gray-600">
                Digitize client records and meeting notes efficiently. Our
                document scanner for handwriting preserves your tables, charts,
                and critical business data with perfect OCR word formatting.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="mr-2">🔬</span> Researchers
              </h3>
              <p className="text-gray-600">
                Keep annotated research notes to word with all formatting
                intact. Our OCR for research notes preserves your diagrams,
                equations, and margin comments for proper digital archiving.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="mr-2">✍️</span> Writers
              </h3>
              <p className="text-gray-600">
                Maintain the creative flow by converting notebook to text
                without losing your formatting or structure. Copywrite is the
                perfect text scanner for notes that preserves your writing
                style.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="mr-2">👩‍🏫</span> Teachers
              </h3>
              <p className="text-gray-600">
                Archive graded papers with our OCR tool for teachers. Convert
                handwritten homework to digital format while preserving your
                annotations, feedback, and grading marks.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="mr-2">⚕️</span> Medical Professionals
              </h3>
              <p className="text-gray-600">
                Digitize patient notes with our specialized OCR for medical
                handwriting. Convert handwritten records to secure, searchable
                documents while maintaining strict formatting requirements.
              </p>
            </div>
          </div>
        </section>

        {/* Visual Demo */}
        <section className="py-16 bg-gray-50 rounded-xl my-16 px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
            How Copywrite Transforms Your Handwriting
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-[#015979] text-white p-4 rounded-full h-32 w-32 flex items-center justify-center mx-auto shadow-md mb-6">
                <span className="text-4xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload</h3>
              <p className="text-gray-600">
                Snap a photo or upload your handwritten notes to our handwriting
                scanner
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#015979] text-white p-4 rounded-full h-32 w-32 flex items-center justify-center mx-auto shadow-md mb-6">
                <span className="text-4xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Process</h3>
              <p className="text-gray-600">
                Our AI document creator analyzes and converts your handwriting
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#015979] text-white p-4 rounded-full h-32 w-32 flex items-center justify-center mx-auto shadow-md mb-6">
                <span className="text-4xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Edit</h3>
              <p className="text-gray-600">
                Open in our MS Word-like editor or Excel interface
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#015979] text-white p-4 rounded-full h-32 w-32 flex items-center justify-center mx-auto shadow-md mb-6">
                <span className="text-4xl">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Save & Export</h3>
              <p className="text-gray-600">
                Save to your cloud folders or export in 20+ formats
              </p>
            </div>
          </div>
          <div className="mt-16 text-center">
            <Image
              src="/images/text-word.png"
              width={1000}
              height={500}
              alt="Copywrite workflow demonstration"
              className="rounded-lg shadow-lg mx-auto"
            />
          </div>
        </section>

        {/* Testimonials */}
        <TestimonialSection />

        {/* Why Google Docs Falls Short */}
        <section className="py-16 bg-gray-50 rounded-xl my-16 px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
            Why Google Docs Falls Short
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-lg mr-4">
                  ✗
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Built for Typed Text Only
                  </h3>
                  <p className="text-gray-600">
                    Google Docs is designed for typed content, not handwriting
                    to text conversion. It lacks native OCR for scanned notes.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-lg mr-4">
                  ✗
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Requires External Add-ons
                  </h3>
                  <p className="text-gray-600">
                    Google Docs needs third-party tools for OCR handwriting
                    tasks, creating a fragmented workflow.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-lg mr-4">
                  ✗
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    No Layout Recognition
                  </h3>
                  <p className="text-gray-600">
                    Google Docs can't recognize handwriting with
                    structure—tables, diagrams, and multi-column layouts are
                    lost.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-lg mr-4">
                  ✗
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Not a Document Management Tool
                  </h3>
                  <p className="text-gray-600">
                    Google Docs lacks an integrated handwriting cloud storage
                    system specifically designed for organizing converted
                    handwritten documents.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition duration-300"
              >
                <h3 className="text-xl font-semibold mb-3 text-gray-800">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <PricingSection />

        {/* Closing CTA */}
        <section className="py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Handwritten Notes?
          </h2>
          <p className="text-gray-600 mb-5 px-10">
            Stop fighting with other OCR not working properly. Start converting
            handwritten notes the smart way—with Copywrite, the best handwriting
            OCR tool available.
          </p>
          <button className="bg-[#015979] text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg transition duration-300">
            <a href="https://app.copywritee.com/login">
              Try Free Now – Convert Your First Page
            </a>
          </button>
          <p className="mt-4 text-gray-500">
            No credit card required. 50 free pages per month.
          </p>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default CopywriteLandingPage;
