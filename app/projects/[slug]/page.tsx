import { sanity } from "@/utilities/sanity";
import { PortableText, PortableTextComponents, PortableTextBlock} from "@portabletext/react";
import { notFound } from "next/navigation";

type Project = {
  title: string;
  description: string;
  tech: string[];
  body: PortableTextBlock[];
  img?: {
    asset: {
      _id: string;
      url: string;
    };
  };
  images?: {
    asset: {
      _id: string;
      url: string;
    };
  }[];
};

export async function generateStaticParams() {
  const slugs = await sanity.fetch<{ slug: { current: string } }[]>(
    `*[_type == "project"]{ slug }`
  );
  return slugs.map(({ slug }) => ({ slug: slug.current }));
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const url = value?.asset?._ref
        ?.replace("image-", "https://cdn.sanity.io/images/3t26pmqp/production/")
        .replace(/-(\d+x\d+)-\w+$/, ".$1.webp"); // safe fallback

      return url ? (
        <img src={url} alt="" className="my-4 rounded-lg" />
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProjectPage({ params }: any) {
  const project: Project | null = await sanity.fetch(
    `*[_type == "project" && slug.current == $slug][0]{
      title,
      description,
      tech,
      body,
      img{ asset->{_id, url} },
      images[]{ asset->{_id, url} }
    }`,
    { slug: params.slug }
  );

  if (!project) return notFound();

  return (
    <section className="max-w-2xl mx-auto px-6 py-20">
      {/* Cover Image */}
      {project.img?.asset?.url && (
        <img
          src={project.img.asset.url}
          alt=""
          className="w-full h-auto mb-6 rounded-lg shadow"
        />
      )}

      {/* Title & Description */}
      <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-4 whitespace-pre-line">{project.description}</p>

      {/* Tech Tags */}
      {project.tech?.length > 0 && (
        <ul className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((tag) => (
            <li
              key={tag}
              className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-800 rounded-full"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      {/* Rich Body Content */}
      <article className="prose dark:prose-invert">
        <PortableText value={project.body} components={components} />
      </article>

      {/* Gallery */}
      {project.images && project.images.length > 0 && (
        <div className="my-12 grid gap-4 sm:grid-cols-2">
          {project.images.map((image) => (
            <img
              key={image.asset._id}
              src={image.asset.url}
              alt=""
              className="rounded-lg border shadow"
            />
          ))}
        </div>
      )}
    </section>
  );
}
