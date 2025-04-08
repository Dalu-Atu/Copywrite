"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { blogPosts } from "../lib/posts";

const BlogSection = () => {
  const router = useRouter();

  const handlePostClick = (slug) => {
    router.push(`/solutions/${slug}`);
  };

  return (
    <section className="bg-gradient-to-r from-[#f0f8ff] to-[#e0f7fa] py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold text-[#00415a]">
          Browse our solutions
        </h2>
        <p className="text-lg text-gray-600 mt-4 max-w-xl mx-auto">
          Stay updated with the latest news, tips, and trends in
          handwriting-to-text conversion and AI technologies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 justify-items-center">
        {blogPosts.slice(-3).map((post) => (
          <div
            key={post.id}
            onClick={() => handlePostClick(post.slug)}
            className="max-w-sm bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-2xl transform transition-transform duration-300 hover:scale-105"
          >
            <div className="relative w-full h-48">
              <Image
                src={post.imageUrl}
                alt={post.title}
                title={post.title}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
                priority
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#062530] mb-2">
                {post.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{post.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-[#2ec4b6] font-semibold text-sm">
                  Read More
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
