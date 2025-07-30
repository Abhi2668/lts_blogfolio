import { sanity } from "@/utilities/sanity";
import {
  PortableText,
  PortableTextBlock,
  PortableTextComponents,
} from "@portabletext/react";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";
import { HiOutlineArrowLeft, HiOutlineClock, HiOutlineUser, HiOutlineExternalLink } from "react-icons/hi";

type BlogPost = {
  title: string;
  date: string;
  author?: string;
  description?: string;
  readingTime?: string;
  tags?: string[];
  img?: {
    asset: {
      _id: string;
      url: string;
    };
  };
  body: PortableTextBlock[];
  images?: {
    asset: {
      _id: string;
      url: string;
    };
  }[];
  externalLinks?: {
    label: string;
    url: string;
  }[];
};

export async function generateStaticParams() {
  const slugs = await sanity.fetch<{ slug: { current: string } }[]>(
    `*[_type == "blog"]{ slug }`
  );

  return slugs.map(({ slug }) => ({ slug: slug.current }));
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const url = value?.asset?._ref
        ?.replace("image-", "https://cdn.sanity.io/images/3t26pmqp/production/")
        ?.replace(/-(\d+x\d+)-\w+$/, ".$1.webp");

      return url ? (
        <figure className="my-8">
          <img 
            src={url} 
            alt="" 
            className="w-full h-auto rounded-lg shadow-sm" 
          />
        </figure>
      ) : null;
    },
    youtube: ({ value }) => {
      const url = new URL(value.url);
      const videoId = url.searchParams.get("v") || value.url.split('/').pop()?.split('?')[0];
      
      return (
        <div className="my-8">
          <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      );
    },
  },
  block: {
    normal: ({ children }) => (
      <p className="text-gray-700 leading-7 mb-4">{children}</p>
    ),
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-12 first:mt-0">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-10">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">{children}</h3>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-4 ml-4 text-gray-700">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 ml-4 text-gray-700">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-gray-700">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic">{children}</em>
    ),
    link: ({ children, value }) => (
      <a 
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-700 underline"
      >
        {children}
      </a>
    ),
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function BlogPostPage({ params }: any) {
  const post: BlogPost | null = await sanity.fetch(
    `*[_type == "blog" && slug.current == $slug][0]{
      title,
      date,
      author,
      description,
      readingTime,
      tags,
      img{ asset->{_id, url} },
      body,
      images[]{ asset->{_id, url} },
      externalLinks
    }`,
    { slug: params.slug }
  );

  if (!post) return notFound();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link
            href="/blog"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <HiOutlineArrowLeft className="mr-2 w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <article className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="mb-10">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
              <time className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {format(new Date(post.date), "MMMM d, yyyy")}
              </time>
              
              {post.author && (
                <div className="flex items-center gap-2">
                  <HiOutlineUser className="w-4 h-4" />
                  {post.author}
                </div>
              )}
              
              {post.readingTime && (
                <div className="flex items-center gap-2">
                  <HiOutlineClock className="w-4 h-4" />
                  {post.readingTime}
                </div>
              )}
            </div>

            {/* Tags */}
            {Array.isArray(post.tags) && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Description */}
            {post.description && (
              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-xl text-gray-600 leading-relaxed italic border-l-4 border-gray-200 pl-6">
                  {post.description}
                </p>
              </div>
            )}
          </header>

          {/* Featured Image - Standardized Size */}
          {post.img?.asset?.url && (
            <figure className="mb-10">
              <div className="aspect-[16/9] w-full bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={post.img.asset.url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </figure>
          )}

          {/* Content */}
          {post.body && (
            <div className="prose prose-lg max-w-none mb-12">
              <PortableText value={post.body} components={components} />
            </div>
          )}

          {/* External Links */}
          {Array.isArray(post.externalLinks) && post.externalLinks.length > 0 && (
            <aside className="mb-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <HiOutlineExternalLink className="w-5 h-5" />
                Related Links
              </h3>
              <ul className="space-y-2">
                {post.externalLinks.map((link) => (
                  <li key={link.url}>
                    <a 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          {/* Image Gallery */}
          {Array.isArray(post.images) && post.images.length > 0 && (
            <section className="mb-12">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Gallery</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {post.images.map(
                  (image) =>
                    image.asset?.url && (
                      <figure key={image.asset._id}>
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                          <img
                            src={image.asset.url}
                            alt=""
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                      </figure>
                    )
                )}
              </div>
            </section>
          )}
        </article>

        {/* Footer */}
        <footer className="max-w-3xl mx-auto pt-12 mt-12 border-t border-[#3e3e2d]/20">
          <div className="text-center">
            <h3 className="text-2xl font-medium text-[#3e3e2d] mb-4">
              Thanks for Reading!
            </h3>
            <p className="text-[#3e3e2d]/70 mb-8">
              Have thoughts or questions? I'd love to hear from you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:vinodabhinav54@gmail.com"
                className="inline-flex items-center px-6 py-3 bg-[#3e3e2d] text-[#f4efe7] rounded-lg hover:bg-[#3e3e2d]/90 transition-colors duration-200"
              >
                Get in Touch
              </a>
              <Link
                href="/blog"
                className="inline-flex items-center px-6 py-3 border border-[#3e3e2d]/30 text-[#3e3e2d] rounded-lg hover:bg-[#3e3e2d]/5 transition-colors duration-200"
              >
                More Posts
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default BlogPostPage;
