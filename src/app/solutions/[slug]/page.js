import { notFound } from "next/navigation";

// Dynamically import the correct blog component
export default async function SolutionPage({ params }) {
  try {
    const { slug } = params;
    const PostComponent = (await import(`../${slug}/page.js`)).default;

    return <PostComponent />;
  } catch (error) {
    return notFound();
  }
}

// Generate dynamic metadata for SEO
// export async function generateMetadata({ params }) {
//   try {
//     const { slug } = params;
//     const { metadata } = await import(`../${slug}/page.js`);

//     return {
//       title: metadata.title,
//       description: metadata.description,
//       openGraph: {
//         title: metadata.title,
//         description: metadata.description,
//         images: [{ url: metadata.imageUrl }],
//       },
//     };
//   } catch {
//     return {};
//   }
// }
