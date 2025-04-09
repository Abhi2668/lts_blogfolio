import { sanity } from "@/utilities/sanity";
import {
  PortableText,
  PortableTextBlock,
  PortableTextComponents,
} from "@portabletext/react";
import { notFound } from "next/navigation";
import { format } from "date-fns";

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
        <img src={url} alt="" className="my-4 rounded-lg shadow" />
      ) : null;
    },
    youtube: ({ value }) => {
      const url = new URL(value.url);
      const videoId = url.searchParams.get("v");
      return (
        <div className="my-6 aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="w-full h-full rounded"
          />
        </div>
      );
    },
  },
};

async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
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
    <article className="max-w-2xl mx-auto px-6 py-20">
      {post.img?.asset?.url && (
        <img
          src={post.img.asset.url}
          alt=""
          className="w-full h-auto mb-6 rounded-lg shadow"
        />
      )}

      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
        {format(new Date(post.date), "MMMM d, yyyy")}
        {post.author && ` · ${post.author}`}
        {post.readingTime && ` · ${post.readingTime}`}
      </p>

      {Array.isArray(post.tags) && post.tags.length > 0 && (
        <ul className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag) => (
            <li
              key={tag}
              className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-800 rounded-full"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      {post.body && (
        <div className="prose dark:prose-invert">
          <PortableText value={post.body} components={components} />
        </div>
      )}

      {Array.isArray(post.images) && post.images.length > 0 && (
        <div className="my-12 grid gap-4 sm:grid-cols-2">
          {post.images.map(
            (image) =>
              image.asset?.url && (
                <img
                  key={image.asset._id}
                  src={image.asset.url}
                  alt=""
                  className="rounded-lg border shadow"
                />
              )
          )}
        </div>
      )}

      {Array.isArray(post.externalLinks) && post.externalLinks.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Related Links</h3>
          <ul className="list-disc list-inside text-blue-600 dark:text-blue-400">
            {post.externalLinks.map((link) => (
              <li key={link.url}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

export default BlogPostPage;
