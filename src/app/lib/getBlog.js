// import fs from "fs";
// import path from "path";
// import matter from "gray-matter";
// import { cache } from "react";

// export const fetchBlogPosts = cache(async () => {
//   const blogDir = path.join(process.cwd(), "src/app/content/blog");
//   const files = fs.readdirSync(blogDir);

//   return files
//     .filter((file) => file.endsWith(".mdx"))
//     .map((filename) => {
//       const filePath = path.join(blogDir, filename);
//       const fileContent = fs.readFileSync(filePath, "utf-8");
//       const { data } = matter(fileContent);

//       return {
//         slug: filename.replace(".mdx", ""),
//         title: data.title || filename.replace(".mdx", ""),
//         date: data.date || "Unknown Date",
//         description: data.description || "No description available.",
//         image: data.image || "/placeholder-image.jpg",
//       };
//     });
// });
