import Image from "next/image";

export const ConversionSectionWord = () => {
  return (
    <div className="max-w-[1200px] mx-auto text-center">
      <section className="flex items-center justify-center flex-wrap p-16 px-8 bg-[#f9f9f9] gap-8 md:px-8">
        <div className="flex-1 min-w-[300px] md:mb-6">
          <h2
            style={{
              fontSize: "30px",
            }}
            className="text-5xl font-bold mt-4 leading-relaxed text-[#00415a]  mx-1 sm:text-3xl md:text-3xl "
          >
            Convert Your{" "}
            <span className="text-[#39a0c9] font-bold">
              Handwritten Paperwork
            </span>{" "}
            to Word Documents
          </h2>
          <p className="text-xl text-[#555] leading-[1.6] mt-4 md:text-sm">
            Transform your handwritten notes into fully editable Word documents
            in just a few clicks. <br />
            Say goodbye to manual typing and{" "}
            <span className="text-text-[#39a0c9]font-bold">
              streamline your workflow
            </span>{" "}
            with our powerful conversion tool.
          </p>
        </div>
        <div className="flex-1 min-w-[300px] flex justify-center">
          <Image
            src="/images/text-image.png"
            alt="Effortlessly convert handwritten data into Excel spreadsheets"
            title="Effortlessly convert handwritten data into Excel spreadsheets"
            width={450}
            height={380}
            className="w-full max-w-[450px] rounded-lg shadow-lg object-cover"
            loading="lazy"
          />
        </div>
      </section>
    </div>
  );
};

export const ConversionSectionExcel = () => {
  return (
    <div className="max-w-[1200px] mx-auto text-center">
      <section className="flex items-center justify-center flex-wrap p-16 px-8 bg-[#f9f9f9] gap-8 md:px-8">
        <div className="flex-1 min-w-[300px] flex justify-center">
          <Image
            src="/images/text-image.png"
            alt="Effortlessly convert handwritten data into Excel spreadsheets"
            title="Effortlessly convert handwritten data into Excel spreadsheets"
            width={450}
            height={380}
            className="w-full max-w-[450px] rounded-lg shadow-lg object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex-1 min-w-[300px] md:mb-6">
          <h2
            style={{
              fontSize: "30px",
            }}
            className="text-5xl font-bold mt-4 leading-relaxed text-[#00415a]  mx-1 sm:text-3xl md:text-3xl "
          >
            Convert Your{" "}
            <span className="text-[#39a0c9] font-bold">
              Handwritten Paperwork
            </span>{" "}
            to Excel Spreadsheet
          </h2>
          <p className="text-xl text-[#555] leading-[1.6] mt-4 md:text-sm">
            Convert handwritten tables, charts, and data into fully functional
            Excel spreadsheets with precision and ease. <br />
            Automate your workflow and{" "}
            <span className="text[#00415a] font-bold">
              unlock unmatched efficiency
            </span>{" "}
            today!
          </p>
        </div>
      </section>
    </div>
  );
};
