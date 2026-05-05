"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Search, Clock } from "lucide-react";
import { articles } from "../data/articles";

const categories = [
  "Latest",
  "Engineering",
  "Productivity",
  "Company",
  "Tutorials",
];

export default function BlogSection() {
  const [selectedCategory, setSelectedCategory] = useState("Latest");
  const [searchQuery, setSearchQuery] = useState("");

  // Logic to filter articles
  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      selectedCategory === "Latest" || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get the featured post (first one or explicitly marked)
  const featuredPost = articles.find((a) => a.featured) || articles[0];
  // Remove featured post from the main grid to avoid duplication if "Latest" is selected
  const gridArticles = filteredArticles.filter((a) => a.id !== featuredPost.id);

  return (
    <section className="bg-white py-24 border-t border-slate-100 md:mt-7 mt-0">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* 1. HEADER: Minimal & Editorial */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 pb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
              NoteOCR Blog
            </h2>
            <p className="text-lg text-slate-500 max-w-xl leading-relaxed">
              Thoughts on AI, document intelligence, and the future of work.
            </p>
          </div>

          {/* Search Field (Underlined style, not a box) */}
          <div className="w-full md:w-64 relative group">
            <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-b border-slate-200 py-2 pl-7 pr-0 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600 transition-colors"
            />
          </div>
        </div>

        {/* 2. CATEGORY TABS (Text based, no buttons) */}
        <div className="flex overflow-x-auto gap-8 mb-1 pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`text-sm font-medium whitespace-nowrap transition-colors relative pb-1 ${
                selectedCategory === category
                  ? "text-slate-900"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {category}
              {selectedCategory === category && (
                <span className="absolute bottom-0 left-0 right-0 h-px bg-slate-900"></span>
              )}
            </button>
          ))}
        </div>

        {/* 3. FEATURED POST (Hero Layout) */}
        {!searchQuery && selectedCategory === "Latest" && (
          <div className="mb-20">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
            >
              {/* Image Side */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Text Side */}
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4 text-xs font-bold uppercase tracking-wider text-teal-600">
                  <span>Featured</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span>{featuredPost.readTime} read</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-teal-700 transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-slate-500 text-lg leading-relaxed mb-6 line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-3">
                  {/* Author Avatar (Initials) */}
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                    {featuredPost.author.charAt(0)}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-slate-900">
                      {featuredPost.author}
                    </span>
                    <span className="text-slate-400 mx-2">·</span>
                    <span className="text-slate-500">
                      {new Date(featuredPost.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* 4. ARTICLE GRID (Clean, No Borders) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {gridArticles.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.slug}`}
              className="group flex flex-col"
            >
              {/* Thumbnail */}
              <div className="relative aspect-[16/10] bg-slate-600 rounded-xl overflow-hidden mb-6">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3 text-xs font-medium text-slate-500">
                  <span className="text-teal-600">{article.category}</span>
                  <span>·</span>
                  <span>
                    {new Date(article.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-teal-700 transition-colors">
                  {article.title}
                </h3>

                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-4">
                  {article.excerpt}
                </p>

                <div className="flex items-center text-sm font-semibold text-slate-900 group-hover:gap-2 transition-all">
                  Read post{" "}
                  <ArrowUpRight className="w-4 h-4 ml-1 text-slate-400" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {gridArticles.length === 0 && !featuredPost && (
          <div className="py-20 text-center">
            <p className="text-slate-500 text-lg">
              No articles found matching your search.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("Latest");
              }}
              className="mt-4 text-teal-600 font-medium hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
