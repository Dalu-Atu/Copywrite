import Image from "next/image";

import {
  ArrowRight,
  Check,
  Cloud,
  Cpu,
  Database,
  FileSpreadsheet,
  FileText,
  Globe,
  Laptop,
  Share2,
  Smartphone,
  Star,
  Tablet,
} from "lucide-react";
import HeaderComponent from "../../ui/HeaderComponent";
import Footer from "../../ui/Footer";

export const metadata = {
  title: "Access Your Handwritten Notes Online Anytime | Copywrite",
  description:
    "Store, access, and manage your handwritten notes converted to text online with Copywrite's secure cloud platform. Access your notes anytime, anywhere, from any device with our intuitive online document system.",
  imageUrl: "/images/to-excel-bg.png",

  url: "https://copywritee.com/solutions/store-document-online",
  keywords:
    "online note access, cloud document storage, digital note management, remote note access, online document viewer, secure note storage, anywhere access notes, mobile document access, digital document repository, paperless note system, cloud note synchronization",
  alternates: {
    canonical: "https://copywritee.com/solutions/store-document-online",
  },
};

export default function DocumentToStorage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      <HeaderComponent />

      <main>
        {/* Hero Section */}

        <section className="pt-10 pb-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gr-50 to-indigo-50">
          <span className="mb-5 px-4 py-2 bg-blue-100 text-[#1b9e99] rounded-full text-sm font-medium inline-flex items-center">
            <FileSpreadsheet className="w-4 h-4 mr-2" />
            Document Storage Solution
          </span>
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8">
                <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Access Your{" "}
                  <span className="text-[#1b9e99]">Handwritten Notes</span>{" "}
                  Online Anytime
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Your notes, your documents, your ideas—available whenever you
                  need them, wherever you are. Store, manage, edit, and access
                  your handwritten content securely in the cloud after
                  converting them to formatted online document
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://app.copywritee.com/signup"
                    className="bg-[#1b9e99] text-white px-6 py-3 rounded-md transition-colors flex items-center justify-center"
                  >
                    Start Storing Notes
                    <ArrowRight className="ml-2" size={18} />
                  </a>

                  <a
                    href="https://app.copywritee.com/upload-image"
                    className="bg-white text-[#1b9e99] border border-[#1b9e99] px-6 py-3 rounded-md transition-colors text-center"
                  >
                    Try for free
                  </a>
                </div>
                <div className="mt-8 flex items-center">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"
                      ></div>
                    ))}
                  </div>
                  <div className="ml-4 text-sm text-gray-600">
                    <span className="font-semibold">5,000+</span> professionals
                    accessing / editing notes online
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 relative">
                <div className="relative rounded-xl overflow-hidden ">
                  <div className="aspect-[4/3]  flex items-center justify-center">
                    <div className="text-gray-500">
                      <Image
                        className="relative rounded-xl "
                        src="/images/copywrite-image004.png"
                        alt="Access handwritten notes from multiple devices"
                        width={600}
                        height={450}
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="absolute -bottom-6 -right-6 bg-[#1b9e99] text-white p-4 rounded-lg shadow-lg">
                  <p className="text-sm font-semibold">24/7 Online Access</p>
                </div> */}
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Universal <span className="text-[#1b9e99]">Online Access</span>{" "}
                To Your Notes
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Never lose track of your important handwritten content again,
                convert you handwritten note to digital documents and store them
                with our secure cloud storage system and intuitive online
                document management.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Cpu className="text-[#1b9e99]" size={32} />,
                  title: "Convert handwritten notes to text",
                  description:
                    "Upload your handwritten notes—our AI converts them into editable documents, stored securely in the cloud for access anytime, anywhere",
                },
                {
                  icon: <Cloud className="text-[#1b9e99]" size={32} />,
                  title: "Secure Cloud Storage",
                  description:
                    "Store your valuable handwritten notes in our secure cloud repository with automatic backups and version history tracking.",
                },
                {
                  icon: <Globe className="text-[#1b9e99]" size={32} />,
                  title: "Universal Online Access",
                  description:
                    "Access your notes online from anywhere—at home, in the office, or on the go—through our web-based document portal.",
                },

                {
                  icon: <FileText className="text-[#1b9e99]" size={32} />,
                  title: "Online Document Editor",
                  description:
                    "Make changes to your notes directly in our intuitive online editor with familiar formatting tools.",
                },
                {
                  icon: <Database className="text-[#1b9e99]" size={32} />,
                  title: "Digital Library Organization",
                  description:
                    "Organize your notes into customized folders with smart tagging for instant document retrieval.",
                },
                {
                  icon: <Share2 className="text-[#1b9e99]" size={32} />,
                  title: "Export in 20+ Formats",
                  description:
                    "Share your notes with teammates and export or download them 20+ formats, including docx, xlsx, pdf, html, csv, and many more...",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cross-Device Access */}
        <section
          id="accessibility"
          className="py-6 px-4 sm:px-6 lg:px-8 bg-gray-50"
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <div className="relative">
                  <div className="bg-white p-6 rounded-xl shadow-xl">
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        {
                          src: "/images/copywrite-image006.png",
                          alt: "Desktop view of converted handwritten notes with editable text",
                          description: "Desktop Experience",
                        },
                        {
                          src: "/images/copywrite-image005.png",
                          alt: "Tablet showing the same notes with touch interface",
                          description: "Tablet Access",
                        },
                        {
                          src: "/images/copywrite-image008.png",
                          alt: "Smartphone view of converted notes on mobile interface",
                          description: "Mobile Viewing",
                        },
                        {
                          src: "/images/copywrite-image007.png",
                          alt: "Collaborative editing of handwritten notes across devices",
                          description: "Sync Everywhere",
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="aspect-square bg-gray-200 rounded-lg flex flex-col items-center justify-center"
                        >
                          <Image
                            src={item.src}
                            alt={item.alt}
                            width={250}
                            height={250}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-[#1b9e99] text-white p-4 rounded-lg shadow-lg">
                    <p className="text-sm font-semibold">
                      Multi-Device Synchronization
                    </p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 md:pl-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Access Your Notes From{" "}
                  <span className="text-[#1b9e99]">Any Device</span>
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Your handwritten notes being converted to document follow you
                  everywhere with our cross-platform online access system. Never
                  be without your important information again.
                </p>
                A collaborative scenario where multiple people are accessing and
                commenting on the same document from different devices,
                illustrating the synchronization and sharing capabilities.
                <div className="space-y-4">
                  {[
                    {
                      icon: <Laptop className="text-[#1b9e99]" size={24} />,
                      title: "Desktop Web Access",
                      description:
                        "Full-featured document viewing and editing from any computer browser.",
                    },
                    {
                      icon: <Tablet className="text-[#1b9e99]" size={24} />,
                      title: "Tablet-Optimized Interface",
                      description:
                        "Perfect for reviewing your notes on larger mobile screens with touch capabilities.",
                    },
                    {
                      icon: <Smartphone className="text-[#1b9e99]" size={24} />,
                      title: "Mobile Document Viewer",
                      description:
                        "Quick reference access to your notes on the go from any smartphone.",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex">
                      <div className="flex-shrink-0 mr-4">{item.icon}</div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {item.title}
                        </h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Our{" "}
                <span className="text-[#1b9e99]">Handwriting to Text</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover the transformative advantages of having your
                handwritten notes converted to document and accessible online at
                any time.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="relative">
                <div className="aspect-[4/3]  rounded-xl overflow-hidden">
                  <Image
                    src="/images/copywrite-image009.png"
                    alt="Benefits of online note access"
                    width={600}
                    height={450}
                  />
                </div>
              </div>

              <div className="space-y-6">
                {[
                  {
                    title: "Never Lose Important Notes Again",
                    description:
                      "Say goodbye to misplaced notebooks and scattered papers. With online storage, your handwritten notes are securely preserved and instantly accessible.",
                  },
                  {
                    title: "Access Across Multiple Locations",
                    description:
                      "Whether you're at home, in the office, traveling, or at a client site, your notes are just a few clicks away in our online document viewer.",
                  },
                  {
                    title: "Searchable Note Repository",
                    description:
                      "Quickly find specific information within your digital note collection using our powerful search functionality.",
                  },
                  {
                    title: "Environmentally Conscious Solution",
                    description:
                      "Reduce paper waste while maintaining your preference for handwritten note-taking with our digital storage system.",
                  },
                  {
                    title: "Disaster-Proof Documentation",
                    description:
                      "Protect your valuable handwritten content from physical damage, loss, or natural disasters with redundant cloud backups.",
                  },
                ].map((benefit, index) => (
                  <div key={index}>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        <Check className="text-green-500" size={20} />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {benefit.title}
                        </h3>
                        <p className="text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How CopyWrite{" "}
                <span className="text-[#1b9e99]">Stores Your</span> Notes
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A simple process to get your handwritten notes converted to
                formatted documents and securely stored and accessible online
                whenever you need them.
              </p>
            </div>

            <div className="relative">
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-blue-200 transform -translate-y-1/2 hidden md:block"></div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  {
                    number: "1",
                    title: "Upload Your Notes",
                    description:
                      "Take a picture of your handwritten notes or upload existing images by tapping the upload button on your dashboard",
                  },
                  {
                    number: "2",
                    title: "Process & Store",
                    description:
                      "Our system converts your handwritten note into formatted document and store them in  your secure online account. which you can edit right away",
                  },
                  {
                    number: "3",
                    title: "Organize & Categorize",
                    description:
                      "Arrange your converted documents into folders, add tags, and create a structured digital library of your handwritten content.",
                  },
                  {
                    number: "4",
                    title: "Access Anywhere",
                    description:
                      "View, Edit, and Export your notes from any device with an internet connection through our online document editor.",
                  },
                ].map((step, index) => (
                  <div key={index} className="relative">
                    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 relative z-10">
                      <div className="w-12 h-12 bg-[#1b9e99] rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                        {step.number}
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-900">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Users Say About{" "}
                <span className="text-[#1b9e99]">Online Note Access</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Discover how professionals across industries benefit from
                accessing their handwritten notes online.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote:
                    "Having my handwritten meeting notes accessible from any device has transformed my productivity. I can reference important client information instantly without carrying notebooks everywhere.",
                  name: "Sarah Johnson",
                  title: "Marketing Director",
                  rating: 5,
                },
                {
                  quote:
                    "As a doctor, I prefer handwriting my patient notes, but need them accessible across multiple clinics. This online access solution gives me the best of both worlds—handwritten notes with digital convenience.",
                  name: "Dr. Michael Chen",
                  title: "Physician",
                  rating: 5,
                },
                {
                  quote:
                    "The ability to access my handwritten lecture notes online and edit them from anywhere has been a game-changer for my studies. I can review material between classes without carrying multiple notebooks.",
                  name: "James Rodriguez",
                  title: "Graduate Student",
                  rating: 5,
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="text-[#1b9e99] fill-current"
                        size={20}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-6">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center">
                    <div className="ml-4">
                      <p className="font-semibold text-gray-900">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked{" "}
                <span className="text-[#1b9e99]">Questions</span>
              </h2>
              <p className="text-xl text-gray-600">
                Common questions about online handwritten note access
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  question: "How can I convert my handwritten note to text",
                  answer:
                    "Copywrite makes converting handwritten notes to text simple and accurate. Just upload a photo of your handwritten note through our intuitive interface, and our advanced OCR (Optical Character Recognition) technology will process it instantly. Unlike basic converters, Copywrite preserves all formatting elements including tables, bullet points, and color distinctions. The converted document opens directly in our familiar word processor interface, where you can make edits if needed. Your digitized document is automatically saved to your selected folder in your secure cloud account, allowing you to access it online anytime, from any device. For table-heavy notes, our specialized Excel-like conversion ensures data remains properly structured in rows and columns.",
                },
                {
                  question:
                    "How secure is the online storage for my handwritten notes?",
                  answer:
                    "Your handwritten notes are protected with bank-level encryption both during transmission and storage. We employ multiple security layers including secure data centers, regular security audits, and strict access controls to ensure your documents remain confidential and protected.",
                },
                {
                  question:
                    "Can I organize my handwritten notes online into folders?",
                  answer:
                    "Absolutely! Our online document management system allows you to create custom folders, subfolders, and apply tags to organize your handwritten notes however you prefer. You can structure your digital note library exactly as you would physical documents.",
                },
                {
                  question:
                    "Can I access my handwritten notes without an internet connection?",
                  answer:
                    "While Copywrite is primarily a cloud-based platform for online access, we understand the need for offline functionality. You can download your converted documents in multiple formats (including DOCX, PDF, XLSX, and more) to use offline on any device. This allows you to access your digitized handwritten notes even without internet connectivity. Simply download the documents you need before going offline, and they'll be available on your local device whenever you need them. When you reconnect to the internet, you can always access the latest versions stored in your secure online account.",
                },
                {
                  question:
                    "What file formats can I export my digitized handwritten notes to?",
                  answer:
                    "Copywrite offers incredible flexibility with over 20 export formats for your digitized handwritten notes. You can download your documents as DOCX, PDF, XLSX, TXT, RTF, HTML, EPUB, and many more formats. This makes it easy to use your converted handwritten notes in virtually any application or platform, ensuring maximum compatibility with your existing workflow and tools.",
                },
                {
                  question:
                    "How accurate is Copywrite at converting handwritten notes to digital text?",
                  answer:
                    "Copywrite achieves industry-leading accuracy rates of up to 99% when converting handwritten notes to digital text. Our advanced AI-powered OCR and ICR (Intelligent Character Recognition) technologies can recognize even challenging handwriting styles, including cursive and mixed scripts. The system continuously improves through machine learning, resulting in increasingly accurate conversions over time. For any rare instances where corrections are needed, our intuitive word processor-like interface makes adjustments quick and easy.",
                },
                {
                  question:
                    "Can Copywrite handle handwritten tables and diagrams in my notes?",
                  answer:
                    "Yes! Unlike basic converters, Copywrite excels at recognizing and preserving the structure of handwritten tables and diagrams. When you upload notes containing tables, our specialized recognition technology identifies rows, columns, and cell data, converting them into properly formatted digital tables. For Excel users, we offer a dedicated spreadsheet conversion feature that transforms handwritten tabular data directly into Excel-compatible formats with rows, columns, and cells intact.",
                },

                {
                  question:
                    "Is there a mobile app for accessing my handwritten notes online?",
                  answer:
                    "Not yet. Copywrite offers a mobile-responsive web application that works perfectly on smartphones and tablets, allowing you to access your handwritten notes online from any mobile device with a browser.",
                },
                {
                  question:
                    "Can I search within my handwritten notes after they're converted?",
                  answer:
                    "Absolutely! One of the most powerful features of Copywrite is full-text search capability across your entire library of converted handwritten notes. Once your notes are digitized and stored in your online account, you can instantly search for any keyword, phrase, or number across all your documents. The search function works across document titles, content, and even within tables. This transforms how you access information in your notes—what might take hours to find manually can be located in seconds with our powerful search functionality.",
                },
                {
                  question:
                    "What makes Copywrite better than other online document storage solutions?",
                  answer:
                    "Copywrite stands apart by offering a complete ecosystem for handwritten notes: from conversion to editing to storage. Unlike generic cloud storage services, we specialize in preserving the unique elements of handwritten documents when digitizing them. Our familiar MS Word-like editor eliminates the need to switch between multiple apps. We provide exceptional organization tools with custom folders and tags specifically designed for managing a digital note library. With 20+ export formats and built-in collaboration features, Copywrite brings all your document needs into one seamless online platform accessible from anywhere.",
                },
              ].map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1b9e99] to-[#015979] text-white">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Accessing Your Handwritten Notes Online Today
            </h2>
            <p className="text-xl opacity-90 mb-10 max-w-3xl mx-auto">
              Join thousands of professionals who enjoy the freedom of having
              their handwritten content securely accessible and editable online
              anytime, anywhere.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://app.copywritee.com/signup"
                className="bg-white text-[#015979] px-16 py-4 rounded-md hover:bg-gray-100 transition-colors text-lg font-medium"
              >
                Try For Free
              </a>
            </div>
            <p className="mt-6 text-sm opacity-80">
              No credit card required. Cancel anytime.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
