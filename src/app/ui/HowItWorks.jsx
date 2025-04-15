const HowItWorksSection = () => {
  return (
    <section id="about" className="max-w-5xl mx-auto py-16 px-6 text-center">
      <h2 className="text-4xl font-bold text-gray-900">How It Works</h2>
      <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
        Follow these simple steps to convert your handwritten or scanned
        documents into digital text effortlessly.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
        {/* Step 1 */}
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 flex items-center justify-center bg-blue-100 rounded-full shadow-md">
            <span className="text-3xl font-semibold text-blue-600">1</span>
          </div>
          <h3 className="text-xl font-semibold mt-4 text-gray-900">Upload</h3>
          <p className="text-gray-600 mt-2">
            Select an image, scanned document, or handwritten text and upload it
            to get started.
          </p>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 flex items-center justify-center bg-green-100 rounded-full shadow-md">
            <span className="text-3xl font-semibold text-green-600">2</span>
          </div>
          <h3 className="text-xl font-semibold mt-4 text-gray-900">
            AI Processing
          </h3>
          <p className="text-gray-600 mt-2">
            Our AI extracts text, formats it properly, and makes it editable in
            our document editor.
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full shadow-md">
            <span className="text-3xl font-semibold text-purple-600">3</span>
          </div>
          <h3 className="text-xl font-semibold mt-4 text-gray-900">
            Edit & Download
          </h3>
          <p className="text-gray-600 mt-2">
            Customize the extracted text, format as needed, and export it in
            your preferred format.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
