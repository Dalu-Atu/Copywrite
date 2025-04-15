import {
  ArrowRight,
  Edit,
  Database,
  Cloud,
  FileText,
  Share2,
  FileSpreadsheet,
  Download,
  Maximize2,
  Layers,
} from "lucide-react";

const CopywriteFeatures = () => {
  const mainFeatures = [
    {
      icon: <FileText className="text-blue-600" size={28} />,
      title: "Complete Document Ecosystem",
      description:
        "Not just a converter—a full document management system that preserves formatting, handles tables, and offers MS Word-like editing in the cloud.",
    },
    {
      icon: <Edit className="text-green-600" size={28} />,
      title: "Familiar Editing Interface",
      description:
        "Edit your converted documents in our intuitive editor that feels just like MS Word—no learning curve required.",
    },
    {
      icon: <FileSpreadsheet className="text-amber-600" size={28} />,
      title: "Spreadsheet Support",
      description:
        "Handwritten tables? We convert them to perfectly formatted digital spreadsheets with our Excel-like interface.",
    },
  ];

  const features = [
    {
      icon: <Layers className="text-indigo-600" size={24} />,
      title: "High-Precision OCR & ICR",
      description:
        "99% accuracy when converting handwritten notes to perfectly formatted digital text.",
    },
    {
      icon: <Cloud className="text-sky-600" size={24} />,
      title: "Cloud Document Management",
      description:
        "Create folders, organize files, and access your documents from anywhere, anytime.",
    },
    {
      icon: <Download className="text-rose-600" size={24} />,
      title: "Export to 20+ Formats",
      description:
        "Save your documents in various formats including DOCX, PDF, XLSX, and many more.",
    },
    {
      icon: <Database className="text-purple-600" size={24} />,
      title: "Import Existing Documents",
      description:
        "Upload your Word files and edit them directly in Copywrite's familiar interface.",
    },
    {
      icon: <Share2 className="text-teal-600" size={24} />,
      title: "Seamless Collaboration",
      description:
        "Share documents with team members and collaborate in real-time.",
    },
    {
      icon: <Maximize2 className="text-orange-600" size={24} />,
      title: "Format Preservation",
      description:
        "We maintain your original formatting, including tables, colors, and layouts.",
    },
  ];

  return (
    <section
      id="features"
      className="py-20 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            More Than Just{" "}
            <span className="text-[#1b9e99]">Handwriting Recognition</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Copywrite transforms how you work with handwritten notes, creating a
            complete document management ecosystem.
          </p>
        </div>

        {/* Main Feature Workflow */}
        <div className="relative mb-24">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-1 w-full bg-gradient-to-r from-blue-400 to-teal-400 opacity-25 rounded-full"></div>
          </div>

          <div className="relative flex justify-between flex-col md:flex-row">
            {["Capture", "Process", "Edit & Organize"].map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 text-white font-bold text-xl shadow-lg">
                  {index + 1}
                </div>
                <h3 className="mt-3 text-lg font-medium text-gray-900">
                  {step}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          {mainFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
            >
              <div className="p-8">
                <div className="h-12 mb-6 flex items-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
              <div className="h-2 bg-gradient-to-r from-blue-400 to-teal-400"></div>
            </div>
          ))}
        </div>

        {/* Secondary Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 bg-gray-50 rounded-lg mr-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-lg text-gray-900">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CopywriteFeatures;
