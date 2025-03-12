import Image from "next/image";
const features = [
  {
    image: "/images/accurate-conversion.png",
    title: "High-Precision OCR & ICR",
    description:
      "Leverage advanced OCR and ICR technology for accurate handwriting-to-text conversion with minimal errors.",
  },
  {
    image: "/images/converting-image.png",
    title: "Instant Digital Conversion",
    description:
      "Convert handwritten notes into editable Word or Excel documents in seconds—fast and seamless.",
  },
  {
    image: "/images/editing-image.jpeg",
    title: "Effortless Editing & Formatting",
    description:
      "Easily modify and structure your digital notes to match your workflow after conversion.",
  },
  {
    image: "/images/saving-image.png",
    title: "Cloud Sync & Secure Backup",
    description:
      "Access your converted documents from any device with automatic cloud storage.",
  },
  {
    image: "/images/convert-multilanguage.png",
    title: "Multi-Language Handwriting Support",
    description:
      "Convert handwritten text in multiple languages, perfect for global teams and projects.",
  },
  {
    image: "/images/collaboration.jpg",
    title: "Real-Time Team Collaboration",
    description:
      "Share and edit converted documents with your team for seamless productivity.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="bg-gray-100 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl font-bold leading-snug text-[#00415a] sm:text-3xl md:text-4xl px-2">
          Write by Hand ➝ Convert to Text ➝{" "}
          <span className="bg-gradient-to-r from-[#015979] via-[#1b9e99] to-[#39f8f2] bg-clip-text text-transparent font-bold">
            Download Document
          </span>
        </h2>
        <p className="text-gray-700 text-lg mt-2 w-3/4 mx-auto sm:w-11/12 md:w-full">
          Stop wasting time typing! Convert handwritten notes into digital text
          and boost your productivity.
        </p>
        <div className="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              image: "/images/accurate-conversion.png",
              title: "99% OCR & ICR Accuracy",
              description:
                "Convert Handwriting into Perfectly Formatted Documents in Seconds With advanced OCR & ICR technology, ",
            },
            {
              image: "/images/converting-image.png",
              title: "Instant Digital Conversion",
              description:
                "Transform handwritten notes into editable digital documents including word or excel instantly—no waiting, just seamless results.",
            },
            {
              image: "/images/editing-image.jpeg",
              title: "Easy Editing & Formatting",
              description:
                "Once your notes are digitized, effortlessly edit, format, and organize them to suit your needs.",
            },
            {
              image: "/images/saving-image.png",
              title: "Cloud Syncing",
              description:
                "Automatically sync your converted documents across devices, so you can access them from anywhere, anytime.",
            },
            {
              image: "/images/convert-multilanguage.png",
              title: "Multi-Language Support",
              description:
                "Convert handwritten documents in various languages, making it easy to work on international projects.",
            },
            {
              image: "/images/collaboration.jpg",
              title: "Team Collaboration",
              description:
                "Collaborate seamlessly on project goals with an intuitive, shared workspace for teams.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-8 transition-transform duration-300 hover:-translate-y-1 sm:p-2"
            >
              <div className="w-full min-h-[150px] rounded-md overflow-hidden flex justify-center items-center">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={500} // Adjust width as needed
                  height={300} // Adjust height as needed
                  layout="responsive" // Make the image responsive
                  objectFit="cover" // Maintain aspect ratio and cover the container
                  className="rounded-md mb-4" // Apply your existing styles
                />
              </div>
              <h3 className="text-xl font-semibold text-[#00415a]">
                {feature.title}
              </h3>
              <p className="text-gray-600 mt-2 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
