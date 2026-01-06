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
