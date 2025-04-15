import React from "react";
import {
  Table,
  Edit3,
  FileSpreadsheet,
  Upload,
  CheckCircle,
  Award,
  Download,
  Clock,
  FileText,
  UploadIcon,
} from "lucide-react";

export const metadata = {
  title: "Convert Handwritten Tables to Excel Documents – Try For Free",
  description:
    "Convert your handwritten tables into fully editable and searchable Excel spreadsheets. Easily transform scanned notes into structured, online spreadsheets you can update anytime.",
  imageUrl: "/images/to-excel-bg.png",

  url: "https://copywritee.com/solutions/notes-to-excel",
  keywords:
    "image to excel, edit spreadsheet online, excel to pdf, image to table, handwriting to spreadsheet, image to text",
  alternates: {
    canonical: "https://copywritee.com/solutions/notes-to-excel",
  },
};

export default function NoteToExcel() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="w-full md:w-1/2 space-y-6">
              <span className="px-4 py-2 bg-blue-100 text-[#1b9e99] rounded-full text-sm font-medium inline-flex items-center">
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Table Digitization Solution
              </span>
              <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold text-gray-900 leading-tight">
                Easily Edit Your Handwritten Table Data Online
              </h1>
              <p className="text-lg md:text-xl text-gray-700">
                Transform handwritten tables into editable digital spreadsheets
                instantly with our smart AI-powered conversion technology.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://app.copywritee.com/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#1b9e99] hover:bg-[#137e7a] text-white font-medium rounded-lg transition duration-300 flex items-center"
                >
                  Try for free <Edit3 className="w-5 h-5 ml-2" />
                </a>
                <a
                  href="https://app.copywritee.com/upload-image"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0f605d] px-6 py-3 border border-gray-300 hover:border-gray-400 bg-white font-medium rounded-lg transition duration-300 flex items-center"
                >
                  Upload
                  <UploadIcon className="w-5 h-5 ml-2" />
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/2 mt-8 md:mt-0">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#1b9e99] to-indigo-600 rounded-2xl blur opacity-30"></div>
                <div className="relative rounded-xl shadow-lg">
                  <img
                    src="/images/to-excel.jpeg"
                    alt="Handwritten table to digital conversion"
                    className="rounded-lg w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 md:px-8 lg:px-16 xl:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Convert Handwritten Tables in 3 Simple Steps
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Our streamlined process makes digitizing your handwritten table
              data effortless and accurate
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Upload className="w-8 h-8 text-[#1b9e99]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Snap & Upload
              </h3>
              <p className="text-gray-700">
                Take a photo of your handwritten table or upload an existing
                image. Our system accepts various image formats for maximum
                convenience.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Table className="w-8 h-8 text-[#1b9e99]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Automatic Processing
              </h3>
              <p className="text-gray-700">
                Our advanced AI analyzes your handwritten table, recognizing
                rows, columns, and data entries with high accuracy and
                precision.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
              <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <Edit3 className="w-8 h-8 text-[#1b9e99]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Edit & Export
              </h3>
              <p className="text-gray-700">
                Fine-tune your digitized table in our Excel-like editor, then
                export to 20+ formats or save directly to your Copywrite cloud
                folders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 md:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Advanced Table Editing Features
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Copywrite delivers powerful tools specifically designed for
              handwritten table data conversion and editing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-lg mr-4">
                <CheckCircle className="w-6 h-6 text-[#1b9e99]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  Accurate Table Recognition
                </h3>
                <p className="text-gray-700">
                  Our AI precisely identifies table structures, cell boundaries,
                  and data points, even from messy handwriting or complex
                  layouts.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-lg mr-4">
                <FileSpreadsheet className="w-6 h-6 text-[#1b9e99]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  Excel-Like Interface
                </h3>
                <p className="text-gray-700">
                  Edit your converted tables in our familiar spreadsheet editor
                  with formula support, cell formatting, and data manipulation
                  tools.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-lg mr-4">
                <Download className="w-6 h-6 text-[#1b9e99]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  Multi-Format Export
                </h3>
                <p className="text-gray-700">
                  Export your digitized tables to over 20 formats including
                  Excel, CSV, PDF, and HTML to seamlessly integrate with your
                  workflow.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-100 p-2 rounded-lg mr-4">
                <Clock className="w-6 h-6 text-[#1b9e99]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  Cloud Auto-Save
                </h3>
                <p className="text-gray-700">
                  Your converted table data is automatically saved to your
                  Copywrite account folders, accessible anytime from any device.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 md:px-8 lg:px-16 xl:px-24 bg-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#1b9e99] to-indigo-600 rounded-2xl blur opacity-20"></div>
                <div className="relative">
                  <img
                    src="/images/text-excel.png"
                    alt="Handwritten table editing workflow"
                    className="rounded-xl shadow-lg w-full"
                  />
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Copywrite for Handwritten Table Data?
              </h2>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-white p-2 rounded-lg mr-4 shadow">
                    <Award className="w-6 h-6 text-[#1b9e99]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1 text-gray-900">
                      Time-Saving Efficiency
                    </h3>
                    <p className="text-gray-700">
                      Convert hours of manual data entry into minutes of simple
                      verification, saving up to 90% of your time on table
                      digitization.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-white p-2 rounded-lg mr-4 shadow">
                    <CheckCircle className="w-6 h-6 text-[#1b9e99]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1 text-gray-900">
                      Superior Accuracy
                    </h3>
                    <p className="text-gray-700">
                      Our AI recognition technology achieves up to 98% accuracy
                      on most handwritten tables, reducing errors and review
                      time.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-white p-2 rounded-lg mr-4 shadow">
                    <FileText className="w-6 h-6 text-[#1b9e99]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1 text-gray-900">
                      Seamless Format Preservation
                    </h3>
                    <p className="text-gray-700">
                      Copywrite maintains your original table structure,
                      formatting, and even color coding when converting to
                      digital format.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 px-4 md:px-8 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Perfect for Any Table Digitization Need
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              See how professionals across industries use Copywrite to
              streamline their handwritten data workflows
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow hover:shadow-md transition duration-300">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Academic Research
              </h3>
              <p className="text-gray-700 mb-4">
                Convert handwritten research data tables, lab results, and field
                notes into editable spreadsheets for analysis and collaboration.
              </p>
              <span className="text-[#1b9e99] font-medium">Learn more →</span>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow hover:shadow-md transition duration-300">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Business & Finance
              </h3>
              <p className="text-gray-700 mb-4">
                Digitize handwritten financial statements, inventory lists, and
                sales data for faster reporting and decision-making.
              </p>
              <span className="text-[#1b9e99] font-medium">Learn more →</span>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow hover:shadow-md transition duration-300">
              <h3 className="text-xl font-semibold mb-3 text-gray-900">
                Healthcare Management
              </h3>
              <p className="text-gray-700 mb-4">
                Transform handwritten patient data charts, medical inventories,
                and scheduling tables into digital records.
              </p>
              <span className="text-[#1b9e99] font-medium">Learn more →</span>
            </div>
          </div>
        </div>
      </section>

      {/* SEO-Rich Content Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 xl:px-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="prose lg:prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Everything You Need to Know About Handwritten Table Digitization
            </h2>

            <p className="text-lg text-gray-700">
              Converting handwritten table data to digital format has
              traditionally been a tedious, error-prone process. Whether you're
              working with research data, financial records, inventory lists, or
              academic tables, manually transferring information from paper to
              digital spreadsheets consumes valuable time and introduces
              opportunities for mistakes.
            </p>

            <p className="text-lg text-gray-700">
              Copywrite's handwritten table recognition technology changes
              everything. Our intelligent system analyzes your handwritten
              tables—detecting rows, columns, cell boundaries, and individual
              data points—then converts them into perfectly formatted digital
              spreadsheets ready for immediate editing and analysis.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Advanced Table Recognition Technology
            </h3>

            <p className="text-lg text-gray-700">
              Unlike basic OCR tools that struggle with tabular data,
              Copywrite's specialized table digitization engine understands the
              structural elements that make up tables. Our system recognizes
              grid patterns, cell divisions, headers, and data relationships,
              ensuring your converted tables maintain their original
              organization and meaning.
            </p>

            <p className="text-lg text-gray-700">
              The technology works across various handwriting styles, table
              formats, and paper qualities. Whether your handwritten tables
              include merged cells, multiple headers, or complex numerical data,
              our system accurately preserves these elements in the digital
              version.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Excel-Like Editing Environment
            </h3>

            <p className="text-lg text-gray-700">
              After conversion, Copywrite presents your digitized table in an
              intuitive spreadsheet editor modeled after Microsoft Excel. This
              familiar interface requires no learning curve—you can immediately
              sort data, apply formulas, adjust formatting, and manipulate cells
              just as you would in Excel.
            </p>

            <p className="text-lg text-gray-700">
              The editor supports all standard spreadsheet functions including
              mathematical operations, data sorting, conditional formatting, and
              cell merging. For data analysts and researchers, this means you
              can begin working with your digitized data immediately without
              needing to transfer it to another platform.
            </p>

            <h3 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Streamlined Document Management
            </h3>

            <p className="text-lg text-gray-700">
              Copywrite's cloud-based document management system automatically
              saves your digitized tables to your personal account. Create
              custom folders to organize different projects, departments, or
              subjects, and access your converted tables from any device with
              internet connection.
            </p>

            <p className="text-lg text-gray-700">
              This integration eliminates the typical workflow fragmentation
              where users must juggle between scanning apps, OCR tools, and
              spreadsheet software. With Copywrite, the entire process from
              capture to editing to storage happens within a single, cohesive
              platform.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 xl:px-24 bg-gradient-to-r from-[#1b9e99] to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Handwritten Tables?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of professionals who save hours every week with
            Copywrite's handwritten table digitization technology.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://app.copywritee.com/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white text-[#1b9e99] font-medium rounded-lg transition duration-300 hover:bg-gray-100 text-lg"
            >
              Start Free Trial
            </a>
            <a
              href="https://app.copywritee.com/upload-image"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-medium rounded-lg transition duration-300 hover:bg-white hover:bg-opacity-10 text-lg"
            >
              Upload handwritten table
            </a>
          </div>
          <p className="mt-6 text-blue-100">
            No credit card required • Free 50 pages monthly
          </p>
        </div>
      </section>

      {/* SEO Footer with Keywords */}
      <footer className="py-8 px-4 md:px-8 lg:px-16 xl:px-24 bg-gray-50 text-gray-600 text-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">
                Handwritten Table Solutions
              </h4>
              <ul className="space-y-2">
                <li>Handwritten table converter</li>
                <li>Table image to Excel</li>
                <li>Manual table digitization</li>
                <li>Table OCR software</li>
                <li>Handwritten data extraction</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Online Table Editing</h4>
              <ul className="space-y-2">
                <li>Web-based spreadsheet editor</li>
                <li>Online Excel alternative</li>
                <li>Cloud table editor</li>
                <li>Collaborative spreadsheet</li>
                <li>Table formatting online</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Data Conversion Features</h4>
              <ul className="space-y-2">
                <li>Handwriting recognition technology</li>
                <li>Table structure detection</li>
                <li>Data formatting preservation</li>
                <li>Multi-format export options</li>
                <li>Automated table processing</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Applications & Use Cases</h4>
              <ul className="space-y-2">
                <li>Research data digitization</li>
                <li>Academic table conversion</li>
                <li>Financial data entry automation</li>
                <li>Laboratory results digitization</li>
                <li>Inventory management digitization</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
