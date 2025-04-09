import { sanity } from "@/utilities/sanity";
import Link from "next/link";
import { format } from "date-fns";

type BlogPost = {
  _id: string;
  title: string;
  slug: { current: string };
  date: string;
  description: string;
};

export default async function BlogPage() {
  const posts: BlogPost[] = await sanity.fetch(`
    *[_type == "blog"] | order(date desc) {
      _id,
      title,
      slug,
      date,
      description
    }
  `);

  return (
    <section className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-bold mb-10">Blog</h1>

      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post._id} className="border-b pb-6">
            <h2 className="text-2xl font-semibold">
              <Link
                href={`/blog/${post.slug.current}`}
                className="hover:underline text-blue-600 dark:text-blue-400"
              >
                {post.title}
              </Link>
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {format(new Date(post.date), "MMMM d, yyyy")}
            </p>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              {post.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
