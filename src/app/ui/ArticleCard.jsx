"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

function ArticleCard({ post }) {
  const router = useRouter();
  const handlePostClick = (slug) => {
    router.push(`/solutions/${slug}`);
  };

  return (
    <article
      key={post.id}
      onClick={() => handlePostClick(post.slug)}
      className="rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative w-full h-56">
        <Image
          src={post.imageUrl}
          alt={post.title}
          title={post.title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-[#062530] mb-2">
          {post.title}
        </h2>
        <p className="text-gray-600 text-sm mb-4">{post.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-[#2ec4b6] font-semibold text-sm">
            Read More
          </span>
        </div>
      </div>
    </article>
  );
}

export default ArticleCard;
