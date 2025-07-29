import { sanity } from "@/utilities/sanity";
import Link from "next/link";
import { format } from "date-fns";
import { HiOutlinePencilAlt } from "react-icons/hi";

export const dynamic = "force-dynamic";

type BlogPost = {
  _id: string;
  title: string;
  slug: { current: string };
  date: string;
  description: string;
  img?: {
    asset: {
      _id: string;
      url: string;
    };
  };
};

export default async function BlogPage() {
  const posts: BlogPost[] = await sanity.fetch(`
    *[_type == "blog"] | order(date desc) {
      _id,
      title,
      slug,
      date,
      description,
      img{ asset->{_id, url} }
    }
  `);

  return (
    <div className="min-h-screen bg-white">
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="mb-16 text-center">
          <HiOutlinePencilAlt className="w-12 h-12 text-[#6b8e4e] mx-auto mb-4" />
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-[#3e3e2d] bg-gradient-to-r from-[#3e3e2d] to-[#6b8e4e] bg-clip-text text-transparent">
            Blog
          </h1>
          <p className="text-lg text-[#5c5c4a] max-w-2xl mx-auto leading-relaxed">
            Thoughts, tutorials, and insights on development
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-[#f4efe7] rounded-2xl p-12 shadow-lg border border-[#d8c4a6]">
              <div className="text-6xl mb-4">🍃</div>
              <p className="text-xl text-[#3e3e2d] mb-2">
                No posts yet
              </p>
              <p className="text-[#5c5c4a]">
                Check back soon for new content!
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-8">
            {posts.map((post) => (
              <article
                key={post._id}
                className="group bg-[#f4efe7] rounded-2xl shadow-lg hover:shadow-xl border border-[#d8c4a6] transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-8">
                  <div className="flex gap-6">
                    {/* Cover Image - Smaller, on the left */}
                    {post.img?.asset?.url && (
                      <div className="flex-shrink-0">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden">
                          <img
                            src={post.img.asset.url}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* Content */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center justify-between">
                        <time className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#eaf1e5] text-[#6b8e4e] border border-[#d8c4a6]">
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {format(new Date(post.date), "MMM d, yyyy")}
                        </time>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
                        <Link
                          href={`/blog/${post.slug.current}`}
                          className="text-[#3e3e2d] hover:text-[#6b8e4e] transition-colors duration-200"
                        >
                          {post.title}
                        </Link>
                      </h2>

                      <p className="text-[#5c5c4a] text-lg leading-relaxed line-clamp-2">
                        {post.description}
                      </p>

                      <div className="pt-2">
                        <Link
                          href={`/blog/${post.slug.current}`}
                          className="inline-flex items-center px-6 py-3 bg-[#6b8e4e] text-white rounded-full font-medium hover:bg-[#5c7f42] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 group"
                        >
                          Read Article
                          <svg
                            className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* CTA Section */}
        {posts.length > 0 && (
          <div className="text-center mt-16 pt-16 border-t border-[#d8c4a6]">
            <h3 className="text-2xl font-bold text-[#3e3e2d] mb-4">
              Want to stay updated?
            </h3>
            <p className="text-[#5c5c4a] mb-6">
              Follow my journey and get notified about new posts and projects.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:vinodabhinav54@gmail.com"
                className="inline-flex items-center px-6 py-3 bg-[#6b8e4e] text-white rounded-full font-medium hover:bg-[#5c7f42] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Get In Touch
              </a>
              <Link
                href="/projects"
                className="inline-flex items-center px-6 py-3 border-2 border-[#6b8e4e] text-[#6b8e4e] rounded-full font-medium hover:bg-[#6b8e4e] hover:text-white transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <HiOutlinePencilAlt className="mr-2 w-5 h-5" />
                View Projects
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
