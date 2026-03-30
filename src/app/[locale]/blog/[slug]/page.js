import { articles } from "../../../data/articles";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  Twitter,
  Linkedin,
  Facebook,
  Link as LinkIcon,
  Calendar,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";

// ─── CLIENT COMPONENTS ────────────────────────────────────────────────────────
// (We can safely inline small client components for interactivity)
import { ReadingProgress } from "./ReadingProgress";
import { CopyLinkButton } from "./CopyLinkButton";

// ─── generateStaticParams ────────────────────────────────────────────────────
export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

// ─── generateMetadata ────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const decodedSlug = decodeURIComponent(resolvedParams.slug);

  const post = articles.find((a) => a.slug === decodedSlug);
  if (!post) return {};

  const ogImage = post.image.startsWith("http")
    ? post.image
    : `https://noteocr.com${post.image}`;

  return {
    title: `${post.title} | NoteOCR`,
    description: post.excerpt,
    alternates: {
      canonical: `https://noteocr.com/en/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://noteocr.com/blog/${post.slug}`,
      siteName: "NoteOCR",
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
      creator: "@noteocr",
    },
  };
}

// ─── Server Components ───────────────────────────────────────────────────────

function RelatedPosts({ currentId, currentCategory, currentTags }) {
  const related = articles
    .filter((a) => a.id !== currentId)
    .map((a) => {
      const tagOverlap = a.tags.filter((t) => currentTags.includes(t)).length;
      const categoryMatch = a.category === currentCategory ? 1 : 0;
      return { ...a, score: tagOverlap * 2 + categoryMatch };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 2);

  if (!related.length) return null;

  return (
    <section className="mt-24 pt-16 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-8">
        Keep reading
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {related.map((a) => (
          <Link key={a.id} href={`/blog/${a.slug}`} className="group block">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-5 bg-gray-100 ring-1 ring-gray-900/5">
              <Image
                src={a.image}
                alt={a.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex items-center gap-2 mb-3 text-xs font-medium text-gray-500">
              <span className="text-gray-900">{a.category}</span>
              <span>·</span>
              <span>
                {new Date(a.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors mb-2">
              {a.title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
              {a.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default async function BlogPost({ params }) {
  const resolvedParams = await params;
  const decodedSlug = decodeURIComponent(resolvedParams.slug);

  const post = articles.find((a) => a.slug === decodedSlug);
  if (!post) return notFound();

  const ogImage = post.image.startsWith("http")
    ? post.image
    : `https://noteocr.com${post.image}`;
  const encodedUrl = encodeURIComponent(
    `https://noteocr.com/blog/${post.slug}`
  );
  const encodedTitle = encodeURIComponent(post.title);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: ogImage,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "NoteOCR",
      logo: { "@type": "ImageObject", url: "https://noteocr.com/logo.png" },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://noteocr.com/en/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReadingProgress />

      <main className="min-h-screen bg-white text-gray-900 selection:bg-blue-100 selection:text-blue-900 mt-10">
        {/* Breadcrumb Navigation */}
        <div className="max-w-[1200px] mx-auto px-6 pt-12 pb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Blog
          </Link>
        </div>

        <article>
          {/* ── HERO HEADER ── */}
          <header className="max-w-[1000px] mx-auto px-6 mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-900 text-xs font-semibold tracking-wide uppercase">
                {post.category}
              </span>
              <span className="text-gray-300">•</span>
              <span className="flex items-center gap-1.5 text-sm font-medium text-gray-500">
                <Clock className="w-4 h-4" /> {post.readTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 leading-[1.1] mb-8 max-w-[900px]">
              {post.title}
            </h1>

            <p className="text-xl sm:text-2xl text-gray-500 leading-relaxed max-w-[800px]">
              {post.excerpt}
            </p>
          </header>

          {/* ── MASSIVE HERO IMAGE ── */}
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 mb-16 lg:mb-24">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl md:rounded-3xl bg-gray-100 ring-1 ring-gray-900/5 shadow-2xl shadow-gray-200/50">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>

          {/* ── ASYMMETRIC GRID (Sidebar + Content) ── */}
          <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-16 lg:gap-24 items-start">
            {/* LEFT SIDEBAR (Sticky on Desktop) */}
            <aside className="hidden lg:block sticky top-32 space-y-10">
              {/* Author Lockup */}
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                  Written By
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      {post.author}
                    </p>
                    <p className="text-xs text-gray-500">NoteOCR Team</p>
                  </div>
                </div>
              </div>

              {/* Publish Date */}
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                  Published
                </p>
                <time
                  dateTime={post.date}
                  className="text-sm font-medium text-gray-900"
                >
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>

              {/* Share Actions */}
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
                  Share Article
                </p>
                <div className="flex flex-col gap-3">
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    <Twitter className="w-4 h-4" /> Twitter
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </a>
                  <CopyLinkButton
                    url={`https://noteocr.com/blog/${post.slug}`}
                  />
                </div>
              </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <div className="min-w-0 w-full max-w-[750px]">
              {/* Mobile Author & Date (Hidden on Desktop) */}
              <div className="flex lg:hidden items-center justify-between py-6 border-b border-gray-200 mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      {post.author}
                    </p>
                    <time className="text-xs text-gray-500">
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                  </div>
                </div>
                {/* Mobile Share */}
                <div className="flex items-center gap-4">
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                    className="text-gray-400 hover:text-gray-900"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
                    className="text-gray-400 hover:text-gray-900"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* HTML Content (Rich Typography via Tailwind Prose) */}
              <div
                className={`
                  prose prose-lg md:prose-xl prose-gray max-w-none
                  
                  /* Headings */
                  prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-gray-900
                  prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-6
                  prose-h3:text-2xl md:prose-h3:text-3xl prose-h3:mt-12 prose-h3:mb-4
                  
                  /* Paragraphs & Text */
                  prose-p:leading-[1.8] md:prose-p:leading-[1.9] prose-p:text-gray-600 prose-p:mb-8
                  prose-strong:font-bold prose-strong:text-gray-900
                  
                  /* Links */
                  prose-a:text-blue-600 prose-a:font-medium prose-a:underline prose-a:underline-offset-4 prose-a:decoration-blue-200 hover:prose-a:decoration-blue-600 prose-a:transition-colors
                  
                  /* Blockquotes */
                  prose-blockquote:border-l-4 prose-blockquote:border-gray-900 prose-blockquote:bg-gray-50 prose-blockquote:pl-6 prose-blockquote:pr-4 prose-blockquote:py-4 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-gray-900 prose-blockquote:font-medium prose-blockquote:text-xl
                  
                  /* Lists */
                  prose-ul:mt-6 prose-ul:mb-10 prose-ul:list-none prose-li:relative prose-li:pl-6 prose-li:text-gray-600
                  prose-ul>li::before:content-[''] prose-ul>li::before:absolute prose-ul>li::before:left-0 prose-ul>li::before:top-[0.6em] prose-ul>li::before:w-1.5 prose-ul>li::before:h-1.5 prose-ul>li::before:bg-blue-500 prose-ul>li::before:rounded-full
                  prose-ol:mt-6 prose-ol:mb-10
                  
                  /* Code & Tables (Overrides inline styles from your JSON safely) */
                  prose-table:border-collapse prose-th:bg-gray-50 prose-th:px-4 prose-th:py-3 prose-th:text-sm prose-td:px-4 prose-td:py-3 prose-td:border-b prose-td:border-gray-100
                `}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Article Tags */}
              <div className="mt-16 pt-8 flex items-center gap-3 flex-wrap">
                <span className="text-sm font-medium text-gray-500">Tags:</span>
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${tag.toLowerCase()}`}
                    className="px-3 py-1.5 bg-gray-50 text-gray-600 text-sm font-medium rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-100 transition-all"
                  >
                    {tag}
                  </Link>
                ))}
              </div>

              {/* Author Bio Box */}
              <div className="mt-16 bg-gray-50 rounded-2xl p-8 border border-gray-100 flex flex-col sm:flex-row items-start gap-6">
                <Image
                  src="/logo.png"
                  alt="Author"
                  width={64}
                  height={64}
                  className="rounded-full ring-4 ring-white shadow-sm"
                />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    About {post.author}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    The NoteOCR team consists of AI researchers and engineers
                    dedicated to closing the gap between analog thought and
                    digital workflows. We build tools that make handwriting
                    perfectly searchable.
                  </p>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    More about us <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <RelatedPosts
                currentId={post.id}
                currentCategory={post.category}
                currentTags={post.tags}
              />
            </div>
          </div>
        </article>
      </main>

      {/* ── ENTERPRISE FOOTER CTA ── */}
      <section className="bg-gray-900 py-24 px-6 border-t border-gray-800 relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px]"></div>

        <div className="max-w-[800px] mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 tracking-tight">
            Stop retyping. Start building.
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-[600px] mx-auto">
            Join thousands of professionals using NoteOCR's vision models to
            instantly digitise handwriting, forms, and tables.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/signup"
              className="px-8 py-4 bg-white text-gray-900 rounded-xl font-bold hover:bg-gray-100 transition-colors"
            >
              Create Free Account
            </Link>
            <Link
              href="/docs"
              className="px-8 py-4 bg-gray-800 text-white rounded-xl font-bold border border-gray-700 hover:bg-gray-700 transition-colors"
            >
              Read  Docs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
