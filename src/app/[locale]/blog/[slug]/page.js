import { articles } from "../../../data/articles"; // Adjust path as needed
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
  Check,
} from "lucide-react";

function DesktopShareButtons() {
  return (
    <div className="flex flex-col gap-4">
      <a
        href="#"
        className="flex items-center gap-3 text-sm font-medium text-slate-500 hover:text-[#1DA1F2] transition-colors"
      >
        <Twitter size={18} /> <span>Twitter</span>
      </a>
      <a
        href="#"
        className="flex items-center gap-3 text-sm font-medium text-slate-500 hover:text-[#0A66C2] transition-colors"
      >
        <Linkedin size={18} /> <span>LinkedIn</span>
      </a>
      <a
        href="#"
        className="flex items-center gap-3 text-sm font-medium text-slate-500 hover:text-[#1877F2] transition-colors"
      >
        <Facebook size={18} /> <span>Facebook</span>
      </a>
      <div className="h-px w-8 bg-slate-200 my-2"></div>
      <button className="flex items-center gap-3 text-sm font-medium text-slate-500 hover:text-teal-600 transition-colors">
        <LinkIcon size={18} /> <span>Copy Link</span>
      </button>
    </div>
  );
}

// --- 1. SEO METADATA GENERATOR ---
export async function generateMetadata({ params }) {
  const post = articles.find((a) => a.slug === params.slug);
  if (!post) return;

  return {
    title: `${post.title} | NoteOcr Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `https://noteocr.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://noteocr.com/blog/${post.slug}`,
      siteName: "NoteOcr",
      images: [
        {
          url: post.image, // Ensure this is a full URL in production
          width: 1200,
          height: 630,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default function BlogPost({ params }) {
  const post = articles.find((a) => a.slug === params.slug);

  if (!post) return notFound();

  // --- 2. STRUCTURED DATA (JSON-LD) FOR GOOGLE ---
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.image, // Full URL recommended
    datePublished: post.date,
    dateModified: post.date, // Update this if you have a modified date
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "NoteOcr",
      logo: {
        "@type": "ImageObject",
        url: "https://noteocr.com/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://noteocr.com/blog/${post.slug}`,
    },
  };

  return (
    <>
      {/* Inject Schema for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Progress Bar Component (Client Side) */}
      {/* <ScrollProgress /> */}

      <article className="min-h-screen bg-white font-sans text-slate-900">
        {/* Navigation */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 pb-2">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-teal-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to blog
          </Link>
        </div>

        {/* HERO SECTION */}
        <header className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 pb-10 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-teal-100">
              {post.category}
            </span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <Clock className="w-3 h-3" /> {post.readTime} read
            </span>
          </div>

          {/* H1: Responsive Text Size (Smaller on mobile) */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-8">
            {post.title}
          </h1>

          {/* Author */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-600 border border-slate-200">
              {post.author.charAt(0)}
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-slate-900">{post.author}</p>
              <time
                dateTime={post.date}
                className="text-xs text-slate-500 block"
              >
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>
          </div>
        </header>

        {/* FEATURED IMAGE */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-12">
          <div className="relative aspect-[16/9] md:aspect-[2/1] w-full overflow-hidden rounded-xl md:rounded-2xl bg-slate-100 shadow-sm">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* CONTENT GRID */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar (Desktop Only) */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-32 pl-8 border-l border-slate-100">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">
                Share
              </p>
              <DesktopShareButtons />
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-7 pb-20">
            <div
              className="
                prose prose-base md:prose-lg prose-slate max-w-none
                
                /* Headings: Tight & Bold */
                prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900
                prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl md:prose-h3:text-2xl
                
                /* Paragraphs: Readable Line Height */
                prose-p:leading-7 md:prose-p:leading-8 prose-p:text-slate-700 prose-p:mb-6
                
                /* Links: Teal & Bold */
                prose-a:text-teal-600 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                
                /* Strong: Black */
                prose-strong:font-bold prose-strong:text-slate-900
                
                /* Images */
                prose-img:rounded-xl prose-img:shadow-md prose-img:my-8
                
                /* Blockquotes: Styled */
                prose-blockquote:border-l-4 prose-blockquote:border-teal-500 
                prose-blockquote:bg-teal-50/30 prose-blockquote:py-2 prose-blockquote:px-5 
                prose-blockquote:rounded-r-lg prose-blockquote:not-italic 
                prose-blockquote:font-medium prose-blockquote:text-slate-800
                
                /* Lists */
                prose-ul:marker:text-teal-500 prose-ol:marker:text-teal-500
              "
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-slate-100">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog/tag/${tag.toLowerCase()}`}
                    className="px-3 py-1 bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wide rounded hover:bg-slate-100 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-12 bg-slate-50 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-start gap-6 border border-slate-100">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-xl font-bold text-slate-700 border border-slate-200 shrink-0 shadow-sm">
                {post.author.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Written by {post.author}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Product Designer & AI Enthusiast. Building tools to help teams
                  move faster.
                </p>
                <Link
                  href="/about"
                  className="text-sm font-semibold text-teal-600 hover:text-teal-700"
                >
                  Read full bio &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <section className="bg-[#0B1120] py-16 px-4 md:px-6 mt-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
              Get the latest updates
            </h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto text-sm md:text-base">
              Join 50,000+ others receiving our weekly digest on AI,
              productivity, and documents.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
              />
              <button className="bg-teal-600 hover:bg-teal-500 text-white font-bold px-6 py-3 rounded-lg transition-colors shadow-lg shadow-teal-900/20 whitespace-nowrap text-sm">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </article>
    </>
  );
}

// --- CLIENT COMPONENTS (Inline for brevity, separate files in production) ---
