import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

// Import ALL components used in MDX\
import Logo from "@/app/content/blog/Logo"; // ✅ Import your component
import Blogs from "@/app/content/blog/Blogs"; // ✅ Import your component

// Create a mapping of components
const components = {
  Logo,
  Blogs,
  // SpecialComponent,
  // BlogLayout1,
  // BlogLayout2,
};

export default async function BlogPost({ params }) {
  const awaitedParams = await params;

  if (!awaitedParams?.slug) return notFound();

  const { slug } = awaitedParams;
  const filePath = path.join(
    process.cwd(),
    "src/app/content/blog",
    `${slug}.mdx`
  );

  if (!fs.existsSync(filePath)) return notFound();

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(fileContent);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* <h1 className="text-3xl font-bold">{data.title || "Untitled"}</h1>
      <p className="text-gray-500">{data.date || "Unknown Date"}</p> */}

      {/* ✅ Pass multiple components to MDX */}
      <div className="prose mt-4">
        <MDXRemote source={content} components={components} />
      </div>
    </div>
  );
}
