import Image from "next/image";
export const ConversionSectionWord = () => {
  return (
    <section
      aria-labelledby="word-conversion-title"
      className="m-10 max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center gap-16"
    >
      {/* Text */}
      <div className="flex-1">
        <h2
          id="word-conversion-title"
          className="text-2xl md:text-4xl font-extrabold leading-tight text-[#00415a]"
        >
          Convert text to{" "}
          <span className="text-[#1b9e99]">Word Documents Online</span>
        </h2>
        <p className=" md:text-xl text-gray-700 mt-6 leading-relaxed">
          Upload a picture of your cursive handwritten notes and instantly
          convert them into{" "}
          <span className="font-semibold text-[#1b9e99]">
            fully editable Microsoft Word files
          </span>
          . Save time, prevent typing errors, store document online and simplify
          your document workflow with AI-powered precision.
        </p>
        <p className="text-sm text-gray-500 mt-3">
          No Credit card required • Free & Premium options available
        </p>
        <a
          href="https://app.copywritee.com/signup"
          className="inline-block mt-8 px-8 py-3 bg-[#1b9e99] text-white rounded-xl font-semibold shadow-md hover:shadow-xl hover:bg-[#158b88] transition"
        >
          Start Word Conversion →
        </a>
      </div>

      {/* Video */}
      <div className="flex-1 flex justify-center">
        <video
          src="/videos/copywritee-note-to-document.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full max-w-md h-auto rounded-lg shadow-xl object-contain"
        />
      </div>
    </section>
  );
};

export const ConversionSectionExcel = () => {
  return (
    <section
      aria-labelledby="excel-conversion-title"
      className="m-10  max-w-7xl mx-auto px-6 py-10 flex flex-col-reverse md:flex-row items-center gap-16 bg-[#f9f9f9] rounded-3xl"
    >
      {/* Video */}
      <div className="flex-1 flex justify-center">
        <video
          src="/videos/copywritee-table-to-excel.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full max-w-md h-auto rounded-lg shadow-xl object-contain"
        />
      </div>

      {/* Text */}
      <div className="flex-1">
        <h2
          id="excel-conversion-title"
          className="text-2xl md:text-4xl font-extrabold leading-tight text-[#00415a]"
        >
          Convert Handwritten{" "}
          <span className="text-[#1b9e99]">Data to Excel Sheets</span>
        </h2>
        <p className=" md:text-xl text-gray-700 mt-6 leading-relaxed">
          Transform handwritten tables, lists, and figures into{" "}
          <span className="font-semibold text-[#1b9e99]">
            structured Excel spreadsheets
          </span>
          . Boost productivity, automate calculations, and eliminate manual data
          entry forever.
        </p>
        <p className="text-sm text-gray-500 mt-3">
          Fast • Accurate • Optimized for Microsoft Excel
        </p>
        <a
          href="/excel-conversion"
          className="inline-block mt-8 px-8 py-3 bg-[#00415a] text-white rounded-xl font-semibold shadow-md hover:shadow-xl hover:bg-[#003947] transition"
        >
          Start Excel Conversion →
        </a>
      </div>
    </section>
  );
};

export const ConversionSectionPDF = () => {
  return (
    <section
      aria-labelledby="pdf-conversion-title"
      className="m-10  max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center gap-16"
    >
      {/* Text */}
      <div className="flex-1">
        <h2
          id="pdf-conversion-title"
          className="text-2xl md:text-4xl font-extrabold leading-tight text-[#00415a]"
        >
          Edit Handwritten Notes as{" "}
          <span className="text-[#1b9e99]">PDF Documents</span>
        </h2>
        <p className=" md:text-xl text-gray-700 mt-6 leading-relaxed">
          Powered by onlyoffice editor, Convert scanned handwriting into
          editable{" "}
          <span className="font-semibold text-[#1b9e99]">PDF files</span>. Add
          highlights, annotations, or make changes directly without retyping
          everything from scratch. or import and edit your own pdf files
        </p>
        <p className="text-sm text-gray-500 mt-3">
          Secure • Easy-to-use • Works on any device
        </p>
        <a
          href="/pdf-conversion"
          className="inline-block mt-8 px-8 py-3 bg-[#1b9e99] text-white rounded-xl font-semibold shadow-md hover:shadow-xl hover:bg-[#158b88] transition"
        >
          Start PDF Editing →
        </a>
      </div>

      {/* Image */}
      <div className="flex-1 flex justify-center">
        <Image
          src="/images/pdf-editor.png"
          alt="Handwritten notes converted into editable PDF with highlights and annotations"
          width={500}
          height={400}
          className="rounded-2xl shadow-xl object-cover"
          priority
        />
      </div>
    </section>
  );
};

export const ConversionSectionCloud = () => {
  return (
    <section
      aria-labelledby="cloud-storage-title"
      className="m-10  max-w-7xl mx-auto px-6 py-10 flex flex-col-reverse md:flex-row items-center gap-16 bg-[#f9f9f9] rounded-3xl"
    >
      {/* Image */}
      <div className="flex-1 flex justify-center">
        <Image
          src="/images/copywritee-save-in-cloud.png"
          alt="Save converted documents securely in the cloud for instant access"
          width={500}
          height={400}
          className="rounded-2xl shadow-xl object-cover"
          priority
        />
      </div>

      {/* Text */}
      <div className="flex-1">
        <h2
          id="cloud-storage-title"
          className="text-2xl md:text-4xl font-extrabold leading-tight text-[#00415a]"
        >
          Save Documents{" "}
          <span className="text-[#1b9e99]">Securely in the Cloud</span>
        </h2>
        <p className=" md:text-xl text-gray-700 mt-6 leading-relaxed">
          Store your converted Word, Excel, and PDF files online for{" "}
          <span className="font-semibold text-[#1b9e99]">
            anytime, anywhere access
          </span>
          . Never lose your notes again and collaborate with ease.
        </p>
        <p className="text-sm text-gray-500 mt-3">
          Encrypted • Always accessible • One-click sharing
        </p>
        <a
          href="/cloud-storage"
          className="inline-block mt-8 px-8 py-3 bg-[#00415a] text-white rounded-xl font-semibold shadow-md hover:shadow-xl hover:bg-[#003947] transition"
        >
          Save to Cloud →
        </a>
      </div>
    </section>
  );
};

// export const ConversionSectionCollaboration = () => {
//   return (
//     <section
//       aria-labelledby="collaboration-title"
//       className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center gap-16"
//     >
//       {/* Text */}
//       <div className="flex-1">
//         <h2
//           id="collaboration-title"
//           className="text-3xl md:text-4xl font-extrabold leading-tight text-[#00415a]"
//         >
//           Collaborate on{" "}
//           <span className="text-[#1b9e99]">Documents in Real-Time</span>
//         </h2>
//         <p className="md:text-xl text-gray-700 mt-6 leading-relaxed">
//           Work with your team on converted documents instantly. Share links,
//           leave comments, and{" "}
//           <span className="font-semibold text-[#1b9e99]">
//             edit together in real-time
//           </span>{" "}
//           from any device.
//         </p>
//         <p className="text-sm text-gray-500 mt-3">
//           Multi-user editing • Instant sync • Perfect for teams
//         </p>
//         <a
//           href="/collaboration"
//           className="inline-block mt-8 px-8 py-3 bg-[#1b9e99] text-white rounded-xl font-semibold shadow-md hover:shadow-xl hover:bg-[#158b88] transition"
//         >
//           Try Collaboration →
//         </a>
//       </div>

//       {/* Image */}
//       <div className="flex-1 flex justify-center">
//         <Image
//           src="/images/collaboration.jpeg"
//           alt="Multiple users collaborating on a converted document in real-time"
//           width={500}
//           height={400}
//           className="rounded-2xl shadow-xl object-cover"
//           priority
//         />
//       </div>
//     </section>
//   );
// };
