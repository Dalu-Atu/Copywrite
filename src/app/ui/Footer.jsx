"use client";

const Footer = () => {
  return (
    <footer className="bg-[#015979] text-[#dcdcdc] p-10 text-center font-sans">
      <div className="flex flex-col items-center text-center pb-5 border-b border-gray-300 mb-5">
        <h2 className="text-xl font-bold">Stay Updated</h2>
        <p>Subscribe to get the latest news and updates.</p>
        <div className="flex gap-2 mt-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 border border-gray-400 rounded w-[250px]"
          />
          <button className="p-2 px-4 bg-gray-800 text-white rounded hover:bg-gray-600">
            Subscribe
          </button>
        </div>
      </div>
      <p className="mt-5">
        © {new Date().getFullYear()} Copywrite+. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
